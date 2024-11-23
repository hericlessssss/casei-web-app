import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

function Admin() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    stores: [{ name: '', url: '' }]
  });
  const [rsvpEnabled, setRsvpEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRSVPStatus();
  }, []);

  const fetchRSVPStatus = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('rsvp_enabled')
      .single();

    if (!error && data) {
      setRsvpEnabled(data.rsvp_enabled);
    }
  };

  const handleStoreChange = (index: number, field: 'name' | 'url', value: string) => {
    const newStores = [...formData.stores];
    newStores[index][field] = value;
    setFormData({ ...formData, stores: newStores });
  };

  const addStore = () => {
    setFormData({
      ...formData,
      stores: [...formData.stores, { name: '', url: '' }]
    });
  };

  const removeStore = (index: number) => {
    const newStores = formData.stores.filter((_, i) => i !== index);
    setFormData({ ...formData, stores: newStores });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('gifts').insert([{
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        description: formData.description,
        suggested_stores: formData.stores,
        reserved: false
      }]);

      if (error) throw error;

      toast.success('Presente adicionado com sucesso!');
      setFormData({
        name: '',
        price: '',
        image: '',
        description: '',
        stores: [{ name: '', url: '' }]
      });
    } catch (error) {
      toast.error('Erro ao adicionar presente');
    } finally {
      setLoading(false);
    }
  };

  const toggleRSVP = async () => {
    try {
      const { error } = await supabase
        .from('settings')
        .update({ rsvp_enabled: !rsvpEnabled })
        .eq('id', 1);

      if (error) throw error;

      setRsvpEnabled(!rsvpEnabled);
      toast.success(`Confirmações de presença ${!rsvpEnabled ? 'habilitadas' : 'desabilitadas'}`);
    } catch (error) {
      toast.error('Erro ao atualizar configurações');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl text-olive-800 mb-8">Administração</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-serif text-xl text-olive-800 mb-4">Configurações</h2>
          <button
            onClick={toggleRSVP}
            className={`px-4 py-2 rounded-md ${
              rsvpEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-olive-600 hover:bg-olive-600'
            } text-white transition-colors`}
          >
            {rsvpEnabled ? 'Desabilitar' : 'Habilitar'} Confirmações
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-serif text-xl text-olive-800 mb-4">Adicionar Presente</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Nome do Presente</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 15) { // Permite até 15 caracteres
                    setFormData({ ...formData, price: value });
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                required
              />
            </div>

            <div>
            <label className="block text-gray-700 mb-2">URL da Imagem</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
              required
            />
            {formData.image && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Pré-visualização"
                  className="max-w-full h-auto rounded-md border border-gray-300"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>


            <div>
              <label className="block text-gray-700 mb-2">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Lojas Sugeridas</label>
              {formData.stores.map((store, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nome da Loja"
                    value={store.name}
                    onChange={(e) => handleStoreChange(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL da Loja"
                    value={store.url}
                    onChange={(e) => handleStoreChange(index, 'url', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeStore(index)}
                      className="p-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addStore}
                className="mt-2 flex items-center text-olive-600 hover:text-olive-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Loja
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive-600 text-white px-6 py-3 rounded-md hover:bg-olive-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adicionando...' : 'Adicionar Presente'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;