import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Instagram, Gift, ChurchIcon, PartyPopper, Car, ChevronRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { supabase } from '../lib/supabaseClient';

interface GiftPreview {
  id: number;
  name: string;
  price: number;
  image: string;
  reserved: boolean;
}

function Home() {
  const [gifts, setGifts] = useState<GiftPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const { data, error } = await supabase
          .from('gifts')
          .select('id, name, price, image, reserved')
          .eq('reserved', false) // Apenas presentes não reservados
          .limit(8)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setGifts(data || []);
      } catch (err) {
        console.error('Erro ao carregar presentes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-screen flex items-center justify-center px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative text-center text-white w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src="https://i.imgur.com/ssDvKgX.png" 
              alt="Brasão Héricles & Bruna" 
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 animate-fade-in"
            />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight font-bold tracking-wider">
            Héricles & Bruna
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light tracking-widest">19 de julho de 2025</p>
          <div className="max-w-xs md:max-w-2xl mx-auto">
            <CountdownTimer targetDate="2025-07-19T14:30:00" />
          </div>
        </div>
      </section>

      {/* Welcome Section - Reduced padding */}
      <section className="py-8 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-olive-800 mb-4">Bem-vindos ao nosso site!</h2>
          <div className="space-y-4 text-gray-600">
            <p className="text-lg md:text-xl leading-relaxed">
              Com imensa alegria e amor em nossos corações, convidamos você para celebrar conosco 
              um dos momentos mais especiais de nossas vidas: nosso casamento.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Cada detalhe deste dia foi pensado com muito carinho, e sua presença tornará esta 
              celebração ainda mais significativa para nós.
            </p>
            <div className="pt-4">
              <p className="font-serif text-2xl text-olive-600 italic">
                "O amor é paciente, o amor é bondoso... Tudo sofre, tudo crê, tudo espera, tudo suporta."
              </p>
              <p className="text-sm mt-2 text-olive-600">1 Coríntios 13:4,7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremony & Reception Section - Reduced padding */}
      <section className="py-8 px-4 md:px-6 bg-gradient-to-b from-white to-olive-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-olive-800 mb-8 text-center font-semibold">
            Cerimônia & Recepção
          </h2>
          
          {/* Cerimônia */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <ChurchIcon className="w-8 h-8 text-olive-600" />
                  <h3 className="font-serif text-2xl text-olive-800">Cerimônia Religiosa</h3>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p className="font-medium text-lg">Paróquia Nossa Senhora do Perpétuo Socorro</p>
                  <p>St. de Habitações Individuais Sul EQL 6/8 - Lago Sul, Brasília - DF</p>
                  <p>CEP: 71620-410</p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-olive-600" />
                    <span>14:30</span>
                  </p>
                  <a
                    href="https://maps.app.goo.gl/VqgcaBKHtUTZZ2VL7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-olive-600 hover:text-olive-800 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Ver no Google Maps</span>
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipP9AwwJdS7hwJiXG4TrcSinB2BpVb6qBZ_9aTc3=s1360-w1360-h1020"
                  alt="Paróquia Nossa Senhora do Perpétuo Socorro"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Recepção */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <PartyPopper className="w-8 h-8 text-olive-600" />
                  <h3 className="font-serif text-2xl text-olive-800">Recepção</h3>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p className="font-medium text-lg">Casa Volpi</p>
                  <p>SMPW Q 4 Conjunto 8 Lote 05, Parte 1, Brasília - DF</p>
                  <p>CEP: 71735-408</p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-olive-600" />
                    <span>16:00 às 22:00</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://www.google.com/maps/place/CASA+VOLPI/data=!4m2!3m1!1s0x0:0x688ff25d26368b84"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-olive-600 hover:text-olive-800 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      <span>Ver no Google Maps</span>
                    </a>
                    <div className="flex items-center gap-2 text-olive-600">
                      <Car className="w-5 h-5" />
                      <span>Estacionamento gratuito no local</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipNXZV8BvUirqc5dMA1WTbs5K2xZY5wg9r_uSIUl=s1360-w1360-h1020"
                  alt="Casa Volpi"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Preview Section */}
      {gifts.length > 0 && (
        <section className="py-20 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-olive-800 mb-4">Lista de Presentes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sua presença é nosso maior presente, mas se desejar nos presentear,
                preparamos esta lista com muito carinho.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {gifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full"
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
                            R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          
                          <Link
                            to={`/gifts/${gift.id}`}
                            className="inline-block w-full text-center bg-olive-600 text-white px-4 py-2 rounded-md hover:bg-olive-700 transition-colors"
                          >
                            Escolher presente
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    to="/gifts"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-olive-600 text-white rounded-md hover:bg-olive-700 transition-colors"
                  >
                    <span>Ver lista completa</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* RSVP and Actions Section */}
      <section className="py-20 px-4 md:px-6 bg-olive-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-olive-800 mb-6">Participe do Nosso Dia</h2>
            <p className="text-gray-600 text-lg mb-10">Ficaremos muito felizes em celebrar este momento especial com você</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
            <Link
              to="/messages"
              className="group flex items-center gap-4 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
            >
              <MessageCircle className="w-6 h-6 text-olive-600 group-hover:text-olive-800 transition-colors" />
              <span className="text-olive-800 font-medium group-hover:text-olive-900">Deixar Recado</span>
            </Link>
            <Link
              to="/rsvp"
              className="group flex items-center gap-4 px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
            >
              <Calendar className="w-6 h-6 text-olive-600 group-hover:text-olive-800 transition-colors" />
              <span className="text-olive-800 font-medium group-hover:text-olive-900">Confirmar Presença</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-olive-800 text-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Links Section */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl mb-6 text-olive-100">Navegação</h3>
              <nav className="space-y-3">
                <Link to="/messages" className="block text-sm hover:text-olive-200 transition-colors">
                  Deixar Recado
                </Link>
                <Link to="/rsvp" className="block text-sm hover:text-olive-200 transition-colors">
                  Confirmar Presença
                </Link>
                <Link to="/gifts" className="block text-sm hover:text-olive-200 transition-colors">
                  Lista de Presentes
                </Link>
              </nav>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl mb-6 text-olive-100">Os Noivos</h3>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/hericlesssssss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-olive-200 transition-colors"
                 >
                  <Instagram className="w-4 h-4" />
                  <span>@hericlesssssss</span>
                </a>
                <a
                  href="https://www.instagram.com/brunanognun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-olive-200 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@brunanognun</span>
                </a>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl mb-6 text-olive-100">Localização</h3>
              <div className="space-y-3 text-sm">
                <p className="font-medium">Cerimônia</p>
                <a
                  href="https://www.google.com/maps/dir//par%C3%B3quia+nossa+senhora+dO+PERPETUO+SOCORRO+lago+sul/@-15.8442479,-47.9366699,13z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-olive-200 transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Paróquia Nossa Senhora do Perpétuo Socorro, St. de Habitações Individuais Sul EQL 6/8</span>
                </a>
                <p className="font-medium mt-4">Recepção</p>
                <a
                  href="https://www.google.com/maps/place/CASA+VOLPI/data=!4m2!3m1!1s0x0:0x688ff25d26368b84"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-olive-200 transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Casa Volpi, SMPW Q 4 Conjunto 8 Lote 05, Parte 1</span>
                </a>
              </div>
            </div>
          </div>

          {/* Development Credit */}
          <div className="py-6 border-t border-olive-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-olive-200 text-xs">
                © 2024 Héricles & Bruna. Todos os direitos reservados.
              </p>
              <a
                href="https://www.instagram.com/labora_tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-olive-200 hover:text-olive-100 transition-colors"
              >
                <span>Desenvolvido com ♥ por Labora Tech</span>
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;