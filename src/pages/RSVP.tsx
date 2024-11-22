import React, { useState } from 'react';
import { Users } from 'lucide-react';
import toast from 'react-hot-toast';

function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '0',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Por favor, informe seu nome');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Presença confirmada com sucesso! Obrigado!');
    setFormData({ name: '', guests: '0' });
    setIsSubmitting(false);
  };

  const currentDate = new Date();
  const rsvpStartDate = new Date('2025-05-01');
  const isRsvpEnabled = currentDate >= rsvpStartDate;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-olive-600 mx-auto mb-4" />
          <h1 className="font-serif text-4xl text-olive-800 mb-4">Confirmação de Presença</h1>
          <p className="text-gray-600">
            {isRsvpEnabled
              ? 'Ficaremos muito felizes com a sua presença em nosso casamento.'
              : 'As confirmações de presença estarão disponíveis a partir de maio de 2025.'}
          </p>
        </div>

        {isRsvpEnabled ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="guests" className="block text-gray-700 mb-2">
                Número de acompanhantes
              </label>
              <select
                id="guests"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-olive-600 text-white px-6 py-3 rounded-md hover:bg-olive-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Confirmando...' : 'Confirmar presença'}
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              Aguarde até maio de 2025 para confirmar sua presença.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RSVP;