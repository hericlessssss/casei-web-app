import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper function to apply active styles
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-white bg-opacity-90 backdrop-blur-lg shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-serif text-2xl text-olive-800">
              H & B
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-olive-800 border-b-2 border-olive-800' : 'text-olive-600'
              } hover:text-olive-800 transition-all`}
            >
              Home
            </Link>
            <Link
              to="/gifts"
              className={`${
                isActive('/gifts') ? 'text-olive-800 border-b-2 border-olive-800' : 'text-olive-600'
              } hover:text-olive-800 transition-all`}
            >
              Lista de Presentes
            </Link>
            <Link
              to="/rsvp"
              className={`${
                isActive('/rsvp') ? 'text-olive-800 border-b-2 border-olive-800' : 'text-olive-600'
              } hover:text-olive-800 transition-all`}
            >
              Confirmação
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-olive-600 hover:text-olive-800 transition-all"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-lg ${
                isActive('/') ? 'bg-olive-100 text-olive-800' : 'text-olive-600'
              } hover:bg-olive-200 transition-all`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/gifts"
              className={`block px-3 py-2 rounded-lg ${
                isActive('/gifts') ? 'bg-olive-100 text-olive-800' : 'text-olive-600'
              } hover:bg-olive-200 transition-all`}
              onClick={() => setIsOpen(false)}
            >
              Lista de Presentes
            </Link>
            <Link
              to="/rsvp"
              className={`block px-3 py-2 rounded-lg ${
                isActive('/rsvp') ? 'bg-olive-100 text-olive-800' : 'text-olive-600'
              } hover:bg-olive-200 transition-all`}
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
