import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient'; // Importando o cliente
import { Link } from 'react-router-dom';
import { Gift as GiftIcon } from 'lucide-react';

interface Gift {
  id: number;
  name: string;
  price: number;
  image: string;
  reserved: boolean;
}

const GiftList: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGifts() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from<Gift>('gifts').select('*');
        if (error) {
          console.error('Erro ao buscar os dados da API Supabase:', error.message);
          setError('Erro ao carregar a lista de presentes. Tente novamente mais tarde.');
        } else if (data) {
          // Filtrar IDs duplicados para evitar warnings no React
          const uniqueGifts = data.filter(
            (gift, index, self) => index === self.findIndex((g) => g.id === gift.id)
          );
          setGifts(uniqueGifts);
        }
      } catch (err) {
        console.error('Erro inesperado ao buscar presentes:', err);
        setError('Erro inesperado ao carregar a lista de presentes.');
      } finally {
        setLoading(false);
      }
    }

    fetchGifts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Carregando presentes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (gifts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Nenhum presente disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-olive-800 mb-4">Lista de Presentes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sua presença é o nosso maior presente, mas se desejar nos presentear,
            preparamos esta lista com muito carinho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="relative pb-[66.67%]">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>

              <div className="p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl text-olive-800 mb-2">{gift.name}</h3>
                <p className="text-gray-600 mb-4">
                  R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                {gift.reserved ? (
                  <div className="text-olive-600 font-medium flex items-center">
                    <GiftIcon className="w-5 h-5 mr-2" />
                    Presente já escolhido
                  </div>
                ) : (
                  <Link
                    to={`/gifts/${gift.id}`}
                    className="inline-block w-full text-center bg-olive-600 text-white px-6 py-2 rounded-md hover:bg-olive-700 transition-colors"
                  >
                    Escolher presente
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;
