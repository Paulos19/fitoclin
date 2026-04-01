"use client";

import React, { useState } from "react";
import VideoPlayer from "@/components/vsl/VideoPlayer";
import "./vsl.css";

const testimonials = [
    { name: "A.C.", text: "Eu eliminei 3,4 kg em 7 dias, mas o mais impressionante não foi o peso… foi a minha cabeça. Eu me senti no controle de novo. Com o acompanhamento da Dra. Isa e da equipe, eu finalmente entendi o que estava me travando." },
    { name: "M.S.", text: "Perdi 2,4 kg na primeira semana e já senti minha energia voltar. Mas o maior ganho foi a autoestima… Eu voltei a me olhar com carinho. A comunidade faz toda diferença, você não se sente sozinha." },
    { name: "R.F.", text: "Eu já tinha tentado de tudo… em 7 dias eliminei 3 kg e tive um verdadeiro despertar. Não é só sobre comida. É emocional, é espiritual… e a Dra. Isa conduz tudo com muita clareza." },
    { name: "J.L.", text: "Menos 4 kg em poucos dias… mas o mais forte foi perceber que eu consigo continuar. Pela primeira vez, não foi só empolgação. Foi direção. O suporte da equipe muda tudo." },
    { name: "C.P.", text: "Eliminei 5 kg na primeira semana e desinchou muito! Mas o que mais me marcou foi a paz com a comida. Sem culpa, sem sofrimento. Com acompanhamento de verdade." },
    { name: "D.S.", text: "Perdi 3,4 kg em 7 dias e minha disposição mudou completamente. Eu acordava cansada, agora tenho energia. O método é diferente porque olha a mulher por inteiro." },
    { name: "L.T.", text: "Em 7 dias foram 2,4 kg, mas o maior resultado foi interno. Eu parei de me sabotar. A Dra. Isa e a equipe te mostram o caminho com leveza e verdade." },
    { name: "V.M.", text: "4 kg a menos e um novo olhar sobre mim mesma. Eu achei que era só mais um método… mas é uma transformação completa. Metabolismo, mente e fé juntos." },
];

const pillars = [
    { icon: "🌿", title: "Metabolismo organizado", text: "Você vai entender o que realmente trava seu emagrecimento e como destravar de forma natural e inteligente." },
    { icon: "🧠", title: "Controle da compulsão", text: "Aprenda a lidar com a fome emocional sem culpa e sem viver em guerra com a comida." },
    { icon: "🥗", title: "Alimentação com estratégia", text: "Sem radicalismo. Sem sofrimento. Com inteligência metabólica." },
    { icon: "🏃‍♀️", title: "Movimento possível", text: "Sem pressão. Sem excesso. Com constância." },
    { icon: "✝", title: "Alinhamento espiritual", text: "Fortaleça sua fé como base para sustentar sua transformação." },
];

export default function VSLPage() {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <main className="vsl-container overflow-x-hidden">
            {/* Header / Attention Bar */}
            <div className="attention-bar text-white text-center py-4 px-4 font-black text-xs sm:text-lg sticky top-0 z-50 flex items-center justify-center gap-3">
                <span className="animate-bounce">🚨</span>
                <span>🌿 ATENÇÃO: ESSA AULA SAI DO AR HOJE, 31/03</span>
                <span className="animate-bounce">🚨</span>
            </div>

            {/* Hero Section with Video */}
            <section className="bg-white pt-10 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="heading-fancy text-4xl sm:text-5xl lg:text-6xl font-bold text-[#064e3b] mb-12 leading-tight max-w-4xl mx-auto">
                        Descubra como destravar seu metabolismo com <span className="text-[#10b981]">consciência e verdade</span>
                    </h1>

                    <div className="video-section">
                        <VideoPlayer
                            url="https://t3gjojcefp.ufs.sh/f/zz8Pp2oohfEPv59trUiH38uelZM1tgVbWkS42CjomUvaDrIG"
                            onThresholdReached={() => setIsRevealed(true)}
                        />
                        {!isRevealed && (
                            <p className="mt-6 text-slate-500 italic text-sm animate-pulse">
                                Assista para liberar o conteúdo completo...
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Gated Content */}
            <div className={`gated-content ${isRevealed ? "revealed" : "pointer-events-none"}`}>
                {/* Testimonials */}
                <section className="py-20 px-6 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="badge-premium px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
                                Comunidade Elite MEI
                            </span>
                            <h2 className="heading-fancy text-3xl sm:text-4xl font-bold text-[#064e3b]">
                                💬 DEPOIMENTOS DE QUEM JÁ VIVEU
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="glass-card p-8 rounded-3xl flex flex-col h-full">
                                    <div className="testimonial-avatar w-12 h-12 rounded-full mb-6 flex items-center justify-center text-white font-bold text-lg">
                                        {t.name[0]}
                                    </div>
                                    <p className="text-slate-700 italic leading-relaxed flex-grow">
                                        “{t.text}”
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-slate-200">
                                        <span className="font-bold text-[#064e3b]">{t.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Content */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h3 className="text-xl sm:text-2xl font-semibold text-rose-600 mb-6 heading-fancy">
                            ⚠️ Se você quer emagrecer de verdade… você precisa entender isso antes.
                        </h3>
                        <h2 className="text-4xl sm:text-5xl font-black text-[#064e3b] mb-10 leading-tight">
                            OBESIDADE NÃO É SÓ PESO.
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 text-left sm:text-center max-w-2xl mx-auto">
                            <p>👉 É uma desconexão metabólica</p>
                            <p>👉 Com origem física, emocional e espiritual</p>
                            <p className="font-medium text-[#064e3b]">E enquanto você tentar resolver só o peso… vai continuar vivendo ciclos de:</p>
                            <div className="flex flex-wrap justify-center gap-4 text-rose-500 font-bold">
                                <span>❌ começa</span>
                                <span>❌ desanima</span>
                                <span>❌ recomeça</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto bg-[#064e3b] rounded-[3rem] p-8 sm:p-16 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-8">💚 A COMUNIDADE ELITE MEI É A SUA VIRADA</h2>
                            <p className="text-lg text-emerald-100/80 mb-16 max-w-2xl mx-auto">
                                Aqui você não vai receber só dieta. Você vai aprender a reorganizar seu corpo, sua mente e sua rotina.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                {pillars.map((p, idx) => (
                                    <div key={idx} className="bg-white/10 hover:bg-white/20 transition-colors p-8 rounded-2xl border border-white/10">
                                        <div className="text-3xl mb-4">{p.icon}</div>
                                        <h4 className="font-bold text-xl mb-3 text-emerald-300">{p.title}</h4>
                                        <p className="text-emerald-50 text-sm leading-relaxed">{p.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Background Decorative element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700/20 blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </section>

                {/* Offer Details */}
                <section className="py-20 px-6 bg-emerald-50">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="mb-20">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#064e3b] mb-4 uppercase">🔥 DIFERENTE DE TUDO QUE VOCÊ JÁ TENTOU</h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 text-lg font-medium text-emerald-800">
                                <span>👉 Aqui não é sobre motivação momentânea</span>
                                <span>👉 É sobre constância com direção</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
                                <div className="text-left">
                                    <h3 className="text-2xl font-bold text-[#064e3b] mb-2 flex items-center gap-2">
                                        📅 AULA INAUGURAL AO VIVO
                                    </h3>
                                    <p className="text-4xl font-black text-[#10b981]">14/04 às 19:07</p>
                                </div>
                                <div className="w-px h-20 bg-emerald-100 hidden md:block"></div>
                                <div className="text-left flex-grow">
                                    <h3 className="text-xl font-bold text-[#064e3b] mb-4">💎 O QUE VOCÊ VAI TER:</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-slate-700 font-medium">
                                        <li className="flex items-center gap-2 italic">✔ 6 meses de acompanhamento</li>
                                        <li className="flex items-center gap-2 italic">✔ 6 aulas ao vivo com Dra. Isa</li>
                                        <li className="flex items-center gap-2 italic">✔ Direcionamento personalizado</li>
                                        <li className="flex items-center gap-2 italic">✔ Aplicação dos 5 pilares do MEI</li>
                                        <li className="flex items-center gap-2 italic">✔ Comunidade de suporte</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-emerald-50 rounded-2xl p-10 mb-10 border-2 border-emerald-200">
                                <p className="text-slate-500 font-medium mb-2">Pague apenas o valor especial:</p>
                                <div className="flex flex-col items-center">
                                    <span className="price-old text-2xl font-bold">R$ 2.997,00</span>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-[#064e3b] text-xl font-bold">Por apenas</span>
                                        <span className="text-5xl sm:text-7xl font-black text-[#064e3b]">R$ 497,00</span>
                                    </div>
                                    <p className="mt-4 text-emerald-800 font-bold bg-emerald-200/50 px-4 py-2 rounded-lg">ou em até 12 x no cartão</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <a
                                href="#checkout"
                                className="cta-button block w-full text-center py-6 rounded-2xl text-white text-xl sm:text-2xl font-black uppercase tracking-wide"
                            >
                                👉 QUERO ENTRAR NA COMUNIDADE ELITE MEI AGORA
                            </a>
                            <p className="mt-4 text-slate-500 text-sm flex items-center justify-center gap-2">
                                🔒 Acesso imediato • Compra 100% segura
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Dra Isa */}
                <section className="py-24 px-6 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-emerald-100 rounded-[4rem] overflow-hidden">
                                {/* Mock image placeholder if real one not provided */}
                                <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center">
                                    <span className="text-white text-9xl font-bold opacity-30">ISA</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-600 rounded-full flex flex-col items-center justify-center text-white p-8 text-center shadow-2xl border-8 border-white">
                                <span className="text-3xl font-black">7 DIAS</span>
                                <span className="text-sm font-bold uppercase tracking-widest mt-1">Garantia Total</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="heading-fancy text-4xl sm:text-5xl font-bold text-[#064e3b]">💚 SOBRE A DRA. ISA</h2>
                                <div className="w-20 h-1.5 bg-[#10b981] rounded-full"></div>
                            </div>

                            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                                <p>
                                    <strong>Dra. Isa</strong> é especialista em transformação metabólica feminina e criadora do <strong>Método MEI</strong>.
                                </p>
                                <p>
                                    Sua missão é ajudar mulheres a saírem do ciclo de tentativas frustradas e conquistarem um emagrecimento com consciência, equilíbrio e constância.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 relative">
                                <h3 className="text-2xl font-bold text-[#064e3b] mb-4">🛡️ GARANTIA INCONDICIONAL</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Você pode entrar e testar sem risco. Se em 7 dias você aplicando tudo não emagrecer e não ter nenhum resultado, devolvemos seu dinheiro.
                                    Se não fizer sentido para você, basta solicitar dentro do prazo e você terá seu investimento devolvido.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-6 bg-[#064e3b] text-center text-white">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="space-y-4">
                            <span className="text-emerald-400 font-bold uppercase tracking-widest">🚨 ÚLTIMA CHANCE</span>
                            <h2 className="text-3xl sm:text-5xl font-black leading-tight">Essa aula sai do ar hoje. Talvez seja essa a sua oportunidade.</h2>
                        </div>

                        <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-sm border border-white/20">
                            <p className="text-2xl sm:text-3xl italic font-serif text-emerald-200">
                                “Seu metabolismo responde ao que você repete todos os dias.”
                            </p>
                        </div>

                        <a
                            href="#checkout"
                            className="cta-button block w-full text-center py-8 rounded-2xl text-white text-xl sm:text-3xl font-black uppercase tracking-wide bg-emerald-500"
                        >
                            👉 QUERO ENTRAR NA COMUNIDADE ELITE MEI AGORA
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 bg-[#043d2e] text-emerald-100/60 text-sm border-t border-white/5">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <p className="font-bold text-white mb-2">Comunidade Elite MEI © 2026</p>
                            <p>Todos os direitos reservados.</p>
                        </div>

                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                            <a href="#" className="hover:text-white transition-colors">Contato</a>
                        </div>

                        <div className="max-w-xs text-center md:text-right text-[10px] leading-relaxed">
                            <p>
                                Este site não faz parte do Google ou do Facebook. Além disso, este site NÃO é endossado pelo Google ou Facebook em qualquer aspecto.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
