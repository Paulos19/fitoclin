"use client";

import { motion } from "framer-motion";
import { Leaf, Search, Activity, Heart, Sparkles } from "lucide-react";

const pilares = [
  {
    icon: Search,
    title: "1. Investigação Profunda",
    desc: "Análise detalhada da sua história clínica, exames e estilo de vida para encontrar a raiz do problema.",
  },
  {
    icon: Leaf,
    title: "2. Fitoterapia Personalizada",
    desc: "Prescrição de plantas medicinais e ativos naturais selecionados especificamente para sua bioquímica.",
  },
  {
    icon: Activity,
    title: "3. Modulação Metabólica",
    desc: "Ajustes na alimentação e suplementação para otimizar o funcionamento do seu metabolismo.",
  },
  {
    icon: Heart,
    title: "4. Gestão do Estresse",
    desc: "Estratégias naturais para equilibrar o cortisol, melhorar o sono e a saúde mental.",
  },
  {
    icon: Sparkles,
    title: "5. Evolução Contínua",
    desc: "Acompanhamento constante para ajustar o tratamento conforme sua evolução e resultados.",
  },
];

export function MethodSection() {
  return (
    <section id="metodo" className="py-24 bg-[#0A311D] relative">
      <div className="container mx-auto px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-[#2A5432]/30 border border-[#76A771]/30 text-[#76A771] text-sm font-semibold"
          >
            Metodologia Exclusiva
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            Os 5 Pilares do <span className="text-[#76A771]">Método Fitoclin</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg"
          >
            Um protocolo estruturado para recuperar sua vitalidade de forma natural, segura e científica.
          </motion.p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilares.map((pilar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#062214] border border-[#2A5432] hover:border-[#76A771] p-8 rounded-2xl hover:bg-[#082a18] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#2A5432]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#76A771] transition-colors duration-300">
                <pilar.icon className="w-7 h-7 text-[#76A771] group-hover:text-[#062214] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{pilar.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {pilar.desc}
              </p>
            </motion.div>
          ))}

          {/* Card de Chamada para Ação (o 6º card do grid) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#2A5432] to-[#0A311D] p-8 rounded-2xl flex flex-col justify-center items-center text-center border border-[#76A771]/30"
          >
            <h3 className="text-xl font-bold text-white mb-4">Pronto para começar?</h3>
            <p className="text-gray-200 mb-6 text-sm">
              Agende sua avaliação e descubra como o Método Fitoclin pode transformar sua saúde.
            </p>
            <button className="bg-white text-[#0A311D] hover:bg-[#76A771] hover:text-white px-6 py-3 rounded-full font-bold transition-all w-full">
              Falar com a Dra. Isa
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}