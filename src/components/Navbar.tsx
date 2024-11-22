import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`font-serif text-2xl ${
                isScrolled || isOpen ? 'text-olive-800' : 'text-white'
              } transition-colors`}
            >
              H & B
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${
                isScrolled ? 'text-olive-600 hover:text-olive-800' : 'text-white hover:text-olive-100'
              } transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/gifts" 
              className={`${
                isScrolled ? 'text-olive-600 hover:text-olive-800' : 'text-white hover:text-olive-100'
              } transition-colors`}
            >
              Lista de Presentes
            </Link>
            <Link 
              to="/rsvp" 
              className={`${
                isScrolled ? 'text-olive-600 hover:text-olive-800' : 'text-white hover:text-olive-100'
              } transition-colors`}
            >
              Confirmação
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${
                isScrolled || isOpen ? 'text-olive-600' : 'text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-olive-600 hover:text-olive-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/gifts"
              className="block px-3 py-2 text-olive-600 hover:text-olive-800"
              onClick={() => setIsOpen(false)}
            >
              Lista de Presentes
            </Link>
            <Link
              to="/rsvp"
              className="block px-3 py-2 text-olive-600 hover:text-olive-800"
              onClick={() => setIsOpen(false)}
            >
              Confirmação
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;