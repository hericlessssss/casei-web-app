# 💑 Site do meu casamento - Héricles & Bruna

<div align="center">

![Wedding Banner](https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)

[![Made with Love](https://img.shields.io/badge/Made%20with-Love-pink.svg)](https://www.instagram.com/labora_tech/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green.svg)](https://hericles-bruna-vao-casar.netlify.app/)

</div>

Esse site utiliza React, Vite e Supabase. O site permite que os convidados visualizem e reservem presentes de casamento, além de confirmar sua presença.

## ✨ Funcionalidades

- 🎁 Lista de presentes com sistema de reserva
- ✉️ Funcionalidade de RSVP
- 👑 Painel administrativo para gerenciamento de presentes
- 📱 Design responsivo otimizado para dispositivos móveis
- 🔄 Atualizações em tempo real usando Supabase
- 🔒 Autenticação segura para administradores

## 🚀 Instruções de Configuração

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Crie uma conta e projeto no Supabase em https://supabase.com
4. Crie as seguintes tabelas no seu banco de dados Supabase:

```sql
-- Criar tabela de presentes
create table gifts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price decimal not null,
  image text not null,
  description text not null,
  suggested_stores jsonb not null,
  reserved boolean default false,
  reserved_by text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criar tabela de configurações
create table settings (
  id serial primary key,
  rsvp_enabled boolean default false
);

-- Criar tabela de RSVP
create table rsvp (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  guests integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criar tabela de administradores
create table admins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Inserir configurações iniciais
insert into settings (id, rsvp_enabled) values (1, false);

-- Configurar Row Level Security (RLS)
alter table gifts enable row level security;
alter table settings enable row level security;
alter table rsvp enable row level security;
alter table admins enable row level security;

-- Criar políticas
create policy "Público pode visualizar presentes" on gifts for select using (true);
create policy "Admins podem inserir presentes" on gifts for insert with check (exists (select 1 from admins where user_id = auth.uid()));
create policy "Admins podem atualizar presentes" on gifts for update using (exists (select 1 from admins where user_id = auth.uid()));
create policy "Admins podem deletar presentes" on gifts for delete using (exists (select 1 from admins where user_id = auth.uid()));

create policy "Público pode visualizar configurações" on settings for select using (true);
create policy "Admins podem atualizar configurações" on settings for update using (exists (select 1 from admins where user_id = auth.uid()));

create policy "Público pode inserir RSVP" on rsvp for insert with check (true);
create policy "Admins podem visualizar RSVP" on rsvp for select using (exists (select 1 from admins where user_id = auth.uid()));

create policy "Admins podem visualizar lista de admins" on admins for select using (exists (select 1 from admins where user_id = auth.uid()));
```

5. Configure a Autenticação no Supabase:
   - Acesse Authentication > Providers
   - Habilite o provedor Email
   - Desabilite "Confirmar email" se desejar acesso imediato
   - Configure as políticas de senha conforme sua preferência

6. Crie um usuário administrador:
   - Acesse Authentication > Users
   - Clique em "Convidar usuário"
   - Digite o email do administrador
   - Após criar o usuário, copie seu UUID
   - Use o editor SQL para inserir o registro de admin:
   ```sql
   insert into admins (user_id, name)
   values ('cole-o-uuid-do-usuario-aqui', 'Nome do Admin');
   ```

7. Copie sua URL e chave anon do Supabase das configurações do projeto
8. Crie um arquivo `.env` com as seguintes variáveis:
   ```
   VITE_SUPABASE_URL=sua_url_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_supabase
   ```
9. Execute o servidor de desenvolvimento: `npm run dev`

## 👩‍💼 Acesso Administrativo

Para acessar o painel administrativo:

1. Navegue até a rota `/login` no seu navegador
2. Digite suas credenciais de administrador (email e senha)
3. Após autenticação bem-sucedida, você será redirecionado para `/admin`
4. O painel administrativo permite:
   - Adicionar novos presentes à lista
   - Habilitar/desabilitar funcionalidade de RSVP
   - Visualizar presentes reservados e confirmações de RSVP
   - Gerenciar detalhes e disponibilidade dos presentes

## 🔒 Recursos de Segurança

- Políticas de Row Level Security (RLS) garantem a proteção dos dados
- Rotas administrativas protegidas por autenticação
- Gerenciamento de sessão com logout automático
- Políticas de senha seguras através do Supabase
- Endpoints da API protegidos

## 🚀 Configuração de Deploy no Netlify

1. Faça login no Netlify
2. Conecte seu repositório Git
3. Configure as variáveis de ambiente:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Configure as opções de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

## 💝 Desenvolvido com amor

por [Labora Tech](https://www.instagram.com/labora_tech/)
