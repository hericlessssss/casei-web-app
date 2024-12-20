import React from 'react';
import { Calendar, Clock, MapPin, Instagram, Gift  } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import { useState } from 'react';


const isActive = (path: string) => window.location.pathname === path;
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
          <div className="max-w-xs md:max-w-2xl mx-auto text-sm md:text-lg">
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
                href="https://www.google.com/maps/dir//par%C3%B3quia+nossa+senhora+dO+PERPETUO+SOCORRO+lago+sul/@-15.8442479,-47.9366699,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x935a251131f750eb:0x54711ccfdff43f68!2m2!1d-47.8954455!2d-15.8443231?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
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


      <section className="py-12 px-4 md:px-6 bg-olive-100 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-olive-800 text-lg font-serif flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-center md:space-x-6">
            <a
              href="/gifts"
              className={`inline-flex items-center gap-3 px-4 py-2 border border-olive-600 rounded-lg text-olive-800 font-medium hover:bg-olive-200 hover:border-olive-800 transition-all ${
                isActive('/gifts') ? 'border-olive-800' : ''
              }`}
              aria-label="Lista de presentes"
            >
              <Gift className="w-5 h-5 text-olive-600" /> Acesse nossa lista de presentes
            </a>
            <a
              href="/rsvp"
              className={`inline-flex items-center gap-3 px-4 py-2 border border-olive-600 rounded-lg text-olive-800 font-medium hover:bg-olive-200 hover:border-olive-800 transition-all ${
                isActive('/rsvp') ? 'border-olive-800' : ''
              }`}
              aria-label="Confirme sua presença"
            >
              <Calendar className="w-5 h-5 text-olive-600" /> Confirme sua presença
            </a>
          </p>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 bg-olive-800 text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="font-serif text-xl mb-2">Siga-nos</h3>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.instagram.com/hericlesssssss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-olive-200 transition-colors"
                  aria-label="Instagram Héricles"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/brunanognun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-olive-200 transition-colors"
                  aria-label="Instagram Bruna"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm mb-2">Desenvolvido com muito amor e carinho por</p>
              <a
                href="https://www.instagram.com/labora_tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 hover:text-olive-200 transition-colors"
              >
                <span>Labora Design</span>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-olive-200 pt-4 border-t border-olive-700">
            <p>© 2024 Héricles & Bruna. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}

export default Home;
