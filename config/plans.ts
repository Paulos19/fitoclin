export const PLANS = [
  {
    key: "monthly",
    name: "Plano Comunidade",
    description: "Acesso total à comunidade e cursos",
    price: 97.00,
    priceId: process.env.STRIPE_PRICE_ID_MONTHLY, // Lê do .env
    features: [
      "Acesso ilimitado à Comunidade",
      "Novos protocolos todo mês",
      "Aulas práticas com a Dra. Isa",
      "Suporte exclusivo",
      "Cancele quando quiser"
    ],
    highlight: true, // Define se é o card de destaque
    buttonText: "Assinar Agora"
  },
  // Se no futuro tiver um plano anual, basta adicionar aqui:
  /*
  {
    key: "yearly",
    name: "Plano Anual",
    ...
    priceId: process.env.STRIPE_PRICE_ID_YEARLY
  }
  */
];