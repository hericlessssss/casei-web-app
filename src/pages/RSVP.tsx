import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '0',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRsvpEnabled, setIsRsvpEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRsvpStatus();
  }, []);

  const fetchRsvpStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('rsvp_enabled')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setIsRsvpEnabled(data[0].rsvp_enabled);
      } else {
        toast.error('Nenhuma configuração encontrada para RSVP.');
      }
    } catch (error) {
      console.error('Erro ao buscar status de RSVP:', error.message);
      toast.error('Erro ao buscar status de RSVP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name.trim()) {
      toast.error('Por favor, informe seu nome.');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const { error } = await supabase.from('rsvp').insert([
        {
          name: formData.name.trim(),
          guests_count: parseInt(formData.guests, 10),
        },
      ]);
  
      if (error) throw error;
  
      toast.success('Presença confirmada com sucesso! Obrigado!');
      setFormData({ name: '', guests: '0' });
    } catch (error) {
      console.error('Erro ao confirmar presença:', error.message);
      toast.error('Erro ao confirmar presença.');
    } finally {
      setIsSubmitting(false);
    }
  };  
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-olive-600 mx-auto mb-4" />
          <h1 className="font-serif text-4xl text-olive-800 mb-4">Confirmação de Presença</h1>
          <p className="text-gray-600">
  {isRsvpEnabled
    ? 'Ficaremos muito felizes com a sua presença em nosso casamento!'
    : 'As confirmações de presença estão desabilitadas no momento.'}
  {isRsvpEnabled && (
    <span>
      {' '}
      Faça a confirmação apenas com o <strong>convite individual</strong> em mãos.
    </span>
  )}
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
            <p className="text-gray-600">As confirmações de presença serão disponibilizadas faltando 2 meses para o casamento =D!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RSVP;
