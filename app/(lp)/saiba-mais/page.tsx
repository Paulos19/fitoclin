"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Star, ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

// --- URL DO CHECKOUT ---
const CHECKOUT_URL = "https://pay.kiwify.com.br/jblYbMp";

// --- COMPONENTES DE UI PREMIUM ---

// Botão Dourado com brilho e efeito de hover magnético
const GoldButton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Link href={CHECKOUT_URL} target="_blank" className="w-full md:w-auto">
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 0 30px -5px rgba(197, 160, 89, 0.3)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full md:w-auto overflow-hidden group bg-gradient-to-r from-[#C5A059] to-[#B08D4B] text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg font-bold tracking-wide shadow-xl transition-all duration-300 border border-white/10",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      {/* Efeito de brilho passando */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
    </motion.button>
  </Link>
);

// Badge de Categoria
const CategoryBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A5432]/30 border border-[#2A5432] text-[#76A771] mb-6 backdrop-blur-sm shadow-inner shadow-[#062214]/50">
     <Star className="w-3.5 h-3.5 fill-current" />
     <span className="text-xs font-bold tracking-[0.2em] uppercase">{children}</span>
  </div>
);

// --- PÁGINA PRINCIPAL ---

export default function ManualFitoterapiaPage() {
  const containerRef = useRef(null);
  
  // Parallax do Hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#062214] text-[#F1F1F1] font-sans selection:bg-[#76A771]/30 selection:text-white overflow-x-hidden">
      
      {/* --- DOBRA 1: HERO IMERSIVO --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background com Overlay Gradiente da sua paleta */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src="/banner-lp.jpeg" 
            alt="Background" 
            fill 
            className="object-cover opacity-30 mix-blend-luminosity" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062214]/80 via-transparent to-[#062214]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2A5432]/20 via-[#062214]/60 to-[#062214]" />
        </motion.div>

        {/* Partículas flutuantes (Folhas/Luzes) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
               animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#76A771] rounded-full blur-[120px] opacity-20 mix-blend-screen" 
            />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <CategoryBadge>Metodologia Exclusiva</CategoryBadge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] md:leading-[0.95] mb-8 tracking-tight drop-shadow-2xl">
              Manual da <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#EBCB8B] to-[#C5A059] italic pr-2 pb-2">
                Fitoterapia de Valor
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed border-l-2 border-[#C5A059]/50 pl-6 md:border-none md:pl-0 text-left md:text-center">
              Descubra o que profissionais bem pagos fazem para se tornar referência absoluta.
              <span className="block mt-2 text-[#76A771] font-medium">Visão estratégica. Posicionamento. Resultado.</span>
            </p>
            
            <GoldButton>QUERO DESCOBRIR</GoldButton>
          </motion.div>
        </div>

        {/* Scroll Indicator Minimalista */}
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#76A771]"
        >
          <ChevronDown className="w-8 h-8 stroke-1" />
        </motion.div>
      </section>

      {/* --- SEÇÃO 2: STICKY NARRATIVE (Dark Mode) --- */}
      <StickyNarrativeDark />

      {/* --- DOBRA 3: O QUE VOCÊ VAI DESCOBRIR (Grid) --- */}
      <section className="py-32 bg-[#062214] relative overflow-hidden border-t border-white/5">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/globe.svg')", backgroundSize: '300px' }}></div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-[#C5A059] text-sm font-bold tracking-widest uppercase mb-4 block">Conteúdo Programático</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">O Que Você Vai Descobrir</h2>
                <p className="text-gray-400 text-lg">Este não é apenas um manual técnico. É um guia de visão estratégica para remodelar sua carreira.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { t: "Crescimento vs Desistência", d: "A mentalidade exata que separa quem explode na carreira de quem estagna.", i: "📈" },
                 { t: "Além da Prescrição", d: "O segredo do atendimento que fideliza pacientes para sempre e gera indicações.", i: "🧠" },
                 { t: "Curiosidade em Lucro", d: "Como transformar o interesse em plantas em um modelo de negócio sólido.", i: "💰" },
                 { t: "Autoridade Regional", d: "Técnicas de posicionamento para ser o único nome lembrado na sua cidade.", i: "🏆" },
                 { t: "Nova Fase Profissional", d: "Construa um legado com propósito, não apenas uma agenda cheia.", i: "🚀" },
               ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-[#C5A059]/40 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                  >
                     {/* Hover Glow */}
                     <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#2A5432] rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity" />
                     
                     <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300">{item.i}</div>
                     <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#C5A059] transition-colors">{item.t}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
                  </motion.div>
               ))}

               {/* Card Especial de Imagem */}
               <Link href={CHECKOUT_URL} target="_blank" className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#C5A059] to-[#B08D4B] flex items-center justify-center group cursor-pointer shadow-lg shadow-[#C5A059]/20 transition-transform hover:scale-[1.02]">
                   <Image src="/banner-lp.jpeg" alt="Manual" fill className="object-cover opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                   <div className="relative z-10 text-center p-6">
                       <Lock className="w-10 h-10 text-white mx-auto mb-3" />
                       <span className="font-bold text-white tracking-widest uppercase text-xs border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">Conteúdo Exclusivo</span>
                   </div>
               </Link>
            </div>
         </div>
      </section>

      {/* --- DOBRA 4: PARA QUEM É (Dark Theme Split) --- */}
      <section className="py-24 bg-[#0A311D] relative">
         <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1">
                   <h2 className="text-3xl md:text-5xl font-serif text-white mb-10">
                      Para quem é este manual?
                   </h2>
                   
                   <div className="space-y-6">
                      {[
                        "Profissionais da saúde com carreira estagnada",
                        "Quem busca uma nova forma de cuidar e se posicionar",
                        "Quem vê na fitoterapia uma oportunidade real",
                        "Quem entende que crescimento exige estratégia"
                      ].map((item, i) => (
                         <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#76A771]/30 transition-colors">
                            <div className="mt-1 w-6 h-6 rounded-full bg-[#2A5432] flex items-center justify-center shrink-0 border border-[#76A771]">
                               <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                            <p className="text-gray-200">{item}</p>
                         </div>
                      ))}
                   </div>

                   <div className="mt-10 p-6 rounded-xl bg-red-900/10 border border-red-900/30">
                       <p className="flex items-center gap-2 text-red-400 font-bold mb-2 uppercase text-sm tracking-wide">
                          <X className="w-4 h-4" /> Não é para você se:
                       </p>
                       <p className="text-gray-400 text-sm pl-6">
                          Busca receitas prontas, atalhos milagrosos ou não está disposto a repensar sua atuação profissional com profundidade.
                       </p>
                   </div>
               </div>

               <div className="order-1 lg:order-2 relative h-[500px] w-full flex items-center justify-center">
                   {/* Abstract Composition */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/20 to-transparent rounded-full blur-[80px]" />
                   <motion.div 
                     initial={{ rotate: -5 }}
                     whileInView={{ rotate: 0 }}
                     transition={{ duration: 1 }}
                     className="relative z-10 w-3/4 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 rotate-3"
                   >
                       <Image src="/banner-lp.jpeg" alt="Cover" fill className="object-cover opacity-80" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#062214] to-transparent opacity-80" />
                       <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-[#C5A059] font-serif italic text-xl">"A virada de chave que faltava."</p>
                       </div>
                   </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* --- DOBRA 5: PROPÓSITO E AUTORIDADE (Isa) --- */}
      <section className="relative py-32 overflow-hidden border-t border-white/5 bg-[#062214]">
         {/* Background Elements */}
         <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#C5A059] rounded-full blur-[150px] opacity-10" />

         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-end">
            <div className="relative z-20 mb-10 md:mb-20">
               <Image src="/logo.png" alt="Fitoclin" width={180} height={60} className="mb-8 opacity-90 brightness-0 invert" />
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                  "Cuidar da vida exige mais do que técnica. Exige <span className="italic text-[#C5A059]">Visão e Fé</span>."
               </h2>
               <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed max-w-md border-l border-[#2A5432] pl-6">
                  <p>A fitoterapia não é moda passageira. É um caminho de maturidade profissional.</p>
                  <p>Meu propósito é difundir a metodologia Fitoclin para que você alcance o próximo nível com segurança.</p>
               </div>
               <div className="mt-10 flex items-center gap-4">
                   <div className="w-12 h-1 bg-[#C5A059]" />
                   <div>
                       <p className="font-bold text-white text-lg">Isa</p>
                       <p className="text-xs text-[#76A771] uppercase tracking-wider font-bold">Fundadora Fitoclin</p>
                   </div>
               </div>
            </div>

            <div className="relative h-[500px] md:h-[700px] w-full flex items-end justify-center md:justify-end">
               <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 w-full max-w-lg"
               >
                   <Image 
                     src="/isa.png" 
                     alt="Isa Fitoclin" 
                     width={600} 
                     height={900} 
                     className="object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] mask-image-b-fade"
                   />
               </motion.div>
            </div>
         </div>
      </section>

      {/* --- DOBRA 6: OFERTA FINAL (High Contrast) --- */}
      <section id="offer" className="py-32 relative bg-[#062214]">
         <div className="absolute inset-0 bg-[url('/globe.svg')] bg-repeat opacity-[0.03]"></div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               className="max-w-4xl mx-auto bg-gradient-to-b from-[#0A311D] to-[#062214] border border-[#2A5432]/50 rounded-[3rem] p-8 md:p-16 shadow-[0_0_100px_-20px_rgba(42,84,50,0.3)] relative overflow-hidden"
            >
               {/* Glow effect */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50 shadow-[0_0_20px_#C5A059]" />

               <div className="inline-block px-6 py-2 bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#C5A059] text-xs font-bold tracking-widest uppercase rounded-full mb-8">
                  Oferta por Tempo Limitado
               </div>
               
               <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Manual da Fitoterapia</h2>
               <p className="text-gray-400 text-lg mb-12">O próximo passo definitivo para sua liberdade profissional.</p>

               <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
                  <div className="text-center md:text-right opacity-60">
                     <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Preço Normal</p>
                     <p className="text-2xl font-serif line-through decoration-red-500/50 text-gray-500">R$ 97,00</p>
                  </div>
                  
                  <div className="w-px h-16 bg-white/10 hidden md:block"></div>

                  <div className="text-center md:text-left">
                     <p className="text-xs text-[#76A771] font-bold uppercase tracking-wide mb-1">Preço Especial</p>
                     <div className="flex items-start justify-center md:justify-start gap-1 text-white">
                        <span className="text-2xl mt-2 text-[#C5A059]">R$</span>
                        <span className="text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">47,00</span>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-6">
                  <GoldButton className="w-full md:w-auto px-16 py-6 text-xl shadow-[#C5A059]/20">
                     LIBERAR ACESSO AGORA
                  </GoldButton>
                  
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                     <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Compra Segura</span>
                     <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Acesso Imediato</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTE: STICKY NARRATIVE DARK ---
// Mesma lógica de scroll, mas adaptado para o tema escuro

const narrativeSteps = [
  {
    id: "step1",
    title: "O Limite Invisível",
    highlight: "Rotina Previsível",
    description: "Você tem formação e experiência. Mas a sensação é de estagnação. Os atendimentos são repetitivos, o reconhecimento é baixo e a remuneração travou. Não é culpa sua, é o modelo tradicional que saturou.",
    image: "/1.png", 
    colorAccent: "bg-gray-500"
  },
  {
    id: "step2",
    title: "O Erro Comum",
    highlight: "Técnica vs Estratégia",
    description: "A maioria estuda fitoterapia apenas como técnica ou 'complemento'. Isso é um erro fatal. Sem visão estratégica, você se torna apenas mais um prescritor inseguro, sem impacto real na carreira.",
    image: "/2.png", 
    colorAccent: "bg-red-500"
  },
  {
    id: "step3",
    title: "A Visão Estratégica",
    highlight: "Posicionamento",
    description: "Os profissionais bem pagos entendem: Fitoterapia é Posicionamento. É visão de cuidado integral. É deixar de vender consultas para vender transformação de saúde.",
    image: "/3.png", 
    colorAccent: "bg-[#76A771]"
  },
  {
    id: "step4",
    title: "O Novo Caminho",
    highlight: "Expansão & Propósito",
    description: "A fitoterapia se torna seu eixo de expansão. Destaque no mercado, autoridade regional e, acima de tudo, a capacidade de edificar vidas espiritualmente através do cuidado.",
    image: "/4.png", 
    colorAccent: "bg-[#C5A059]"
  }
];

function StickyNarrativeDark() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative w-full bg-[#062214] border-t border-b border-white/5">
      <div className="flex flex-col md:flex-row">
        
        {/* COLUNA ESQUERDA: TEXTO (Scroll Natural) */}
        <div className="w-full md:w-1/2 relative z-10">
          <div className="md:py-[20vh]">
            {narrativeSteps.map((step, index) => (
              <NarrativeTextItemDark 
                key={step.id} 
                step={step} 
                index={index} 
                setActiveStep={setActiveStep} 
                isActive={activeStep === index}
              />
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: IMAGEM (Sticky) */}
        <div className="hidden md:block w-1/2 h-screen sticky top-0 overflow-hidden bg-[#0A311D] border-l border-white/5 shadow-2xl">
           
           {/* Background Animado */}
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#2A5432]/30 to-transparent rounded-full blur-[100px] animate-pulse" />
              <div className="absolute inset-0 bg-[url('/window.svg')] opacity-5 mix-blend-overlay bg-repeat" />
           </div>

           {/* Imagens Trocando */}
           <div className="relative w-full h-full flex items-center justify-center p-12">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStep}
                 initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                 transition={{ duration: 0.6, ease: "easeOut" }}
                 className="relative w-full max-w-lg aspect-square"
               >
                 {/* Glow atrás da imagem */}
                 <div className="absolute inset-0 bg-[#C5A059] rounded-full blur-[100px] opacity-10" />
                 
                 <Image 
                   src={narrativeSteps[activeStep].image}
                   alt={narrativeSteps[activeStep].title}
                   fill
                   className="object-contain drop-shadow-2xl"
                   priority
                 />
                 
                 {/* Legenda Estilizada */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                   className="absolute bottom-10 left-0 right-0 text-center"
                 >
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                      <span className="text-sm font-bold text-[#F1F1F1] uppercase tracking-widest">
                        Fase 0{activeStep + 1}
                      </span>
                    </div>
                 </motion.div>
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}

function NarrativeTextItemDark({ step, index, setActiveStep, isActive }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveStep(index);
    }
  }, [isInView, index, setActiveStep]);

  return (
    <div 
      ref={ref}
      className="min-h-screen flex items-center justify-center p-8 md:p-20 relative border-l border-white/5 md:border-none"
    >
      {/* Timeline Visual */}
      <div className="hidden md:block absolute left-full top-0 bottom-0 w-px bg-white/5 -ml-[1px] z-20">
        <motion.div 
          animate={{ height: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
          className="w-full bg-[#C5A059] mx-auto shadow-[0_0_10px_#C5A059]"
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0.2,
          scale: isActive ? 1 : 0.95,
          x: isActive ? 0 : -20,
          filter: isActive ? "blur(0px)" : "blur(2px)"
        }}
        transition={{ duration: 0.6 }}
        className="max-w-lg relative"
      >
        {/* Número Gigante de Fundo */}
        <span className="text-[120px] font-serif text-white/5 absolute -z-10 -top-20 -left-10 font-bold select-none leading-none">
          0{index + 1}
        </span>
        
        <h3 className={cn(
          "text-3xl md:text-5xl font-serif mb-6 transition-colors duration-300",
          isActive ? "text-white" : "text-gray-500"
        )}>
          {step.title}
        </h3>
        
        <div className="mb-8">
           <span className={cn(
             "text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded border transition-all duration-300",
             isActive ? "bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]" : "bg-transparent border-white/10 text-gray-500"
           )}>
             {step.highlight}
           </span>
        </div>

        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
          {step.description}
        </p>

        {index === 3 && isActive && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mt-10"
           >
              <Link href={CHECKOUT_URL} target="_blank" className="text-[#76A771] font-bold flex items-center gap-2 hover:gap-4 transition-all group">
                 Começar Jornada <ArrowRight className="w-5 h-5 group-hover:text-white transition-colors"/>
              </Link>
           </motion.div>
        )}
      </motion.div>
    </div>
  );
}