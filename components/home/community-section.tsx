"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, HeartHandshake, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function CommunitySection() {
  const benefits = [
    {
      icon: Users,
      title: "Networking",
      desc: "Conexões reais com quem fala a sua língua."
    },
    {
      icon: MessageCircle,
      title: "Discussão de Casos",
      desc: "Debates clínicos para afiar seu diagnóstico."
    },
    {
      icon: HeartHandshake,
      title: "Suporte Total",
      desc: "Acolhimento profissional e troca de experiências."
    },
    {
      icon: Zap,
      title: "Atualizações",
      desc: "Fique à frente com as últimas novidades da área."
    }
  ];

  return (
    <section id="comunidade" className="py-24 relative bg-white">
      {/* Background Gradients - Light & Fresh */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fdf4] to-white z-0" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold uppercase tracking-wider mb-4 border border-[#bbf7d0]"
          >
            <Sparkles className="w-3 h-3" /> Comunidade Exclusiva
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] mb-6 tracking-tight"
          >
            Cresça junto com os <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-[#059669]">
              melhores profissionais
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-light"
          >
            Um ambiente seguro, colaborativo e vibrante para você tirar dúvidas, celebrar conquistas e nunca mais se sentir sozinho no consultório.
          </motion.p>
        </div>

        {/* Cards Grid - Clean Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-100 p-8 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-10px_rgba(22,163,74,0.15)] hover:border-[#bbf7d0] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#f0fdf4] rounded-2xl flex items-center justify-center mb-6 text-[#16a34a] group-hover:scale-110 transition-transform duration-300 border border-[#dcfce7]">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-[#111827] text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner with Gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#16a34a]/20"
        >
          {/* Fundo do Banner: Gradiente Verde Vibrante */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14532d] via-[#166534] to-[#15803d]" />
          
          {/* Efeitos de Fundo */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            
            {/* Texto */}
            <div className="flex-1 p-10 md:p-16 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sua cadeira está reservada.
              </h3>
              <p className="text-green-50 mb-8 max-w-md mx-auto md:mx-0 text-lg">
                Não perca a chance de fazer parte do ecossistema que está redefinindo a saúde integrativa no Brasil.
              </p>
              <Link href="/community">
                <Button className="bg-white text-[#14532d] hover:bg-[#f0fdf4] font-bold h-14 px-8 rounded-full shadow-lg transition-all hover:scale-105 text-lg">
                  Entrar na Comunidade
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Imagem Integrada */}
            <div className="flex-1 w-full md:w-auto relative h-72 md:h-96 self-end md:self-auto mt-4 md:mt-0">
               {/* Mascara de gradiente para fundir a imagem com o verde */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#15803d] via-transparent to-transparent z-10 md:bg-gradient-to-l" />
               
               <Image 
                 src="/2.png" 
                 alt="Comunidade Fitoclin"
                 fill
                 className="object-cover object-center md:object-top"
               />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}