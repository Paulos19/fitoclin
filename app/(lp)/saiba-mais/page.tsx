"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Star, ChevronDown, Lock, Crown, BookOpen, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// --- URL DO CHECKOUT ---
const CHECKOUT_URL = "https://pay.kiwify.com.br/jblYbMp";

// --- COMPONENTES DE UI PREMIUM (LUXURY THEME) ---

const GoldCTA = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Link href={CHECKOUT_URL} target="_blank" className="w-full md:w-auto block">
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 0 40px -5px rgba(212, 175, 55, 0.4)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full md:w-auto overflow-hidden group bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black px-10 py-5 rounded-sm text-lg font-bold tracking-widest uppercase shadow-2xl transition-all duration-300",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out skew-y-12" />
    </motion.button>
  </Link>
);

const SectionHeading = ({ subtitle, title }: { subtitle: string, title: React.ReactNode }) => (
    <div className="mb-12 md:mb-20">
        <span className="block text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 pl-1 border-l-2 border-[#D4AF37]">
            {subtitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            {title}
        </h2>
    </div>
);

// --- PÁGINA PRINCIPAL ---

export default function ManualFitoterapiaProPage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* --- DOBRA 1: HERO (High Authority) --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Imagem de Fundo Escurecida para dar tom de mistério/exclusividade */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src="/banner-lp.jpeg" 
            alt="Background" 
            fill 
            className="object-cover opacity-20 grayscale contrast-125" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#050505]" />
          {/* Textura de ruído para aspecto premium */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "url('/noise.png')" }}></div>
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 mb-8 border border-[#D4AF37]/30 px-4 py-1 rounded-full bg-[#D4AF37]/5 backdrop-blur-md">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Edição Profissional</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1] mb-8 tracking-tight">
              MANUAL DA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                FITOTERAPIA DE VALOR
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto border-t border-b border-white/10 py-6">
              Descubra o que profissionais bem pagos fazem para se tornar referência em fitoterapia.
            </p>
            
            <div className="flex justify-center">
                <GoldCTA>QUERO DESCOBRIR</GoldCTA>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.2, 1, 0.2] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#D4AF37]"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* --- DOBRAS 2, 3, 4 e 5: STICKY NARRATIVE (Storytelling) --- */}
      {/* Agrupamos essas dobras pois contam uma história contínua */}
      <StickyStorytelling />

      {/* --- DOBRA 6: O QUE VOCÊ VAI DESCOBRIR --- */}
      <section className="py-32 bg-[#080808] relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
         
         <div className="container mx-auto px-6">
            <SectionHeading 
                subtitle="Conteúdo Estratégico"
                title={<>Não é um manual técnico. <br/><span className="italic text-gray-500">É um manual de visão.</span></>}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    // Mudança aqui: Passamos o componente (ex: Target) sem as tags < >
                    { t: "Crescimento vs Desistência", d: "Por que alguns crescem rápido na fitoterapia e outros desistem.", Icon: Target },
                    { t: "Antes da Prescrição", d: "O que acontece nos bastidores de um atendimento de alto valor.", Icon: BookOpen },
                    { t: "Curiosidade em Lucro", d: "Como transformar interesse genuíno em diferencial estratégico.", Icon: Star },
                    { t: "Ampliação de Autoridade", d: "Como ser visto como a única opção viável na sua região.", Icon: Crown },
                    { t: "Nova Fase Profissional", d: "Construindo uma carreira com direção, propósito e retorno.", Icon: Award },
                ].map((item, i) => (
                    <div key={i} className="group p-8 bg-white/5 border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 rounded-sm hover:bg-white/[0.07]">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {/* Agora renderizamos o componente diretamente com a classe */}
                            <item.Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-4">{item.t}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{item.d}</p>
                    </div>
                ))}

                {/* Card CTA (Mantido igual) */}
                <div className="relative p-8 bg-[#D4AF37] rounded-sm flex flex-col justify-center items-center text-center overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <Image src="/banner-lp.jpeg" alt="bg" fill className="object-cover opacity-20 mix-blend-overlay" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-serif text-black font-bold mb-2">Você vai enxergar além da planta.</h3>
                        <p className="text-black/80 text-sm mb-6">Talvez enxergar sua própria carreira com novos olhos.</p>
                        <ArrowRight className="w-8 h-8 text-black mx-auto" />
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* --- DOBRA 7: PARA QUEM É / NÃO É --- */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                {/* Positive */}
                <div className="bg-[#0a0a0a] p-12 hover:bg-[#0f0f0f] transition-colors">
                    <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                        <Check className="w-6 h-6 text-[#D4AF37]" /> Para você se:
                    </h3>
                    <ul className="space-y-6">
                        {[
                            "Já atua na área da saúde e tem experiência",
                            "Sente que sua carreira parou de crescer",
                            "Busca uma nova forma de cuidar e se posicionar",
                            "Percebe na fitoterapia uma oportunidade real",
                            "Entende que crescimento exige estratégia"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 text-gray-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 shrink-0"/>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Negative */}
                <div className="bg-[#0a0a0a] p-12 hover:bg-[#0f0f0f] transition-colors">
                    <h3 className="text-2xl font-serif text-gray-400 mb-8 flex items-center gap-3">
                        <X className="w-6 h-6 text-red-900" /> NÃO é para você se:
                    </h3>
                    <ul className="space-y-6">
                        {[
                            "Busca receitas prontas e fáceis",
                            "Quer apenas 'experimentar algo novo'",
                            "Não está disposto a repensar sua atuação",
                            "Procura atalhos sem fundamento"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 text-gray-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-900/50 mt-2.5 shrink-0"/>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="mt-12 text-center">
                <GoldCTA className="px-16">ESSE MANUAL É PARA MIM</GoldCTA>
            </div>
        </div>
      </section>

      {/* --- DOBRA 8: PROPÓSITO E AUTORIDADE (Isa) --- */}
      <section className="relative py-32 overflow-hidden bg-[#080808]">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Imagem Isa */}
            <div className="relative order-2 lg:order-1 h-[600px] flex items-end justify-center">
                 {/* Elemento gráfico de fundo */}
                 <div className="absolute inset-x-10 bottom-0 top-20 border border-[#D4AF37]/20 rounded-t-full" />
                 
                 <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-md"
                 >
                     <Image 
                        src="/isa.png" 
                        alt="Dra Isa Bieski" 
                        width={600} 
                        height={800} 
                        className="object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                     />
                 </motion.div>
            </div>

            {/* Texto */}
            <div className="order-1 lg:order-2">
                <div className="mb-8">
                     <Image src="/logo.png" alt="Logo" width={150} height={50} className="brightness-0 invert opacity-50 mb-6" />
                     <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
                        O Propósito por trás deste manual
                     </h2>
                </div>

                <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed border-l border-[#D4AF37]/30 pl-8">
                    <p>
                        Cuidar da vida exige mais do que técnica. Exige visão. Exige responsabilidade. Exige consciência.
                    </p>
                    <p className="text-white font-serif text-2xl italic">Exige FÉ.</p>
                    <p>
                        A fitoterapia, quando levada a sério, não é moda. É um caminho de maturidade profissional.
                    </p>
                    <p>
                        O meu propósito é claro: difundir a metodologia Fitoclin para que você possa estar comigo nessa jornada.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- DOBRA 9: O PRÓXIMO PASSO (Preço) --- */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Background Luxo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-black to-black" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto border border-[#D4AF37]/30 bg-black/50 backdrop-blur-xl p-10 md:p-16 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.1)]"
            >
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">O Próximo Passo</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
                    A fitoterapia é apenas curiosidade ou será o próximo nível da sua carreira? Quando existe direção, a oportunidade deixa de ser dúvida.
                </p>

                <div className="py-8 border-t border-b border-white/10 mb-10">
                    <p className="text-[#D4AF37] text-sm tracking-widest uppercase mb-2">Acesso Imediato</p>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-gray-600 line-through text-xl">R$ 97,00</span>
                        <span className="text-6xl md:text-7xl font-serif text-white">R$ 47,00</span>
                    </div>
                </div>

                <GoldCTA className="w-full md:w-2/3 mx-auto py-6 text-xl">
                    QUERO LIBERAR MEU ACESSO
                </GoldCTA>
                
                <p className="mt-6 text-gray-500 text-sm flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" /> Pagamento Seguro via Kiwify
                </p>
            </motion.div>
        </div>
      </section>

      {/* --- DOBRA 10: QUEM É DRA ISA (BIO) --- */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
         <div className="container mx-auto px-6">
             <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
                 {/* Espaço para Foto Bio */}
                 <div className="relative aspect-[3/4] bg-white/5 border border-white/10 rounded-sm overflow-hidden group">
                    <Image src="/isa.png" alt="Dra Isa" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                 </div>

                 {/* Espaço para Texto Bio */}
                 <div className="space-y-6">
                     <h3 className="text-2xl font-serif text-[#D4AF37]">Quem é Dra. Isa Bieski?</h3>
                     <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base bg-white/5 p-8 border border-white/5 rounded-sm">
                         {/* Placeholder para texto */}
                         <p>[Inserir biografia profissional aqui]</p>
                         <p>Referência nacional em Fitoterapia...</p>
                         <p>Criadora do Método Fitoclin...</p>
                         <p>Mais de X alunos formados...</p>
                     </div>
                     <Image src="/logo.png" alt="Fitoclin" width={120} height={40} className="brightness-0 invert opacity-30" />
                 </div>
             </div>
         </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-8 bg-black border-t border-white/5 text-center text-gray-600 text-xs uppercase tracking-widest">
         <p>&copy; {new Date().getFullYear()} Fitoclin. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}

// --- COMPONENTE DE NARRATIVA (DOBRAS 2, 3, 4, 5) ---

const storyContent = [
    {
        // DOBRA 2
        id: "limit",
        title: "O Limite Invisível",
        content: (
            <>
                <p className="text-xl font-light text-white mb-6">
                    Se você já é um profissional da saúde, mas sente que sua carreira chegou a um limite, este manual é para você.
                </p>
                <div className="space-y-4 border-l-2 border-[#D4AF37] pl-6 mb-8">
                    <p>Você tem formação e experiência. Atende todos os dias.</p>
                    <p>Mas a rotina ficou previsível. O reconhecimento não acompanha o esforço. A remuneração estagnou.</p>
                </div>
                <p className="text-gray-400">
                    A fitoterapia começa a aparecer. Às vezes como curiosidade, às vezes como a pergunta silenciosa: <br/>
                    <span className="text-white italic">"Será que existe outro caminho?"</span>
                </p>
            </>
        ),
        image: "/1.png",
        imageCaption: "A Estagnação"
    },
    {
        // DOBRA 3
        id: "problem",
        title: "O Limite do Modelo",
        content: (
            <>
                <p className="text-xl font-light text-white mb-6">
                    O problema não é sua profissão. É ter chegado ao teto do modelo tradicional.
                </p>
                <ul className="space-y-3 text-gray-400 mb-8">
                    <li className="flex gap-3"><ArrowRight className="w-5 h-5 text-[#D4AF37]" /> Seguir apenas protocolos já não basta</li>
                    <li className="flex gap-3"><ArrowRight className="w-5 h-5 text-[#D4AF37]" /> O paciente quer mais visão e cuidado</li>
                    <li className="flex gap-3"><ArrowRight className="w-5 h-5 text-[#D4AF37]" /> O mercado valoriza o diferente</li>
                </ul>
                <p className="text-gray-400">
                    A fitoterapia surge não como moda, mas como <strong className="text-white">oportunidade de expansão profissional</strong>.
                </p>
            </>
        ),
        image: "/2.png",
        imageCaption: "A Barreira"
    },
    {
        // DOBRA 4
        id: "mistake",
        title: "Onde Muitos Erram",
        content: (
            <>
                <div className="bg-red-900/10 border border-red-900/30 p-6 mb-8 rounded-sm">
                    <h4 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4">A Visão Equivocada</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>• Enxergam apenas como técnica</li>
                        <li>• Tratam como complemento superficial</li>
                        <li>• Estudam de forma curiosa, sem direção</li>
                    </ul>
                </div>
                <p className="text-white text-lg">
                    Resultado? <span className="text-gray-400">Frustração, insegurança e uso raso. Sem visão estratégica, não há crescimento.</span>
                </p>
            </>
        ),
        image: "/3.png",
        imageCaption: "O Erro"
    },
    {
        // DOBRA 5
        id: "solution",
        title: "A Visão dos Bem Pagos",
        content: (
            <>
                <p className="text-xl font-light text-white mb-6">
                    Profissionais reconhecidos não entram por impulso. Eles entendem que fitoterapia é <strong className="text-[#D4AF37]">POSICIONAMENTO</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4">
                     {[
                        "Eixo de expansão profissional",
                        "Forma de se destacar no mercado",
                        "Caminho para autoridade",
                        "Estratégia para crescimento sustentável",
                        "Edificação espiritual de vidas"
                     ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-sm border border-white/5">
                             <Check className="w-4 h-4 text-[#D4AF37]" />
                             <span className="text-gray-300 text-sm">{item}</span>
                         </div>
                     ))}
                </div>
            </>
        ),
        image: "/4.png",
        imageCaption: "A Estratégia"
    }
];

function StickyStorytelling() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="relative bg-[#050505] border-b border-white/5">
            <div className="flex flex-col md:flex-row">
                
                {/* LADO ESQUERDO: TEXTO SCROLLÁVEL */}
                <div className="w-full md:w-1/2 relative z-10">
                    <div className="pt-20 pb-40">
                        {storyContent.map((step, index) => (
                            <NarrativeBlock 
                                key={step.id} 
                                step={step} 
                                index={index} 
                                setActiveStep={setActiveStep} 
                                isActive={activeStep === index} 
                            />
                        ))}
                    </div>
                </div>

                {/* LADO DIREITO: IMAGEM FIXA (STICKY) */}
                <div className="hidden md:block w-1/2 h-screen sticky top-0 bg-[#080808] border-l border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/globe.svg')] opacity-5 bg-center bg-no-repeat" />
                    
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                className="relative w-full max-w-md aspect-square"
                            >
                                {/* Moldura Dourada */}
                                <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-sm transform rotate-3 scale-105" />
                                <div className="absolute inset-0 border border-white/5 rounded-sm transform -rotate-2 bg-[#050505]" />
                                
                                <Image 
                                    src={storyContent[activeStep].image} 
                                    alt="Narrative" 
                                    fill 
                                    className="object-contain p-8 drop-shadow-2xl relative z-10"
                                />
                                
                                <div className="absolute -bottom-12 left-0 w-full text-center">
                                    <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold">
                                        {storyContent[activeStep].imageCaption}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    )
}

function NarrativeBlock({ step, index, setActiveStep, isActive }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) setActiveStep(index);
    }, [isInView, index, setActiveStep]);

    return (
        <div ref={ref} className="min-h-screen flex items-center p-8 md:p-16 border-l-2 border-white/5 md:border-none relative transition-colors duration-500">
             {/* Indicador de Progresso Lateral (Mobile) */}
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] transform origin-top transition-transform duration-500 md:hidden" 
                  style={{ transform: isActive ? "scaleY(1)" : "scaleY(0)" }} />

             <motion.div 
                animate={{ opacity: isActive ? 1 : 0.2 }}
                className="max-w-xl"
             >
                 <span className="text-[#D4AF37] font-serif text-6xl opacity-20 absolute -top-10 -left-4 select-none">
                    0{index + 1}
                 </span>
                 <h3 className="text-3xl md:text-4xl font-serif text-white mb-8 relative z-10">
                    {step.title}
                 </h3>
                 <div className="text-lg leading-relaxed text-gray-400 relative z-10">
                    {step.content}
                 </div>
             </motion.div>
        </div>
    )
}