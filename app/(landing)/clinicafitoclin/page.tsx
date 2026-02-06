"use client";

import Image from "next/image";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { 
  CheckCircle2, 
  Leaf, 
  Heart, 
  Brain, 
  MessageCircle, 
  Star,
  Activity,
  Flame,
  Salad,
  HandHeart,
  ArrowRight,
  MoveRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";

export default function LandingPage() {
  const whatsappNumber = "5565998200593"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá,+gostaria+de+agendar+uma+consulta+com+a+Dra.+Isa.`;

  // Tipagem correta para Framer Motion
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#FDFBF7] selection:bg-[#062214] selection:text-[#76A771] overflow-x-hidden">
      
      {/* --- NAVBAR FLUTUANTE (Transparente na Hero) --- */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-start pointer-events-none">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto flex items-center gap-3 bg-white/10 backdrop-blur-md pr-6 pl-2 py-2 rounded-full border border-white/20 shadow-sm"
        >
          <div className="relative w-10 h-10 bg-[#062214] rounded-full flex items-center justify-center text-white">
             <Leaf className="w-5 h-5" />
          </div>
          <span className="font-serif text-xl font-bold text-white tracking-tight">Fitoclin</span>
        </motion.div>

        {/* CTA Navbar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto hidden md:block"
        >
          <Link href={whatsappLink} target="_blank">
            <Button className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#062214] h-12 px-8 font-medium transition-all">
              Falar no WhatsApp <MoveRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </nav>

      {/* --- HERO SECTION FULL SCREEN --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image Full */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/banner-lp.jpeg" 
            alt="Banner Fitoclin" 
            fill 
            className="object-cover"
            priority
          />
          {/* Overlay Gradiente para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062214]/90 via-[#062214]/60 to-[#062214]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062214] via-transparent to-[#062214]/30" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Texto Hero (Esquerda) */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:w-1/2 text-white"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76A771]/20 border border-[#76A771]/50 text-[#76A771] text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#76A771] animate-pulse"></span>
                Saúde Integrativa
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
                O equilíbrio <br/>
                que seu corpo <br/>
                <span className="italic font-light text-[#76A771]">pede.</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-gray-300 leading-relaxed mb-10 max-w-lg border-l-2 border-[#76A771] pl-6">
                Na Fitoclin, não silenciamos sintomas. Investigamos a raiz do problema através de um raciocínio clínico que une sua biologia, sua história e a natureza.
              </motion.p>

              <motion.div variants={fadeIn} className="hidden lg:flex gap-4 text-sm font-medium text-gray-400">
                 <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#76A771]" /> Método Exclusivo</span>
                 <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#76A771]" /> Atendimento Humanizado</span>
              </motion.div>
            </motion.div>

            {/* Card de Captura (Direita) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:w-1/2 w-full max-w-md mx-auto"
            >
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#76A771]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-white mb-2">Agende sua avaliação</h3>
                    <p className="text-gray-400 text-sm">Preencha seus dados para iniciarmos seu atendimento personalizado.</p>
                  </div>

                  {/* Componente de Formulário */}
                  <div className="space-y-4">
                    {/* Estilização interna do formulário via CSS global ou prop drilling seria ideal, 
                        mas aqui o componente é isolado. Ele vai renderizar os inputs. */}
                    <div className="[&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input::placeholder]:text-gray-500 [&_button]:bg-[#76A771] [&_button]:text-[#062214] [&_button:hover]:bg-[#5e8a5a]">
                       <LeadCaptureForm />
                    </div>

                    {/* Divisor "OU" */}
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-white/10"></div>
                      <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-widest">Ou prefere WhatsApp?</span>
                      <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    {/* Botão Alternativo WhatsApp */}
                    <Link href={whatsappLink} target="_blank" className="block">
                      <Button variant="outline" className="w-full h-12 bg-transparent border-white/20 text-white hover:bg-white hover:text-[#062214] transition-all group">
                        <MessageCircle className="mr-2 w-5 h-5 text-[#25D366] group-hover:text-[#062214]" /> 
                        Conversar direto no WhatsApp
                      </Button>
                    </Link>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Role para descobrir</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* --- QUEM É A DRA. ISA --- */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
               <div className="relative w-[350px] h-[450px]">
                  <div className="absolute -top-4 -left-4 w-full h-full border border-[#062214] rounded-tr-[80px]" />
                  <div className="relative w-full h-full rounded-tr-[80px] overflow-hidden bg-stone-100">
                    <Image 
                      src="/isa.png" 
                      alt="Dra. Isa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-8 -right-8 bg-[#062214] text-white p-4 rounded-xl shadow-xl">
                     <p className="font-bold text-2xl">20+</p>
                     <p className="text-xs text-gray-400 uppercase tracking-widest">Anos de Estudo</p>
                  </div>
               </div>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
               <h2 className="font-serif text-4xl md:text-5xl text-[#062214]">Dra. Isa</h2>
               <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
                  <p>
                    Com <strong className="text-[#062214]">Mestrado, Doutorado e Pós-Doutorado</strong>, a Dra. Isa une a precisão da ciência à sabedoria da natureza.
                  </p>
                  <p>
                    Criadora do Método Fitoclin, ela já transformou a vida de mais de 6.000 pacientes que buscavam respostas onde a medicina tradicional muitas vezes silenciava.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {[
                    "Biologia e Química", "Fitoterapia Integrativa", 
                    "Visão Espiritual", "Resultados Reais"
                  ].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-[#062214]">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#76A771]" /> {tag}
                    </div>
                  ))}
               </div>

               <div className="pt-4">
                 <Link href={whatsappLink} target="_blank">
                   <Button variant="link" className="text-[#062214] p-0 h-auto font-bold text-lg hover:text-[#76A771] transition-colors">
                     Conhecer currículo completo <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- O MÉTODO --- */}
      <section className="py-32 bg-[#062214] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="font-serif text-4xl md:text-6xl mb-6">Como cuidamos <br/>de você.</h2>
            <p className="text-gray-400 text-xl font-light">
              Esqueça protocolos genéricos. Aqui, seu tratamento é desenhado exclusivamente para a complexidade do seu ser.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {[
              { icon: Brain, title: "Anamnese Epigenética", desc: "Sua história de vida moldando o raciocínio clínico." },
              { icon: Leaf, title: "Prescrição Personalizada", desc: "Plantas medicinais, chás e fitoterápicos escolhidos a dedo." },
              { icon: Heart, title: "Neuroplasticidade", desc: "Técnicas para modular suas respostas neurais e emocionais." },
              { icon: Activity, title: "Avaliação 360º", desc: "Análise profunda da saúde física, emocional e espiritual." },
              { icon: CheckCircle2, title: "Plano Estruturado", desc: "Terapêutica progressiva, acompanhada passo a passo." },
              { icon: Star, title: "Cura Real", desc: "Foco total na causa raiz, não apenas no alívio temporário." },
            ].map((item, i) => (
              <div key={i} className="bg-[#062214] p-10 hover:bg-[#0A2A1A] transition-colors group">
                <item.icon className="w-10 h-10 text-[#76A771] mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-xl mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5 PILARES --- */}
      <section className="py-32 bg-[#FDFBF7]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-[#76A771] font-bold tracking-widest text-xs uppercase mb-2 block">A Base da Cura</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#062214]">Os 5 Pilares Fitoclin</h2>
          </div>

          <div className="space-y-4">
            {[
              { icon: HandHeart, title: "Fé", text: "Fortalecimento espiritual como alicerce." },
              { icon: Salad, title: "Alimentação", text: "Nutrição funcional e terapêutica." },
              { icon: Activity, title: "Movimento", text: "Estímulo metabólico consciente." },
              { icon: Flame, title: "Mente", text: "Reprogramação mental e motivação." },
              { icon: Leaf, title: "Natureza", text: "Plantas medicinais com critério clínico." },
            ].map((pillar, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="group flex items-center justify-between bg-white p-6 md:p-8 rounded-2xl border border-stone-100 hover:border-[#76A771] transition-all cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-[#062214] group-hover:bg-[#062214] group-hover:text-white transition-colors">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-[#062214]">{pillar.title}</h4>
                    <p className="text-gray-500 text-sm hidden md:block">{pillar.text}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#76A771] group-hover:text-[#76A771]">
                   <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARA QUEM É --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16">
           <div className="md:w-1/2">
              <h2 className="font-serif text-4xl lg:text-6xl text-[#062214] mb-8 leading-tight">
                Para quem é <br/>
                este lugar?
              </h2>
              <Link href={whatsappLink} target="_blank">
                <Button className="bg-[#062214] text-white hover:bg-[#76A771] hover:text-[#062214] rounded-full h-14 px-8 text-lg font-medium transition-all">
                  É para mim
                </Button>
              </Link>
           </div>
           
           <div className="md:w-1/2 space-y-8">
              {[
                "Para quem já tentou de tudo e não teve resultados duradouros.",
                "Para quem quer tratar a raiz do problema, não apenas silenciar sintomas.",
                "Para quem busca um cuidado humano, científico e profundo.",
                "Para quem deseja transformar sua saúde de forma natural, segura e definitiva."
              ].map((text, i) => (
                <div key={i} className="flex gap-4">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-[#76A771] shrink-0" />
                   <p className="text-xl text-gray-700 font-light leading-relaxed">{text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-40 bg-[#062214] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image src="/banner-lp.jpeg" alt="bg" fill className="object-cover grayscale" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">
              Seu corpo fala. <br/> Nós sabemos ouvir.
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              Se você quer mais do que alívio temporário, se quer transformação real, agende agora sua conversa inicial.
            </p>
            
            <Link href={whatsappLink} target="_blank">
              <Button size="lg" className="h-16 px-12 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full text-xl font-bold shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:shadow-[0_0_60px_rgba(37,211,102,0.5)] transition-all transform hover:-translate-y-1">
                <MessageCircle className="mr-3 w-6 h-6" /> Agendar no WhatsApp
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-stone-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#062214]">Fitoclin</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* --- FLOATING BUTTON --- */}
      <Link 
        href={whatsappLink} 
        target="_blank" 
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 duration-1000" />
        <div className="relative bg-[#25D366] hover:bg-[#1da851] text-white p-4 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center justify-center">
          <MessageCircle className="w-7 h-7" />
        </div>
      </Link>
    </div>
  );
}