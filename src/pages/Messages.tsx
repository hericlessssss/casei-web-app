import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

function Messages() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          created_at: new Date().toISOString()
        }
      ]);

      if (error) throw error;

      toast.success('Mensagem enviada com sucesso! Obrigado!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <MessageCircle className="w-16 h-16 text-olive-600 mx-auto mb-4" />
          <h1 className="font-serif text-4xl text-olive-800 mb-4">Deixe seu Recado</h1>
          <p className="text-gray-600">
            Compartilhe seus votos e mensagens de carinho para os noivos.
          </p>
        </div>

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
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Sua mensagem
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-olive-600 text-white px-6 py-3 rounded-md hover:bg-olive-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;