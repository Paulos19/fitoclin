export const PLANS = [
  {
    key: "monthly",
    name: "Comunidade (Paciente)",
    description: "Para quem quer cuidar da própria saúde",
    price: 97.00,
    priceId: process.env.STRIPE_PRICE_ID_MONTHLY, 
    features: [
      "Acesso à Comunidade de Alunos",
      "Aulas de Auto-cuidado",
      "Protocolos de Fitoterapia",
      "Suporte em Grupo"
    ],
    highlight: false,
    buttonText: "Assinar Comunidade"
  },
  {
    key: "crm_pro",
    name: "Fitoclin PRO (CRM)",
    description: "Para terapeutas e profissionais de saúde",
    price: 197.00,
    priceId: process.env.STRIPE_PRICE_ID_CRM, // 👈 Novo ID no .env
    features: [
      "Tudo do plano Comunidade",
      "Dashboard Administrativo Próprio",
      "Gestão de Pacientes Ilimitada",
      "Prontuário Eletrônico (PEP)",
      "Agenda e Financeiro"
    ],
    highlight: true, // Destaque visual
    buttonText: "Assinar CRM Profissional"
  }
];