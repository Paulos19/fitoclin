import type { Metadata } from "next";
import Script from "next/script";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_DESINFLAMA_ID || "1812713553212107";

export const metadata: Metadata = {
  title: "Clube Desinflama 360 | Dra. Isa Bieski - Método FITOCLIN®",
  description:
    "Desinflame seus hábitos, recupere seu sono, seu intestino e sua energia vital em uma jornada prática de 6 meses com a Dra. Isa Bieski e o Método FITOCLIN®.",
  keywords: [
    "Clube Desinflama 360",
    "Dra. Isa Bieski",
    "FITOCLIN",
    "Fitoterapia",
    "Saúde Integrativa",
    "Desinflamação",
    "Plantas Medicinais",
    "Sono Reparador",
    "Saúde Intestinal",
  ],
  openGraph: {
    title: "Clube Desinflama 360 | Dra. Isa Bieski - Método FITOCLIN®",
    description:
      "Tomar remédios não resolve seus problemas de peso, dores e indisposição porque tratam apenas os sintomas. Assista à aula gratuita e descubra o método.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Clube Desinflama 360 - Dra. Isa Bieski",
      },
    ],
  },
};

export default function Desinflama360Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#f6faf7] text-[#0f2417] antialiased selection:bg-emerald-200 selection:text-emerald-950 font-sans overflow-x-clip">
      {/* Meta Pixel (Facebook) - Clube Desinflama 360 */}
      <Script
        id="meta-pixel-desinflama360"
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
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt="facebook-pixel-desinflama360"
        />
      </noscript>

      {/* Estilos e Variáveis Customizadas de Glassmorphism & Shaders Botânicos */}
      <style>{`
        :root {
          --glass-bg: rgba(255, 255, 255, 0.78);
          --glass-border: rgba(255, 255, 255, 0.9);
          --glass-shadow: 0 20px 50px -15px rgba(16, 185, 129, 0.08);
          --glass-highlight: rgba(255, 255, 255, 0.95);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Conteúdo da Landing Page Isolada */}
      <main className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}

