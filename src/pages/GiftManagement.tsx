import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

interface Gift {
  id: number;
  name: string;
  image?: string;
  price?: number;
  reserved_by?: number;
}

const GiftManagement = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('gifts').select('*');
      if (error) throw error;
      setGifts(data || []);
    } catch (error) {
      toast.error('Erro ao carregar presentes.');
    } finally {
      setLoading(false);
    }
  };

  const removeGift = async (giftId: number) => {
    try {
      const { error } = await supabase.from('gifts').delete().eq('id', giftId);
      if (error) throw error;
      toast.success('Presente removido com sucesso!');
      fetchGifts();
    } catch (error) {
      toast.error('Erro ao remover presente.');
    }
  };

  const releaseGift = async (giftId: number) => {
    try {
      const { error: giftError } = await supabase
        .from('gifts')
        .update({ reserved_by: null, reserved: false }) // Adicione o campo 'reserved'
        .eq('id', giftId);
  
      if (giftError) throw giftError;
  
      toast.success('Presente liberado com sucesso!');
      fetchGifts();
    } catch (error) {
      toast.error('Erro ao liberar o presente.');
    }
  };
  

  if (loading) return <div>Carregando presentes...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-olive-800 mb-8">Gerenciar Presentes</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <ul className="space-y-6">
            {gifts.length === 0 ? (
              <p className="text-center text-gray-600">Não há presentes cadastrados.</p>
            ) : (
              gifts.map((gift) => (
                <li
                  key={gift.id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center w-full sm:w-3/4">
                    {gift.image && (
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-24 h-24 object-cover rounded-md mr-6"
                      />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                      <div className="sm:mr-4 mb-4 sm:mb-0">
                        <h3 className="text-xl text-olive-800 font-semibold">{gift.name}</h3>
                        <p className="text-lg text-gray-600">
                          {gift.price ? `R$ ${gift.price.toFixed(2)}` : 'Sem preço'}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-2 sm:mt-0">
                        {/* Exibe o botão "Liberar" apenas se o presente estiver reservado */}
                        {gift.reserved_by && (
                          <button
                            onClick={() => releaseGift(gift.id)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-orange-600 transition-colors"
                          >
                            Liberar
                          </button>
                        )}

                        <button
                          onClick={() => removeGift(gift.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="inline-block mr-2" />
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
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
