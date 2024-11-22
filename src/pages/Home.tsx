import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
          opacity: '0.3'
        }}
      >
        <div className="text-center text-white px-4">
          <div className="mb-8">
            <img 
              src="/brasao.png" 
              alt="Brasão Héricles & Bruna" 
              className="w-32 h-32 mx-auto mb-4"
            />
          </div>
          <h1 className="font-serif text-4xl md:text-7xl mb-4 leading-tight">Héricles & Bruna</h1>
          <p className="text-xl md:text-2xl mb-8">19 de julho de 2025</p>
          <div className="max-w-xs md:max-w-2xl mx-auto">
            <CountdownTimer targetDate="2025-07-19T14:30:00" />
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white to-olive-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-olive-800 mb-12 text-center">Nosso Grande Dia</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-olive-600" />
              <h3 className="font-serif text-xl text-olive-800 mb-2">Data</h3>
              <p className="text-gray-600">19 de julho de 2025</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Clock className="w-12 h-12 mx-auto mb-4 text-olive-600" />
              <h3 className="font-serif text-xl text-olive-800 mb-2">Horário</h3>
              <p className="text-gray-600">14:30</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <a 
                href="https://maps.app.goo.gl/wCWykCXALD7qERHZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-olive-700"
              >
                <MapPin className="w-12 h-12 mx-auto mb-4 text-olive-600" />
                <h3 className="font-serif text-xl text-olive-800 mb-2">Local</h3>
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