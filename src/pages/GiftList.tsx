import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { Gift as GiftIcon, Filter } from 'lucide-react';

interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  reserved: boolean;
}

type FilterType = 'all' | 'available' | 'reserved';

const GiftList: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .order('reserved', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Erro ao buscar os dados:', error.message);
        setError('Erro ao carregar a lista de presentes. Tente novamente mais tarde.');
      } else if (data) {
        setGifts(data);
      }
    } catch (err) {
      console.error('Erro inesperado ao buscar presentes:', err);
      setError('Erro inesperado ao carregar a lista de presentes.');
    } finally {
      setLoading(false);
    }
  };

  const filteredGifts = gifts.filter(gift => {
    switch (filter) {
      case 'available':
        return !gift.reserved;
      case 'reserved':
        return gift.reserved;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
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
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Sua presença é o nosso maior presente, mas se desejar nos presentear,
            preparamos esta lista com muito carinho.
          </p>

          {/* Filtro */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <Filter className="w-5 h-5 text-olive-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-4 py-2 rounded-md border border-olive-200 bg-white text-olive-800 focus:outline-none focus:ring-2 focus:ring-olive-500"
            >
              <option value="all">Todos os presentes</option>
              <option value="available">Presentes disponíveis</option>
              <option value="reserved">Presentes já escolhidos</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredGifts.map((gift) => (
            <div
              key={gift.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full ${
                gift.reserved ? 'opacity-75' : ''
              }`}
            >
              <div className="relative pb-[66.67%]">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-serif text-lg text-olive-800 mb-4 line-clamp-2">
                    {gift.name}
                  </h3>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xl font-semibold text-olive-800 mb-4">
                    Preço médio: R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*
                  </p>
                  <p className="text-xs text-gray-500 mb-4 italic">
                    *O preço pode variar conforme a loja e a data da compra
                  </p>
                  
                  {gift.reserved ? (
                    <div className="text-olive-600 font-medium flex items-center justify-center p-3 bg-olive-50 rounded-md">
                      <GiftIcon className="w-5 h-5 mr-2" />
                      Este presente já foi escolhido com carinho por alguém especial ❤️
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;