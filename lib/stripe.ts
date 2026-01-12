import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2025-12-15.clover", // Use a versão mais recente
  typescript: true,
});

export function getAbsoluteUrl(path: string) {
  // Se estivermos no ambiente de desenvolvimento, usamos localhost
  if (process.env.NEXT_PUBLIC_APP_URL) return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
  return `http://localhost:3000${path}`;
}