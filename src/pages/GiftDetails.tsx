import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Gift as GiftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

interface Store {
  name: string;
  url: string;
}

interface Gift {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  reserved: boolean;
  suggested_stores: Store[];
}

function GiftDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gift, setGift] = useState<Gift | null>(null);
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchGift();
  }, [id]);

  const fetchGift = async () => {
    if (!id) {
      toast.error('ID do presente inválido.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Erro ao buscar o presente.');
        navigate('/gifts');
      } else {
        setGift(data);
      }
    } catch (err) {
      toast.error('Erro inesperado ao buscar o presente.');
      navigate('/gifts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Por favor, informe seu nome.');
      return;
    }

    if (!gift?.id) {
      toast.error('Erro ao identificar o presente.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Primeiro, verifica se o presente ainda está disponível
      const { data: currentGift } = await supabase
        .from('gifts')
        .select('reserved')
        .eq('id', gift.id)
        .single();

      if (currentGift?.reserved) {
        toast.error('Este presente já foi escolhido por outra pessoa.');
        navigate('/gifts');
        return;
      }

      // Se ainda estiver disponível, atualiza o presente
      const { error: updateError } = await supabase
        .from('gifts')
        .update({ 
          reserved: true, 
          reserved_by: name.trim() 
        })
        .eq('id', gift.id);

      if (updateError) throw updateError;

      toast.success('Presente reservado com sucesso! Obrigado!');
      navigate('/gifts');
    } catch (err) {
      console.error('Erro ao reservar presente:', err);
      toast.error('Erro ao reservar o presente. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <p className="text-gray-600">Presente não encontrado.</p>
      </div>
    );
  }

  if (gift.reserved) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <GiftIcon className="w-16 h-16 text-olive-600 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-olive-800 mb-4">Presente já escolhido</h1>
          <p className="text-gray-600 mb-6">
            Este presente já foi escolhido com carinho por alguém especial ❤️
          </p>
          <button
            onClick={() => navigate('/gifts')}
            className="bg-olive-600 text-white px-6 py-3 rounded-md hover:bg-olive-700 transition-colors"
          >
            Voltar para a lista de presentes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={gift.image}
                alt={gift.name}
                className="w-full h-64 md:h-full object-contain"
              />
            </div>
            
            <div className="p-8 md:w-1/2">
              <h1 className="font-serif text-3xl text-olive-800 mb-4">{gift.name}</h1>
              <div className="mb-4">
                <p className="text-2xl text-olive-600">
                  Preço médio: R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500 mt-1 italic">
                  *O preço pode variar conforme a loja e a data da compra
                </p>
              </div>
              <p className="text-gray-600 mb-6">{gift.description}</p>

              <div className="mb-8">
                <h2 className="font-serif text-xl text-olive-800 mb-3">Onde comprar:</h2>
                <div className="space-y-2">
                  {gift.suggested_stores?.map((store, index) => (
                    <a
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-olive-600 hover:text-olive-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {store.name}
                    </a>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-olive-600 text-white px-6 py-3 rounded-md hover:bg-olive-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirmando...' : 'Confirmar escolha'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftDetails;