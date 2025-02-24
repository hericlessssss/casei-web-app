import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-white bg-opacity-90 backdrop-blur-lg shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-serif text-2xl text-olive-800 animate-gentle-wave">
              H & B
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/gifts', label: 'Lista de Presentes' },
              { path: '/rsvp', label: 'Confirmação' },
              { path: '/messages', label: 'Recados' }
            ].map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path) 
                    ? 'text-olive-800 border-b-2 border-olive-800' 
                    : 'text-olive-600'
                } hover:text-olive-800 transition-all link-hover animate-float-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-olive-600 hover:text-olive-800 transition-all animate-fade-scale"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-scale">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {[
              { path: '/', label: 'Home' },
              { path: '/gifts', label: 'Lista de Presentes' },
              { path: '/rsvp', label: 'Confirmação' },
              { path: '/messages', label: 'Recados' }
            ].map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg ${
                  isActive(item.path) 
                    ? 'bg-olive-100 text-olive-800' 
                    : 'text-olive-600'
                } hover:bg-olive-200 transition-all animate-float-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;