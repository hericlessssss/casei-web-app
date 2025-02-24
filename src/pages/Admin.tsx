import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRSVPStatus();
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      toast.error('Erro ao carregar mensagens');
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Mensagem excluída com sucesso!');
      fetchMessages();
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error);
      toast.error('Erro ao excluir mensagem');
    }
  };

  const fetchRSVPStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('rsvp_enabled')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setRsvpEnabled(data[0].rsvp_enabled);
      } else {
        toast.error('Nenhuma configuração de RSVP encontrada.');
      }
    } catch (error) {
      console.error('Erro ao buscar status de RSVP:', error.message);
      toast.error('Erro ao buscar status de RSVP.');
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
      const { error } = await supabase.from('gifts').insert([
        {
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image,
          description: formData.description,
          suggested_stores: formData.stores,
          reserved: false
        }
      ]);

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
      toast.error('Erro ao adicionar presente.');
      console.error('Erro ao adicionar presente:', error.message);
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
      toast.success(
        `Confirmações de presença ${!rsvpEnabled ? 'habilitadas' : 'desabilitadas'}.`
      );
    } catch (error) {
      toast.error('Erro ao atualizar configurações.');
      console.error('Erro ao atualizar configurações:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success('Logout realizado com sucesso.');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao realizar logout:', error.message);
      toast.error('Erro ao realizar logout.');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl text-olive-800">Administração</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Configurações */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-serif text-xl text-olive-800 mb-4">Configurações</h2>
          <button
            onClick={toggleRSVP}
            className={`px-4 py-2 rounded-md ${
              rsvpEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
          >
            {rsvpEnabled ? 'Desabilitar' : 'Habilitar'} Confirmações
          </button>
        </div>

        {/* Gerenciar Presentes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-serif text-xl text-olive-800 mb-4">Gerenciar Presentes</h2>
          <Link
            to="/gift-management"
            className="w-full bg-olive-600 text-white px-6 py-3 rounded-md hover:bg-olive-700 transition-colors"
          >
            Gerenciar Presentes
          </Link>
        </div>

        {/* Messages Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-serif text-xl text-olive-800 mb-6">Mensagens dos Convidados</h2>
          
          {loadingMessages ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-600">Nenhuma mensagem recebida ainda.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="bg-olive-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-olive-800">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-700">{message.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(message.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Adicionar Presente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-serif text-xl text-olive-800 mb-4">Adicionar Presente</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome do Presente */}
            <div>
              <label className="block text-gray-700 mb-2">Nome do Presente</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive-500"
                required
              />
            </div>

            {/* Preço */}
            <div>
              <label className="block text-gray-700 mb-2">Preço Médio (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1 italic">
                *Insira um valor médio de referência, pois o preço pode variar conforme a loja e a data da compra
              </p>
            </div>

            {/* URL da Imagem */}
            <div>
              <label className="block text-gray-700 mb-2">URL da Imagem</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive-500"
                required
              />
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Pré-visualização"
                    className="max-w-full h-auto rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-gray-700 mb-2">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive-500"
                rows={3}
                required
              />
            </div>

            {/* Lojas Sugeridas */}
            <div>
              <label className="block text-gray-700 mb-2">Lojas Sugeridas</label>
              {formData.stores.map((store, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nome da Loja"
                    value={store.name}
                    onChange={(e) => handleStoreChange(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-olive-500"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL da Loja"
                    value={store.url}
                    onChange={(e) => handleStoreChange(index, 'url', e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-olive-500"
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

            {/* Botão de Enviar */}
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