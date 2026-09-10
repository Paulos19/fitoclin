import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitoclin - Dra. Isa",
  description: "Clínica de Fitoterapia e Saúde Integrativa",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${font.className} antialiased bg-[#F8FAF9]`} suppressHydrationWarning>
        {/* Meta Pixel (Facebook) */}
        {pixelId && (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${pixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt="facebook-pixel-fallback"
              />
            </noscript>
          </>
        )}

        {/* O Providers envolve tudo para garantir acesso à Sessão em qualquer lugar */}
        <Providers>

          <div className="w-full max-w-full overflow-x-hidden relative flex flex-col min-h-screen">
            {children}
          </div>

          <Toaster richColors position="top-right" closeButton />
        </Providers>
      </body>
    </html>
  );
}