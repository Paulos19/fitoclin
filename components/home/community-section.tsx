"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, HeartHandshake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CommunitySection() {
  const benefits = [
    {
      icon: Users,
      title: "Networking",
      desc: "Conecte-se com outros profissionais da área de saúde integrativa."
    },
    {
      icon: MessageCircle,
      title: "Discussão de Casos",
      desc: "Traga seus casos clínicos para debater e encontrar as melhores condutas."
    },
    {
      icon: HeartHandshake,
      title: "Suporte Contínuo",
      desc: "Nunca mais se sinta sozinho(a) no consultório. Estamos juntos."
    },
    {
      icon: Zap,
      title: "Atualizações",
      desc: "Receba em primeira mão as novidades do mundo da fitoterapia."
    }
  ];

  return (
    <section id="comunidade" className="py-24 bg-[#062214] relative border-y border-[#2A5432]/30">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#76A771] font-semibold tracking-wider uppercase text-sm mb-2 block">
            Você não está sozinho
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Faça parte da nossa <span className="text-[#76A771]">Comunidade Exclusiva</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Um ambiente seguro e colaborativo para você crescer profissionalmente, tirar dúvidas e compartilhar suas vitórias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A311D]/30 border border-[#2A5432] p-6 rounded-2xl hover:bg-[#0A311D]/60 transition-colors text-center group"
            >
              <div className="w-12 h-12 bg-[#2A5432]/50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#76A771] group-hover:text-[#062214] transition-all text-[#76A771]">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#0A311D] to-[#062214] border border-[#2A5432] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#76A771]/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Pronto para dar o próximo passo?</h3>
              <p className="text-gray-400">Junte-se a centenas de alunos que já estão transformando suas carreiras.</p>
            </div>
            
            <Link href="/community">
              <Button className="bg-[#76A771] text-[#062214] hover:bg-[#5e8a5a] font-bold h-12 px-8 rounded-xl shadow-lg shadow-[#76A771]/10">
                Acessar Comunidade
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}