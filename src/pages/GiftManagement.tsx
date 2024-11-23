import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const GiftManagement = () => {
  const [gifts, setGifts] = useState<any[]>([]); // Para armazenar a lista de presentes

  useEffect(() => {
    fetchGifts(); // Buscar os presentes ao carregar a página
  }, []);

  // Função para buscar a lista de presentes
  const fetchGifts = async () => {
    const { data, error } = await supabase.from('gifts').select('*');
    if (data) {
      setGifts(data);
    } else {
      toast.error('Erro ao carregar presentes.');
    }
  };

  // Função para remover um presente
  const removeGift = async (giftId: number) => {
    try {
      const { error } = await supabase.from('gifts').delete().eq('id', giftId);

      if (error) throw error;

      // Remover o presente da lista no frontend
      setGifts(gifts.filter((gift) => gift.id !== giftId));
      toast.success('Presente removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover presente.');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl text-olive-800 mb-8">Gerenciar Presentes</h1>

        {/* Exibir a lista de presentes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-serif text-xl text-olive-800 mb-4">Escolhas de Presentes</h2>

          <ul className="space-y-4">
            {gifts.length === 0 ? (
              <p className="text-gray-600">Não há presentes cadastrados.</p>
            ) : (
              gifts.map((gift) => (
                <li key={gift.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg text-olive-800">{gift.name}</h3>
                    <p className="text-gray-600">{gift.price ? `R$ ${gift.price.toFixed(2)}` : 'Sem preço'}</p>
                  </div>
                  <button
                    onClick={() => removeGift(gift.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GiftManagement;
