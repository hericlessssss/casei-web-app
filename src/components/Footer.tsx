import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-olive-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 mr-2" />
          <span className="font-serif text-xl">Héricles & Bruna</span>
        </div>
        <p className="text-olive-100 mb-4">19 de julho de 2025</p>
        <p className="text-olive-200 text-sm">
          Desenvolvido com muito amor e carinho pela
          <br />
          <span className="font-serif text-lg">Labora Design</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;