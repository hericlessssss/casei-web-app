import { Gift } from '../types/gift';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sua-url.supabase.co'; // Coloque a URL do seu projeto Supabase
const supabaseKey = 'sua-chave-de-api'; // Coloque a chave do Supabase (API Key)
export const supabase = createClient(supabaseUrl, supabaseKey);

export const gifts: Gift[] = [
  {
    id: '1',
    name: 'Jogo de Panelas Tramontina',
    price: 899.90,
    image: 'https://images.unsplash.com/photo-1584990347449-a8f1d78a1c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Conjunto de panelas em aço inox com 10 peças, incluindo tampas de vidro temperado.',
    suggestedStores: [
      { name: 'Magazine Luiza', url: 'https://www.magazineluiza.com.br' },
      { name: 'Amazon', url: 'https://www.amazon.com.br' }
    ],
    reserved: false
  },
  {
    id: '2',
    name: 'Liquidificador Philips Walita',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Liquidificador com 5 velocidades, função pulsar e copo de 2L.',
    suggestedStores: [
      { name: 'Casas Bahia', url: 'https://www.casasbahia.com.br' },
      { name: 'Amazon', url: 'https://www.amazon.com.br' }
    ],
    reserved: false
  },
  {
    id: '3',
    name: 'Smart TV Samsung 55"',
    price: 2799.90,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Smart TV LED 55" UHD 4K com processador Crystal 4K e WiFi integrado.',
    suggestedStores: [
      { name: 'Fast Shop', url: 'https://www.fastshop.com.br' },
      { name: 'Amazon', url: 'https://www.amazon.com.br' }
    ],
    reserved: false
  },
  {
    id: '4',
    name: 'Máquina de Café Nespresso',
    price: 649.90,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Máquina de café expresso automática com sistema de cápsulas.',
    suggestedStores: [
      { name: 'Nespresso', url: 'https://www.nespresso.com/br' },
      { name: 'Magazine Luiza', url: 'https://www.magazineluiza.com.br' }
    ],
    reserved: false
  },
  {
    id: '5',
    name: 'Jogo de Cama King Size',
    price: 459.90,
    image: 'https://images.unsplash.com/photo-1578898887155-76f2e159b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Jogo de cama king size 400 fios, 100% algodão egípcio.',
    suggestedStores: [
      { name: 'Zelo', url: 'https://www.zelo.com.br' },
      { name: 'Amazon', url: 'https://www.amazon.com.br' }
    ],
    reserved: false
  },
  {
    id: '6',
    name: 'Aspirador Robot',
    price: 1899.90,
    image: 'https://images.unsplash.com/photo-1589894404892-7310b92ea7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Aspirador de pó robô inteligente com mapeamento e controle por aplicativo.',
    suggestedStores: [
      { name: 'Fast Shop', url: 'https://www.fastshop.com.br' },
      { name: 'Amazon', url: 'https://www.amazon.com.br' }
    ],
    reserved: false
  },
  {
    id: '7',
    name: 'Kit Taças de Cristal',
    price: 399.90,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Conjunto com 12 taças de cristal para água, vinho tinto e espumante.',
    suggestedStores: [
      { name: 'Tok&Stok', url: 'https://www.tokstok.com.br' },
      { name: 'Amazon', url: 'https://www.amazon.com.br' }
    ],
    reserved: false
  },
  {
    id: '8',
    name: 'Forno Elétrico',
    price: 799.90,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Forno elétrico 44L com timer e funções programáveis.',
    suggestedStores: [
      { name: 'Magazine Luiza', url: 'https://www.magazineluiza.com.br' },
      { name: 'Casas Bahia', url: 'https://www.casasbahia.com.br' }
    ],
    reserved: false
  }
];