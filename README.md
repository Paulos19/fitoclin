# Fitoclin 🌿

Plataforma integrada de gestão clínica, prontuário eletrônico (PEP) e ensino à distância (LMS) focada em Fitoterapia. O sistema atende tanto à gestão administrativa (CRM, Financeiro, Agenda) quanto à experiência do paciente e venda de cursos.

## 📋 Sobre o Projeto

O **Fitoclin** é uma solução completa desenvolvida para modernizar o atendimento em fitoterapia. Ele centraliza a gestão da clínica, oferecendo ferramentas para agendamento, acompanhamento de pacientes através do "Método dos 5 Pilares", prescrição de fitoterápicos, gestão financeira e uma área de membros para alunos de cursos online.

### Principais Atores
* **Admin (Dra. Isa):** Acesso total ao dashboard, gestão de pacientes, financeiro, CRM e criação de conteúdo.
* **Paciente:** Acesso à área do paciente para visualizar agendamentos, prescrições, materiais e check-ins semanais.
* **Aluno:** Acesso à área de comunidade para assistir aulas e acompanhar o progresso nos cursos.

## 🚀 Funcionalidades

### 🌐 Website (Landing Page)
* Página inicial gerenciável via CMS (Dashboard).
* Seções: Hero, Sobre, Método, Serviços, Cursos, Planos, Materiais e Contato.
* Integração direta com o WhatsApp e Instagram.

### 🏥 Dashboard Administrativo
* **CRM (Kanban):** Gestão de leads com status (Novo, Contatado, Agendado, Ganho, Perdido).
* **Agenda Inteligente:** Gestão de horários, bloqueios e agendamentos com verificação de conflitos.
* **Prontuário Eletrônico (PEP):**
    * Anamnese detalhada (Física, Emocional, Espiritual).
    * Método 5 Pilares (Investigação, Fitoterapia, Metabolismo, Estresse, Evolução).
    * Upload e gestão de Exames.
* **Prescrições:** Criação de receitas e geração de PDF.
* **Financeiro:** Controle de Receitas e Despesas, gráficos de evolução.
* **Documentos:** Gestão de arquivos e modelos.

### 🎓 LMS (Learning Management System)
* Criação e gestão de Cursos, Módulos e Aulas.
* Suporte a vídeo-aulas (YouTube, Vimeo, Blob).
* Acompanhamento de progresso do aluno.
* Página de vendas e checkout integrado.

### 💳 Assinaturas e Pagamentos
* Integração com **Stripe** para processamento de pagamentos.
* Gestão de Planos (Mensal/Anual) e Assinaturas.
* Webhooks para atualização automática de status.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as tecnologias mais recentes do ecossistema React/Node.js:

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Autenticação:** [NextAuth.js (v5 Beta)](https://authjs.dev/)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Componentes UI:** [Shadcn/ui](https://ui.shadcn.com/) + Radix UI
* **Pagamentos:** [Stripe SDK](https://stripe.com/)
* **Emails:** Nodemailer
* **Uploads:** Vercel Blob
* **Gráficos:** Recharts
* **Validação:** Zod
* **Formatação/Linting:** Eslint, Prettier

## 📦 Instalação e Configuração

### Pré-requisitos
* Node.js (v20 ou superior)
* Gerenciador de pacotes (npm, pnpm ou yarn)
* Banco de dados PostgreSQL (local ou nuvem, ex: Neon, Supabase)

## 🗂️ Estrutura do Projeto

```text
fitoclin/
├── actions/          # Server Actions (Lógica de backend: auth, crm, financial...)
├── app/              # Next.js App Router (Páginas e Rotas)
│   ├── (auth)/       # Rotas de Autenticação (Login, Register)
│   ├── (community)/  # Área de Cursos/Comunidade
│   ├── (dashboard)/  # Painel Administrativo e do Paciente
│   ├── (website)/    # Landing Page Pública
│   └── api/          # Rotas de API (Webhooks, Auth)
├── components/       # Componentes React Reutilizáveis
│   ├── dashboard/    # Componentes específicos do dashboard
│   ├── home/         # Seções da Landing Page
│   └── ui/           # Componentes base (Shadcn)
├── config/           # Configurações estáticas (ex: planos)
├── lib/              # Utilitários (db connection, stripe, utils)
├── prisma/           # Schema do Banco de Dados e Migrations
└── public/           # Arquivos estáticos (imagens, ícones)
