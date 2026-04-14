export const PLANS = [
  {
    key: "monthly",
    name: "Comunidade Fitoclin",
    description: "O ponto de partida ideal para transformar sua saúde.",
    price: 49.90,
    priceId: process.env.STRIPE_PRICE_ID_MONTHLY,
    features: [
      "Acesso aos cursos base da Comunidade",
      "Materiais de apoio e e-books exclusivos",
      "Participação no fórum de alunos",
      "Aulas semanais ao vivo"
    ],
    highlight: false,
    buttonText: "Começar Agora"
  },
  {
    key: "specialization",
    name: "Especialização Fitoclin",
    description: "Formação completa para profissionais da saúde.",
    price: 99.90,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SPECIALIZATION, // 👈 Placeholder ou novo ID
    features: [
      "Tudo do plano Comunidade",
      "Acesso total à Área de Especialização",
      "Cursos técnicos e protocolos aprofundados",
      "Certificados de conclusão válidos",
      "Mentorias gravadas com Dra. Isa"
    ],
    highlight: true,
    buttonText: "Desbloquear Especialização"
  },
  {
    key: "crm_pro",
    name: "Fitoclin PRO (CRM)",
    description: "Para terapeutas e profissionais de saúde",
    price: 197.00,
    priceId: process.env.STRIPE_PRICE_ID_CRM,
    features: [
      "Tudo do plano Comunidade",
      "Dashboard Administrativo Próprio",
      "Gestão de Pacientes Ilimitada",
      "Prontuário Eletrônico (PEP)",
      "Agenda e Financeiro"
    ],
    highlight: true,
    buttonText: "Assinar CRM Profissional"
  }
];