import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;
    let url = "";

    if (type === "essencial") {
        url = process.env.HOTMART_CHECKOUT_ESSENTIAL || "";
    } else if (type === "premium") {
        url = process.env.HOTMART_CHECKOUT_PREMIUM || "";
    }

    if (!url) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.redirect(url);
}
