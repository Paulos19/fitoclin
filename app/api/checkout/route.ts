import { redirect } from "next/navigation";

export async function GET() {
    const checkoutUrl = process.env.CHECKOUT_URL;

    if (!checkoutUrl) {
        return new Response("Checkout URL not configured", { status: 500 });
    }

    redirect(checkoutUrl);
}
