import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-screen flex items-center justify-center px-4 md:px-6">
        <div className="text-center text-white w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src="https://i.imgur.com/ssDvKgX.png" 
              alt="Brasão Héricles & Bruna" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
            />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl mb-4 leading-tight font-bold tracking-wide">
            Héricles & Bruna
          </h1>
          <p className="text-lg md:text-2xl mb-12 font-light">19 de julho de 2025</p>
          <div className="max-w-xs md:max-w-2xl mx-auto">
            <CountdownTimer targetDate="2025-07-19T14:30:00" />
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-white to-olive-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-olive-800 mb-12 text-center font-semibold">
            Nosso Grande Dia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Calendar className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-olive-600" />
              <h3 className="font-serif text-lg md:text-xl text-olive-800 mb-2">Data</h3>
              <p className="text-gray-600">19 de julho de 2025</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Clock className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-olive-600" />
              <h3 className="font-serif text-lg md:text-xl text-olive-800 mb-2">Horário</h3>
              <p className="text-gray-600">14:30</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <a 
                href="https://maps.app.goo.gl/wCWykCXALD7qERHZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-olive-700"
              >
                <MapPin className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-olive-600" />
                <h3 className="font-serif text-lg md:text-xl text-olive-800 mb-2">Local</h3>
                <p className="text-gray-600">Paróquia Nossa Senhora do Perpétuo Socorro</p>
                <p className="text-gray-600 text-sm">Lago Sul</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;