import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Gift as GiftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../supabase/supabaseClient'; // Importando o cliente Supabase

// Definindo tipos para o presente e loja sugerida
interface Store {
  name: string;
  url: string;
}

interface Gift {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  reserved: boolean;
  reserved_by?: string;
  suggestedStores: Store[];
}

function GiftDetails() {
  const { id } = useParams<{ id: string }>(); // ID do presente na URL
  const navigate = useNavigate(); // Para redirecionar o usuário após a reserva
  const [gift, setGift] = useState<Gift | null>(null); // Usando 'Gift' como tipo
  const [name, setName] = useState<string>(''); // Tipo para o nome
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Indicador de envio do formulário

  // Buscar os dados do presente assim que o componente for montado
  useEffect(() => {
    async function fetchGift() {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('id', id)
        .single(); // Espera um único registro (o presente)

      if (error) {
        console.error('Erro ao buscar o presente:', error);
        toast.error('Erro ao buscar o presente.');
      } else {
        setGift(data);
      }
    }

    fetchGift();
  }, [id]);

  // Caso o presente não seja encontrado, exibe uma mensagem
  if (!gift) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <p className="text-gray-600">Presente não encontrado.</p>
      </div>
    );
  }

  // Função que manipula o envio do formulário de reserva
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Por favor, informe seu nome');
      return;
    }

    setIsSubmitting(true);

    // Atualizando o status de reserva no banco de dados
    const { error } = await supabase
      .from('gifts')
      .update({ reserved: true, reserved_by: name })  // Atualizando a reserva e quem reservou
      .eq('id', gift.id);

    if (error) {
      toast.error('Erro ao reservar o presente');
      setIsSubmitting(false);
      return;
    }

    toast.success('Presente reservado com sucesso! Obrigado!');
    navigate('/gifts');  // Redireciona de volta para a lista de presentes
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={gift.image}
                alt={gift.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <h1 className="font-serif text-3xl text-olive-800 mb-4">{gift.name}</h1>
              <p className="text-2xl text-olive-600 mb-4">
                R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gray-600 mb-6">{gift.description}</p>

              <div className="mb-8">
                <h2 className="font-serif text-xl text-olive-800 mb-3">Onde comprar:</h2>
                <div className="space-y-2">
                  {gift.suggestedStores.map((store, index) => (
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

              {gift.reserved ? (
                <div className="text-olive-600 font-medium flex items-center">
                  <GiftIcon className="w-5 h-5 mr-2" />
                  Presente já escolhido
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftDetails;
