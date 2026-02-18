"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Star, ChevronDown, Lock, Crown, BookOpen, Target, Award, Leaf, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

// --- URL DO CHECKOUT ---
const CHECKOUT_URL = "https://pay.kiwify.com.br/jblYbMp";

// --- COMPONENTES DE UI (GREEN THEME) ---

const PremiumCTA = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Link href={CHECKOUT_URL} target="_blank" className="w-full md:w-auto block group">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full md:w-auto overflow-hidden bg-gradient-to-r from-primary via-[#4a9e64] to-primary text-white px-10 py-5 rounded-md text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_-5px_rgba(118,167,113,0.3)] transition-all duration-300 border border-white/10",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      {/* Efeito de brilho ao passar o mouse */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out skew-y-12" />
    </motion.button>
  </Link>
);

const SectionHeading = ({ subtitle, title }: { subtitle: string, title: React.ReactNode }) => (
    <div className="mb-12 md:mb-20">
        <span className="flex items-center gap-2 text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-8 h-[2px] bg-secondary"></span>
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
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div ref={containerRef} className="bg-background text-foreground font-sans overflow-x-hidden">
      
      {/* --- DOBRA 1: HERO (Clean & Green) --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5 pt-20 md:pt-0">
        {/* Background Sutil (Sem Banner de Imagem) */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        {/* Folhas/Elementos decorativos sutis */}
        <div className="absolute top-20 right-10 opacity-10 text-secondary animate-pulse duration-[4s]">
            <Leaf size={120} strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 text-secondary">
            <Sprout size={180} strokeWidth={0.5} />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto Hero */}
          <motion.div 
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 mb-6 border border-secondary/30 px-4 py-1.5 rounded-full bg-secondary/5 backdrop-blur-md">
                <Crown className="w-4 h-4 text-secondary" />
                <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase">Edição Profissional</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6 tracking-tight">
              MANUAL DA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary">
                FITOTERAPIA DE VALOR
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground font-light mb-10 max-w-lg leading-relaxed border-l-2 border-secondary/30 pl-6">
              Descubra o que profissionais bem pagos fazem para se tornar referência técnica e financeira em fitoterapia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <PremiumCTA>QUERO DESCOBRIR</PremiumCTA>
                <div className="flex items-center gap-4 px-6 py-4 text-sm text-gray-400">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-background flex items-center justify-center text-[10px]">{i}</div>
                        ))}
                    </div>
                    <span>+7.000 alunos formados</span>
                </div>
            </div>
          </motion.div>

          {/* Imagem Hero (5.png - Vertical) */}
          <motion.div 
            style={{ y: heroImageY }}
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
          >
            {/* Efeito de brilho atrás da imagem */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-primary/30 blur-[100px] rounded-full" />
            
            <div className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                 <Image 
                    src="/5.png" 
                    alt="Manual Fitoterapia Mobile" 
                    fill 
                    className="object-cover"
                    priority
                 />
                 {/* Reflexo de vidro */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.2, 1, 0.2] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* --- DOBRAS 2 a 5: STICKY NARRATIVE --- */}
      <StickyStorytelling />

      {/* --- DOBRA 6: O QUE VOCÊ VAI DESCOBRIR --- */}
      <section className="py-32 bg-card relative overflow-hidden">
         {/* Elementos visuais de fundo */}
         <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
         <div className="absolute -left-20 top-40 opacity-5 rotate-45">
            <Leaf size={300} />
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <SectionHeading 
                subtitle="Conteúdo Estratégico"
                title={<>Não é um manual técnico. <br/><span className="italic text-gray-500 font-light">É um manual de visão.</span></>}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { t: "Crescimento vs Desistência", d: "Por que alguns crescem rápido na fitoterapia e outros desistem.", Icon: Target },
                    { t: "Antes da Prescrição", d: "O que acontece nos bastidores de um atendimento de alto valor.", Icon: BookOpen },
                    { t: "Curiosidade em Lucro", d: "Como transformar interesse genuíno em diferencial estratégico.", Icon: Star },
                    { t: "Ampliação de Autoridade", d: "Como ser visto como a única opção viável na sua região.", Icon: Crown },
                    { t: "Nova Fase Profissional", d: "Construindo uma carreira com direção, propósito e retorno.", Icon: Award },
                    { t: "Segurança na Prática", d: "A base técnica que sustenta a liberdade de prescrição.", Icon: Lock },
                ].map((item, i) => (
                    <div key={i} className="group p-8 bg-background border border-white/5 hover:border-secondary/50 transition-all duration-300 rounded-xl hover:-translate-y-1 hover:shadow-lg">
                        <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <item.Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-3 group-hover:text-secondary transition-colors">{item.t}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{item.d}</p>
                    </div>
                ))}
            </div>

            {/* Card CTA Destaque */}
            <div className="mt-16 relative p-10 bg-gradient-to-br from-primary to-[#235c34] rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-2xl border border-white/10">
                <div className="mb-6 md:mb-0 md:pr-8 text-center md:text-left">
                     <h3 className="text-2xl font-serif text-white font-bold mb-2">Você vai enxergar além da planta.</h3>
                     <p className="text-white/80">Talvez enxergar sua própria carreira com novos olhos.</p>
                </div>
                <Link href={CHECKOUT_URL} target="_blank">
                    <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                        Quero acessar agora <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>
         </div>
      </section>

      {/* --- DOBRA 7: PARA QUEM É / NÃO É --- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Positive (Verde) */}
                <div className="bg-card p-10 rounded-2xl border border-secondary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Check size={100} />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                        <span className="bg-secondary/20 p-2 rounded-full"><Check className="w-5 h-5 text-secondary" /></span>
                        Para você se:
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Já atua na área da saúde e tem experiência",
                            "Sente que sua carreira parou de crescer",
                            "Busca uma nova forma de cuidar e se posicionar",
                            "Percebe na fitoterapia uma oportunidade real",
                            "Entende que crescimento exige estratégia"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-gray-300 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"/>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Negative (Neutro/Escuro) */}
                <div className="bg-[#0a0a0a] p-10 rounded-2xl border border-white/5 relative overflow-hidden">
                    <h3 className="text-2xl font-serif text-gray-400 mb-8 flex items-center gap-3">
                        <span className="bg-red-900/20 p-2 rounded-full"><X className="w-5 h-5 text-red-500" /></span>
                        NÃO é para você se:
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Busca receitas prontas e milagrosas",
                            "Quer apenas 'experimentar algo novo'",
                            "Não está disposto a repensar sua atuação",
                            "Procura atalhos sem fundamento científico"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-gray-500 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-900/50 mt-2 shrink-0"/>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- DOBRA 8: PROPÓSITO E AUTORIDADE (Dra Isa) --- */}
      <section className="relative py-32 bg-card border-t border-white/5">
        <div className="container mx-auto px-6">
            
            <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-secondary text-sm font-bold tracking-widest uppercase">Sobre a Especialista</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mt-4 mb-6">
                    Transformando a Medicina através da Ciência e Educação
                </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Coluna da Esquerda: Bio Texto */}
                <div className="lg:col-span-7 space-y-8">
                     <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed">
                        <p className="text-white text-xl font-light border-l-4 border-secondary pl-6">
                            "O meu propósito é claro: difundir a metodologia Fitoclin para que você possa estar comigo nessa jornada."
                        </p>
                        
                        <p>
                            Sou Farmacêutica, especialista em Farmácia Clínica, com mestrado e doutorado em Produtos Naturais, Ciências da Saúde e pós-doutorado em Plantas Medicinais.
                        </p>
                        <p>
                            Atuo como presidente do <strong>Instituto ISA</strong> – instituição especializada em promover a formação técnica e científica na área das Plantas Medicinais, com ética, responsabilidade social, cultural e ambiental. Meu objetivo é estimular a Difusão da Fitoterapia no Brasil para seu uso seguro e racional.
                        </p>
                        <p>
                            Nesse tempo, eu já mostrei a <strong>mais de 32 mil pessoas</strong> como as plantas medicinais e fitoterápicos podem transformar a saúde e a qualidade de vida. Agora, eu quero ajudar você a melhorar sua saúde, da sua família e de seus pacientes com a Fitoterapia na forma de alimento, cosmético e medicamento.
                        </p>
                     </div>

                     {/* Grid de Stats */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                        {[
                            { val: "15+", label: "Anos de Experiência" },
                            { val: "50+", label: "Artigos Publicados" },
                            { val: "7k+", label: "Alunos Formados" },
                            { val: "6k+", label: "Pacientes Atendidos" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-4 bg-background rounded-lg border border-white/5">
                                <div className="text-3xl font-serif text-secondary font-bold mb-1">{stat.val}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Coluna da Direita: Imagem e Card (Isa) */}
                <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-primary/20 to-background rounded-2xl overflow-hidden border border-white/10 group">
                        {/* Imagem Placeholder - Caso não tenha a foto recortada, usa a isa.png com object-cover */}
                        <Image 
                            src="/isa.png" 
                            alt="Dra Isa Bieski" 
                            fill 
                            className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                        
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                             <h3 className="text-2xl text-white font-serif">Dra. Isa Bieski</h3>
                             <p className="text-secondary text-sm">Doutora em Medicina pela USP</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* --- DOBRA 9: O PRÓXIMO PASSO (Preço) --- */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Background Sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto bg-card border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl"
            >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                    <BookOpen size={32} />
                </div>

                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Comece Hoje</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
                    A fitoterapia é apenas curiosidade ou será o próximo nível da sua carreira? A decisão é sua.
                </p>

                <div className="py-8 bg-background rounded-xl border border-white/5 mb-10">
                    <p className="text-secondary text-xs tracking-widest uppercase mb-2 font-bold">Oferta Especial</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <span className="text-gray-600 line-through text-xl">R$ 97,00</span>
                        <span className="text-5xl md:text-6xl font-serif text-white">R$ 47,00</span>
                    </div>
                </div>

                <PremiumCTA className="w-full md:w-2/3 mx-auto py-6 text-xl shadow-xl hover:shadow-primary/40">
                    QUERO LIBERAR MEU ACESSO
                </PremiumCTA>
                
                <p className="mt-6 text-gray-500 text-xs flex items-center justify-center gap-2 uppercase tracking-wide">
                    <Lock className="w-3 h-3" /> Pagamento Seguro • Acesso Imediato
                </p>
            </motion.div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-12 bg-black border-t border-white/5">
         <div className="container mx-auto px-6 flex flex-col items-center">
             <Image src="/logo.png" alt="Fitoclin" width={120} height={40} className="brightness-0 invert opacity-30 mb-6" />
             <p className="text-gray-600 text-xs uppercase tracking-widest text-center">
                &copy; {new Date().getFullYear()} Instituto ISA & Fitoclin. <br/>Todos os direitos reservados.
             </p>
         </div>
      </footer>

    </div>
  );
}

// --- COMPONENTE DE NARRATIVA (STICKY - IMAGENS VERTICAIS) ---

const storyContent = [
    {
        id: "limit",
        title: "O Limite Invisível",
        content: (
            <>
                <p className="text-xl font-light text-white mb-6">
                    Se você já é um profissional da saúde, mas sente que sua carreira chegou a um limite, este manual é para você.
                </p>
                <div className="space-y-4 border-l-2 border-secondary pl-6 mb-8">
                    <p>Você tem formação e experiência. Atende todos os dias. Mas a rotina ficou previsível.</p>
                </div>
            </>
        ),
        // Usando a imagem vertical 6.png
        image: "/6.png", 
        imageCaption: "A Estagnação"
    },
    {
        id: "problem",
        title: "O Limite do Modelo",
        content: (
            <>
                <p className="text-xl font-light text-white mb-6">
                    O problema não é sua profissão. É ter chegado ao teto do modelo tradicional.
                </p>
                <ul className="space-y-3 text-gray-400 mb-8">
                    <li className="flex gap-3"><ArrowRight className="w-5 h-5 text-secondary" /> O paciente quer mais visão e cuidado</li>
                    <li className="flex gap-3"><ArrowRight className="w-5 h-5 text-secondary" /> O mercado valoriza o diferente</li>
                </ul>
            </>
        ),
        // Reutilizando 5.png para variar
        image: "/5.png",
        imageCaption: "A Barreira"
    },
    {
        id: "solution",
        title: "A Visão dos Bem Pagos",
        content: (
            <>
                <p className="text-xl font-light text-white mb-6">
                    Profissionais reconhecidos não entram por impulso. Eles entendem que fitoterapia é <strong className="text-secondary">POSICIONAMENTO</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4">
                      {[
                        "Eixo de expansão profissional",
                        "Caminho para autoridade",
                        "Edificação espiritual de vidas"
                      ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-md border border-white/5">
                             <Check className="w-4 h-4 text-secondary" />
                             <span className="text-gray-300 text-sm">{item}</span>
                          </div>
                      ))}
                </div>
            </>
        ),
        image: "/6.png",
        imageCaption: "A Estratégia"
    }
];

function StickyStorytelling() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="relative bg-card border-b border-white/5">
            <div className="flex flex-col md:flex-row container mx-auto max-w-7xl">
                
                {/* LADO ESQUERDO: TEXTO SCROLLÁVEL */}
                <div className="w-full md:w-1/2 relative z-10 order-2 md:order-1">
                    <div className="py-20 md:py-40 px-6 md:px-12">
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

                {/* LADO DIREITO: IMAGEM FIXA (STICKY) - Ajustada para Vertical */}
                <div className="hidden md:flex w-1/2 h-screen sticky top-0 order-1 md:order-2 items-center justify-center p-12">
                    <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="relative h-full w-auto aspect-[9/16]"
                            >
                                {/* Moldura da Imagem Vertical (Estilo Celular) */}
                                <div className="absolute inset-0 border-2 border-white/10 rounded-3xl bg-background shadow-2xl overflow-hidden">
                                    <Image 
                                        src={storyContent[activeStep].image} 
                                        alt="Narrative Visual" 
                                        fill 
                                        className="object-cover"
                                    />
                                    {/* Overlay gradiente para legibilidade se necessário */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50" />
                                </div>
                                
                                {/* Label Flutuante */}
                                <div className="absolute -left-12 top-10 bg-secondary text-background font-bold px-4 py-2 rounded-lg shadow-lg rotate-[-5deg]">
                                     {storyContent[activeStep].imageCaption}
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
        <div ref={ref} className="min-h-[80vh] flex items-center transition-opacity duration-500">
             <div className={cn("transition-all duration-500 border-l-2 pl-8", isActive ? "border-secondary opacity-100 translate-x-0" : "border-white/5 opacity-30 -translate-x-4")}>
                 <span className="text-secondary font-serif text-5xl opacity-20 block mb-4 select-none">
                    0{index + 1}
                 </span>
                 <h3 className="text-3xl font-serif text-white mb-6">
                    {step.title}
                 </h3>
                 <div className="text-lg leading-relaxed text-gray-400">
                    {step.content}
                 </div>
             </div>
        </div>
    )
}