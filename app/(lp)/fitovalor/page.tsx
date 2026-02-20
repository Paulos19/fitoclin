"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, X, Star, ChevronDown, Lock, Crown, BookOpen, Target, Award, Leaf, Sprout, Heart, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// --- URL DO CHECKOUT ---
const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "https://pay.kiwify.com.br/jblYbMp";

// --- COMPONENTES DE UI ---

const PremiumCTA = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Link href={CHECKOUT_URL} target="_blank" className="w-full md:w-auto block group">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full md:w-auto overflow-hidden bg-gradient-to-r from-primary via-[#4a9e64] to-primary text-white px-8 py-5 md:px-10 rounded-md text-base md:text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_-5px_rgba(118,167,113,0.3)] transition-all duration-300 border border-white/10",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-3 text-center">
        {children} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
      </span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out skew-y-12" />
    </motion.button>
  </Link>
);

const SectionHeading = ({ subtitle, title, centered = false }: { subtitle: string, title: React.ReactNode, centered?: boolean }) => (
    <div className={cn("mb-12 md:mb-16", centered && "text-center flex flex-col items-center")}>
        <span className="flex items-center justify-center md:justify-start gap-2 text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-4">
            <span className="w-8 h-[2px] bg-secondary"></span>
            {subtitle}
            {centered && <span className="w-8 h-[2px] bg-secondary"></span>}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            {title}
        </h2>
    </div>
);

// Ajuste principal aqui: 'object-contain' em vez de 'object-cover' e um padding (p-4)
const ImageBlock = ({ src, alt, className, imageClassName = "object-contain p-6" }: { src: string, alt: string, className?: string, imageClassName?: string }) => (
    <div className={cn("relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] group bg-white/5", className)}>
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
            <Image 
                src={src} 
                alt={alt} 
                fill 
                className={cn("group-hover:scale-105 transition-transform duration-1000 drop-shadow-2xl", imageClassName)}
            />
            {/* Overlay sutil para dar profundidade ao card, não cobre a imagem inteira de forma agressiva */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
        </div>
    </div>
);

// --- PÁGINA PRINCIPAL ---

export default function ManualFitoterapiaProPage() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div ref={containerRef} className="bg-background text-foreground font-sans overflow-x-hidden selection:bg-secondary/30">
      
      {/* --- DOBRA 1: HERO --- */}
      <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 pt-24 pb-20 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <div className="absolute top-20 right-10 opacity-10 text-secondary animate-pulse duration-[4s]">
            <Leaf size={120} strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 text-secondary">
            <Sprout size={180} strokeWidth={0.5} />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 lg:gap-8 items-center mt-10 md:mt-0">
          
          <motion.div 
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 mb-6 border border-secondary/30 px-4 py-1.5 rounded-full bg-secondary/5 backdrop-blur-md shadow-lg">
                <Crown className="w-4 h-4 text-secondary" />
                <span className="text-secondary text-xs font-bold tracking-[0.2em] uppercase">Edição Profissional</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-serif text-white leading-[1.05] mb-6 tracking-tight drop-shadow-lg">
              MANUAL DA <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary">
                FITOTERAPIA DE VALOR
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-lg leading-relaxed border-l-2 border-secondary/30 pl-4 md:pl-6 text-left">
              Descubra o que profissionais bem pagos fazem para se tornar referência em fitoterapia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
                <PremiumCTA className="w-full sm:w-auto text-sm md:text-base shadow-[0_0_40px_-10px_rgba(118,167,113,0.5)]">QUERO DESCOBRIR</PremiumCTA>
            </div>
          </motion.div>

          {/* IMAGEM MELHORADA AQUI (Hero) */}
          <motion.div 
            style={{ y: heroImageY }}
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative mt-8 lg:mt-0"
          >
            {/* Glow de fundo expandido e mais integrado */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[450px] h-[450px] md:h-[600px] bg-gradient-to-tr from-secondary/30 to-primary/20 blur-[100px] rounded-full" />
            
            {/* Imagem flutuante com object-contain e padding para não cortar as pontas do manual */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-[280px] md:w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_25px_50px_-12px_rgba(118,167,113,0.4)] rotate-[-3deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-500 group z-10 bg-white/5 backdrop-blur-sm"
            >
                 <Image 
                    src="/5.png" 
                    alt="Manual Fitoterapia Profissional" 
                    fill 
                    className="object-contain p-6 opacity-90 group-hover:opacity-100 transition-all duration-700 drop-shadow-2xl"
                    priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 pointer-events-none mix-blend-overlay" />
                 {/* Borda interna iluminada */}
                 <div className="absolute inset-0 border-[2px] border-white/10 rounded-[2rem] pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.2, 1, 0.2] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary hidden md:block"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* --- DOBRA 2: O LIMITE INVISÍVEL --- */}
      <section className="py-24 md:py-32 bg-card border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8 text-lg text-gray-400">
                <SectionHeading subtitle="O CENÁRIO ATUAL" title="O Limite Invisível" />
                
                <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
                    Se você já é um profissional da saúde, mas sente que sua carreira chegou a um limite invisível, este manual é para você.
                </p>
                
                <div className="bg-background/50 p-6 md:p-8 rounded-2xl border-l-4 border-secondary/50 shadow-inner">
                    <p className="text-gray-300 mb-6">Você tem formação. Tem experiência. Atende pacientes todos os dias.</p>
                    <p className="text-white font-medium mb-6">Ainda assim, existe uma sensação difícil de ignorar:</p>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-center"><X className="w-5 h-5 text-red-500/70 shrink-0"/> a rotina ficou previsível demais</li>
                        <li className="flex gap-4 items-center"><X className="w-5 h-5 text-red-500/70 shrink-0"/> os atendimentos parecem repetitivos</li>
                        <li className="flex gap-4 items-center"><X className="w-5 h-5 text-red-500/70 shrink-0"/> o reconhecimento não acompanha o esforço</li>
                        <li className="flex gap-4 items-center"><X className="w-5 h-5 text-red-500/70 shrink-0"/> a remuneração estagnou</li>
                        <li className="flex gap-4 items-center"><X className="w-5 h-5 text-red-500/70 shrink-0"/> o trabalho já não entrega o mesmo sentido</li>
                    </ul>
                </div>
                
                <p className="text-secondary italic text-xl border-l-2 border-secondary/30 pl-6 py-2">
                    "E, em algum momento, a fitoterapia começa a aparecer no seu radar. Às vezes como curiosidade, às vezes como a pergunta silenciosa: <strong className="text-white font-serif">Será que existe um outro caminho?</strong>"
                </p>
            </div>
            
            <div className="order-1 lg:order-2">
                {/* Agora usando 'object-contain' via prop default do novo ImageBlock */}
                <ImageBlock src="/6.png" alt="A Estagnação" />
            </div>
        </div>
      </section>

      {/* --- DOBRA 3: O PROBLEMA --- */}
      <section className="py-24 md:py-32 bg-background border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-1 lg:order-1">
                <ImageBlock src="/1.png" alt="O Modelo Antigo" />
            </div>

            <div className="order-2 lg:order-2 space-y-8 text-lg text-gray-400">
                <SectionHeading subtitle="A RAIZ DO PROBLEMA" title={<>O Problema Não é a<br/>Sua Profissão</>} />
                
                <p className="text-2xl md:text-3xl font-serif text-white">
                    É ter chegado ao limite do modelo tradicional.
                </p>
                <p>
                    Muitos profissionais excelentes, inclusive médicos e especialistas, chegam a um ponto em que percebem:
                </p>
                
                <ul className="space-y-5 bg-white/5 p-8 md:p-10 rounded-3xl border border-white/5 shadow-lg">
                    <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-secondary shrink-0 mt-1" /> <span className="text-white/90">seguir apenas protocolos já não basta</span></li>
                    <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-secondary shrink-0 mt-1" /> <span className="text-white/90">o paciente quer mais escutar, mais visão, mais cuidado</span></li>
                    <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-secondary shrink-0 mt-1" /> <span className="text-white/90">o mercado valoriza quem entrega algo diferente</span></li>
                    <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-secondary shrink-0 mt-1" /> <span className="text-white/90">continuar fazendo "mais do mesmo" não gera crescimento</span></li>
                </ul>
                
                <div className="p-6 border-l-4 border-secondary bg-gradient-to-r from-secondary/10 to-transparent rounded-r-2xl">
                    <p className="text-xl text-white font-serif">
                        A fitoterapia surge, então, não como moda, mas como <strong className="text-secondary font-bold">oportunidade de expansão profissional</strong>. O problema é que a maioria olha para ela do jeito errado.
                    </p>
                </div>
            </div>

        </div>
      </section>

      {/* --- DOBRA 4: ONDE MUITOS ERRAM --- */}
      <section className="py-24 md:py-32 bg-card border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8 text-lg text-gray-400">
                <SectionHeading subtitle="O ERRO COMUM" title="Onde Muitos Erram ao Olhar Para a Fitoterapia" />
                
                <p className="text-xl md:text-2xl font-light text-white">
                    A maioria comete exatamente o mesmo erro:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-red-950/20 border border-red-900/30 p-8 rounded-3xl">
                        <h4 className="text-white mb-6 text-sm font-bold tracking-widest uppercase flex items-center gap-2"><X size={16} className="text-red-500"/> A Visão Errada:</h4>
                        <ul className="space-y-4 text-sm md:text-base text-gray-300">
                            <li>• Enxerga apenas como técnica</li>
                            <li>• Acha que basta aprender sobre plantas</li>
                            <li>• Trata como complemento superficial</li>
                            <li>• Estuda sem direção estratégica</li>
                        </ul>
                    </div>
                    
                    <div className="bg-background border border-white/5 p-8 rounded-3xl shadow-inner">
                        <h4 className="text-white mb-6 text-sm font-bold tracking-widest uppercase flex items-center gap-2"><ArrowRight size={16} className="text-gray-500"/> O Resultado:</h4>
                        <ul className="space-y-4 text-gray-500 text-sm md:text-base font-medium">
                            <li className="flex items-center gap-3">👉 Frustração</li>
                            <li className="flex items-center gap-3">👉 Insegurança</li>
                            <li className="flex items-center gap-3">👉 Abandono</li>
                            <li className="flex items-center gap-3">👉 Uso raso e sem impacto</li>
                        </ul>
                    </div>
                </div>
                
                <div className="p-8 bg-gradient-to-r from-secondary/20 to-transparent rounded-3xl border-l-4 border-secondary">
                    <p className="text-2xl md:text-3xl text-white font-serif">
                        Porque a fitoterapia <span className="italic font-light">sem visão estratégica</span> não gera crescimento.
                    </p>
                </div>
            </div>
            
            <div className="order-1 lg:order-2">
                <ImageBlock src="/2.png" alt="O Erro Comum" />
            </div>
        </div>
      </section>

      {/* --- DOBRA 5: A VISÃO DOS BEM PAGOS --- */}
      <section className="py-24 md:py-32 bg-background border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-1 lg:order-1">
                <ImageBlock src="/5.png" alt="A Visão dos Bem Pagos" />
            </div>
            
            <div className="order-2 lg:order-2 space-y-8 text-lg text-gray-400">
                <SectionHeading subtitle="O NOVO CAMINHO" title="A Visão dos Bem Pagos" />
                
                <p className="text-xl md:text-2xl font-light text-white">
                    Profissionais reconhecidos não entram na fitoterapia por impulso. Eles entendem que:
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { b: "posicionamento", t: "não apenas conhecimento" },
                        { b: "visão de cuidado", t: "não só recurso" },
                        { b: "diferencial", t: "não curiosidade" },
                        { b: "missão", t: "e propósito" }
                    ].map((item, i) => (
                         <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                            <span className="text-secondary font-bold text-lg md:text-xl leading-tight flex items-center gap-2 mb-2"><Check size={18}/> {item.b}</span>
                            <span className="text-gray-400 text-sm md:text-base">{item.t}</span>
                         </div>
                    ))}
                </div>
                
                <div className="bg-gradient-to-br from-primary/20 to-background border border-primary/30 p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden mt-8">
                    <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none"><Crown size={180} /></div>
                    <p className="text-white font-serif mb-8 text-2xl md:text-3xl relative z-10">Eles usam a fitoterapia como:</p>
                    
                    <div className="space-y-5 text-white/80 text-base md:text-lg relative z-10">
                        <p className="flex items-center gap-4"><span className="w-2.5 h-2.5 bg-secondary rounded-full shrink-0" /> Eixo de expansão profissional</p>
                        <p className="flex items-center gap-4"><span className="w-2.5 h-2.5 bg-secondary rounded-full shrink-0" /> Forma de se destacar no mercado</p>
                        <p className="flex items-center gap-4"><span className="w-2.5 h-2.5 bg-secondary rounded-full shrink-0" /> Caminho para autoridade e indicação</p>
                        <p className="flex items-center gap-4"><span className="w-2.5 h-2.5 bg-secondary rounded-full shrink-0" /> Estratégia para crescimento sustentável</p>
                        
                        <p className="flex items-start gap-4 mt-6 border-t border-white/10 pt-6 text-white font-medium text-lg md:text-xl">
                            <span className="w-2.5 h-2.5 bg-secondary rounded-full shrink-0 mt-2.5" /> 
                            Um caminho para edificar espiritualmente a vida de outras pessoas.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- DOBRA 6: O QUE VOCÊ VAI DESCOBRIR --- */}
      <section className="py-24 md:py-32 bg-card relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
         <div className="absolute -left-20 top-40 opacity-5 rotate-45 pointer-events-none">
            <Leaf size={300} />
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <SectionHeading 
                subtitle="CONTEÚDO ESTRATÉGICO"
                title={<>O Que Você Vai Descobrir<br className="hidden md:block"/><span className="italic text-gray-500 font-light">Neste Manual.</span></>}
            />

            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl border-l-2 border-secondary/50 pl-6 bg-background/50 p-6 rounded-r-2xl border-y border-r border-white/5">
              Este não é um manual técnico. É um manual de visão. Ao ler, você vai compreender:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { t: "Crescimento Rápido", d: "Por que alguns crescem rápido na fitoterapia e outros desistem.", Icon: Target },
                    { t: "Bastidores do Cuidado", d: "O que vem antes da prescrição clínica.", Icon: BookOpen },
                    { t: "Estratégia Real", d: "Como transformar curiosidade em diferencial estratégico.", Icon: Star },
                    { t: "Posicionamento", d: "Como ampliar sua autoridade na sua região.", Icon: Crown },
                    { t: "Nova Fase", d: "Como construir uma nova fase profissional com direção.", Icon: Award },
                    { t: "Segurança na Prática", d: "A base de visão que sustenta a liberdade de prescrição.", Icon: ShieldCheck },
                ].map((item, i) => (
                    <div key={i} className="group p-8 bg-background border border-white/5 hover:border-secondary/30 transition-all duration-500 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(118,167,113,0.2)]">
                        <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-background transition-colors duration-300">
                            <item.Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-3 group-hover:text-secondary transition-colors">{item.t}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{item.d}</p>
                    </div>
                ))}
            </div>

            <div className="mt-16 relative bg-gradient-to-br from-primary to-[#184223] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between">
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 md:opacity-40 mix-blend-overlay pointer-events-none">
                     {/* Textura botânica de background continua com object-cover pois é só textura */}
                     <Image src="/4.png" alt="Textura Botânica" fill className="object-cover object-center" />
                     <div className="absolute inset-0 bg-gradient-to-r from-[#184223] via-transparent to-transparent hidden md:block" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#184223] via-transparent to-transparent md:hidden" />
                </div>

                <div className="p-10 md:p-16 relative z-10 md:w-2/3 text-center md:text-left">
                     <h3 className="text-3xl md:text-4xl font-serif text-white font-bold mb-4 drop-shadow-md">Você vai enxergar a fitoterapia além da planta.</h3>
                     <p className="text-white/90 text-lg md:text-xl font-light">E talvez enxergar a sua própria carreira com novos olhos.</p>
                </div>
            </div>
         </div>
      </section>

      {/* --- DOBRA 7: PARA QUEM É / NÃO É --- */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading 
                subtitle="ALINHAMENTO DE EXPECTATIVAS"
                title="PARA QUEM ESTE MANUAL É (E PARA QUEM NÃO É)"
                centered
            />

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-secondary/20 relative overflow-hidden group shadow-[0_0_30px_-10px_rgba(118,167,113,0.15)]">
                    <div className="absolute -top-10 -right-10 p-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 pointer-events-none">
                        <Check size={200} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-10 flex items-center gap-4">
                        <span className="bg-secondary/20 p-3 rounded-xl shadow-inner"><Check className="w-6 h-6 text-secondary" /></span>
                        Este manual é para você se:
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Já atua na área da saúde",
                            "Sente que sua carreira parou de crescer",
                            "Busca uma nova forma de cuidar e se posicionar",
                            "Percebe na fitoterapia uma oportunidade real",
                            "Entende que crescimento exige estratégia"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 text-gray-300 items-center bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 shadow-[0_0_10px_rgba(118,167,113,0.8)]"/>
                                <span className="text-base md:text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CARD "NÃO É PARA VOCÊ" */}
                <div className="bg-card/40 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-red-900/20 relative overflow-hidden group shadow-[0_0_30px_-10px_rgba(239,68,68,0.08)] hover:border-red-900/40 hover:bg-card/60 transition-colors">
                    <div className="absolute -top-10 -right-10 p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity rotate-12 pointer-events-none">
                        <X size={200} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-gray-300 mb-10 flex items-center gap-4">
                        <span className="bg-red-900/10 p-3 rounded-xl shadow-inner border border-red-900/20"><X className="w-6 h-6 text-red-400" /></span>
                        Este manual NÃO é para você se:
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Busca receitas prontas",
                            "Quer apenas 'experimentar algo novo'",
                            "Não está disposto a repensar sua atuação",
                            "Procura atalhos fáceis"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4 text-gray-400 items-center p-4 border border-transparent rounded-2xl hover:bg-red-950/10 hover:border-red-900/20 transition-colors">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-900/60 shrink-0"/>
                                <span className="text-base md:text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex justify-center">
                <PremiumCTA className="px-12 py-6 text-lg">ESSE MANUAL É PARA MIM</PremiumCTA>
            </div>
        </div>
      </section>

      {/* --- DOBRA 8: PROPÓSITO --- */}
      <section className="py-24 md:py-32 bg-card relative border-t border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-left space-y-8 order-2 lg:order-1">
                    <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-4">
                        <Heart className="w-8 h-8 text-secondary" />
                    </div>
                    <h2 className="text-xs font-bold tracking-[0.3em] text-secondary uppercase mb-4">O Propósito por trás deste manual</h2>
                    
                    <div className="space-y-6 text-2xl md:text-4xl font-serif text-white/90 leading-relaxed font-light border-l-2 border-secondary/30 pl-6 md:pl-8">
                        <p>Cuidar da vida exige mais do que técnica.</p>
                        <p>Exige visão.<br/>
                           Exige responsabilidade.<br/>
                           Exige consciência.</p>
                        <p className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white py-2 drop-shadow-sm">
                           Exige FÉ.
                        </p>
                    </div>

                    <div className="pt-8 space-y-6 text-gray-400 text-lg">
                        <p>A fitoterapia, quando levada a sério, não é moda.<br/> <strong className="text-white font-normal bg-white/5 px-3 py-1.5 rounded-lg mt-2 inline-block">É um caminho de maturidade profissional.</strong></p>
                        <div className="bg-background/80 p-8 rounded-2xl border border-white/5 shadow-inner">
                            <p className="italic text-gray-300 text-xl leading-relaxed">"O meu propósito é claro, eu quero difundir a metodologia Fitoclin e quero que você possa estar comigo!"</p>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <ImageBlock src="/5.png" alt="Cuidado Integrativo" />
                </div>
            </div>
        </div>
      </section>

      {/* --- DOBRA 9: O PRÓXIMO PASSO (Preço) --- */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto bg-card border border-white/10 p-8 md:p-20 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

                <SectionHeading subtitle="A DECISÃO" title="O PRÓXIMO PASSO!" centered />

                <div className="text-gray-300 text-lg md:text-xl mb-12 space-y-6 max-w-2xl mx-auto">
                    <p>Este manual não decide por você. Ele apenas coloca as cartas na mesa.</p>
                    <p>Depois da leitura, você vai saber se a fitoterapia é apenas curiosidade ou se ela pode, de fato, <strong className="text-white font-normal underline decoration-secondary decoration-2 underline-offset-8">ser o próximo nível da sua carreira.</strong></p>
                    <p className="text-secondary font-serif text-2xl md:text-3xl pt-8">Porque quando existe direção, a oportunidade deixa de ser dúvida e passa a ser caminho.</p>
                </div>

                <div className="py-12 bg-background/80 rounded-[2.5rem] border border-secondary/20 mb-12 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
                    <p className="text-white/60 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-6">LIBERE O SEU MANUAL AGORA MESMO</p>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-gray-500 line-through text-xl mb-2">De R$ 97,00 por apenas</span>
                        <span className="text-7xl md:text-8xl font-serif text-white font-bold drop-shadow-[0_5px_15px_rgba(118,167,113,0.3)] tracking-tighter">
                            <span className="text-4xl align-top mr-3 opacity-50">R$</span>47
                        </span>
                    </div>
                </div>

                <PremiumCTA className="w-full md:w-3/4 mx-auto py-6 md:py-8 text-xl md:text-2xl shadow-[0_10px_40px_-10px_rgba(118,167,113,0.6)] rounded-2xl">
                    QUERO LIBERAR MEU ACESSO
                </PremiumCTA>
                
                <p className="mt-8 text-gray-500 text-xs md:text-sm flex items-center justify-center gap-3 uppercase tracking-widest font-bold">
                    <Lock className="w-4 h-4 text-secondary/70" /> Pagamento 100% Seguro • Acesso Imediato
                </p>
            </motion.div>
        </div>
      </section>

      {/* --- DOBRA 10: QUEM É DRA ISA BIESKI? --- */}
      <section className="relative py-24 md:py-32 bg-card border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
            
            <SectionHeading subtitle="AUTORIA" title="QUEM É DRA ISA BIESKI?" />

            <div className="grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 relative order-2 lg:order-1">
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto bg-gradient-to-b from-primary/20 to-background rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl p-2">
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                            {/* Na foto de perfil sim, mantemos object-cover, pois é retrato humano e não mockup */}
                            <Image 
                                src="/isa.png" 
                                alt="Dra Isa Bieski" 
                                fill 
                                className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-10 pt-40">
                                <h3 className="text-4xl text-white font-serif mb-2">Dra. Isa Bieski</h3>
                                <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold">Criadora do Método Fitoclin</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-lg text-gray-300 leading-relaxed bg-background/30 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                     <p>
                        Sou Farmacêutica, especialista em Farmácia Clínica, com mestrado e doutorado em Produtos Naturais, Ciências da Saúde e pós-doutorado em Plantas Medicinais.
                     </p>
                     <p>
                        Atuo como presidente do <strong className="text-white">Instituto ISA</strong> – instituição especializada em promover a formação técnica e científica na área das Plantas Medicinais, com ética, responsabilidade social, cultural e ambiental. Meu objetivo principal é estimular a Difusão da Fitoterapia no Brasil para seu uso seguro e racional.
                     </p>
                     <p>
                        Ao longo da minha trajetória, já mostrei a <strong className="text-secondary">mais de 32 mil pessoas</strong> como as plantas medicinais e fitoterápicos podem transformar a saúde e a qualidade de vida, aliando ciência rigorosa e visão integrativa.
                     </p>
                     
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-white/10 mt-10">
                        {[
                            { val: "15+", label: "Anos de Experiência" },
                            { val: "32k+", label: "Vidas Impactadas" },
                            { val: "7k+", label: "Alunos Formados" },
                        ].map((stat, i) => (
                            <div key={i} className="text-left p-6 bg-card/50 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="text-4xl font-serif text-secondary font-bold mb-2">{stat.val}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-16 bg-black border-t border-white/5">
         <div className="container mx-auto px-6 flex flex-col items-center">
             <Image src="/logo.png" alt="Fitoclin" width={160} height={50} className=" transition-opacity" />
             <p className="text-gray-600 text-xs uppercase tracking-[0.2em] text-center leading-relaxed font-bold mt-6">
                &copy; {new Date().getFullYear()} Instituto ISA & Fitoclin. <br className="md:hidden"/>Todos os direitos reservados.
             </p>
         </div>
      </footer>

    </div>
  );
}