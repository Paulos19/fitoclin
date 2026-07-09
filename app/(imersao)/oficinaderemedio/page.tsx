"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    ArrowRight,
    Check,
    Shield,
    Sparkles,
    Brain,
    Activity,
    Flame,
    Heart,
    Gift,
    Clock,
    CheckCircle2,
    Video,
    Flower2,
    Instagram,
    Phone,
    AlertTriangle,
    MonitorPlay,
    Award,
    MessageCircle,
    BookOpen
} from "lucide-react";
import "./oficina.css";

/* ─────────── DATA ─────────── */
const mistakes = [
    "A planta certa",
    "A dose adequada",
    "O preparo correto",
    "O melhor horário",
    "A melhor estratégia para cada necessidade"
];

const careTopics = [
    { text: "Ansiedade e insônia", icon: Brain },
    { text: "Emagrecimento", icon: Activity },
    { text: "Dores no corpo", icon: Shield },
    { text: "Gastrite", icon: Flame },
    { text: "Intestino inflamado", icon: Flower2 },
];

const learningTopics = [
    "Como preparar chás terapêuticos corretamente",
    "Blends funcionais de plantas medicinais",
    "Xaropes naturais estratégicos",
    "Tinturas, extratos e vinhos medicinais artesanais",
    "Óleos medicados naturais para dores",
    "Preparações inspiradas nos ensinamentos de Santa Hildegarda",
    "Como evitar erros que fazem as plantas “não funcionarem”",
];

const targetAudience = [
    "Pessoas que desejam cuidar da saúde de forma mais natural",
    "Profissionais da saúde",
    "Farmacêuticos",
    "Terapeutas",
    "Mulheres que desejam aprender remédios caseiros com estratégia",
    "Pessoas apaixonadas por plantas medicinais",
    "Quem busca unir ciência, tradição, fé e cuidado integral"
];

/* ─────────── HOOKS ─────────── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
            { threshold: 0.12 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useScrollReveal();
    return (
        <div ref={ref} className={`of-reveal ${delay ? `of-delay-${delay}` : ""} ${className}`}>
            {children}
        </div>
    );
}

/* ─────────── COMPONENT ─────────── */
export default function OficinaRemediosPage() {
    const [parallaxY, setParallaxY] = useState(0);

    const handleScroll = useCallback(() => {
        setParallaxY(window.scrollY * 0.12);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="oficina-container">

            {/* ═══════ 1. HERO ═══════ */}
            <section className="of-hero of-noise relative min-h-[95vh] flex items-center">
                {/* Orbs */}
                <div className="of-orb" style={{ width: 700, height: 700, top: -300, right: -300, background: "radial-gradient(circle, rgba(61,139,110,0.18) 0%, transparent 70%)" }} />
                <div className="of-orb" style={{ width: 500, height: 500, bottom: -200, left: -200, background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />

                {/* Particles */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="of-particle"
                        style={{
                            left: `${15 + i * 14}%`,
                            bottom: `${10 + (i % 3) * 15}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${10 + i * 2}s`,
                        }}
                    />
                ))}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-36 pb-24 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT — COPY */}
                        <div className="space-y-8 order-2 lg:order-1">
                            {/* Tags */}
                            <div className="flex items-center gap-3 flex-wrap mt-4 lg:mt-0">
                                <span className="of-tag of-tag-gold">
                                    <Video className="w-3.5 h-3.5" />
                                    Aulas Gravadas
                                </span>
                                <span className="of-tag">
                                    <Clock className="w-3.5 h-3.5" />
                                    Acesso por 6 meses
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="of-font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[1.08] tracking-tight">
                                Oficina de{" "}
                                <em className="text-[var(--clr-emerald-light)] not-italic">Remédios Caseiros</em>
                            </h1>

                            {/* Sub */}
                            <p className="text-xl sm:text-2xl text-[var(--clr-gold)] font-medium leading-relaxed max-w-xl of-font-heading">
                                Fitoterapia com Evidência, Estratégia Clínica e o Toque de Santa Hildegarda
                            </p>

                            {/* Context */}
                            <div className="space-y-4 max-w-xl text-[var(--clr-text-muted)] text-lg leading-relaxed">
                                <p>
                                    A oficina ao vivo já aconteceu, mas <strong className="text-[var(--clr-text)]">agora você pode ter acesso à gravação completa</strong> e estudar no seu ritmo, de onde estiver.
                                </p>
                                <p>
                                    Durante 6 meses, você poderá assistir às aulas quantas vezes quiser pela Hotmart e aprender como preparar remédios caseiros com mais segurança, conhecimento e estratégia.
                                </p>
                                <p className="pt-2">
                                    Muitas pessoas usam plantas medicinais, mas não alcançam resultado porque não sabem escolher:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                                {mistakes.map((m, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                        <AlertTriangle className="w-4 h-4 text-[var(--clr-gold)] flex-shrink-0" />
                                        <span>{m}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="space-y-4 pt-4">
                                <button
                                    onClick={() => scrollTo("oferta")}
                                    className="of-cta inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base sm:text-lg cursor-pointer"
                                >
                                    Quero Acessar as Aulas
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT — IMAGE + FLOATING CARDS */}
                        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div
                                className="relative w-full max-w-md lg:max-w-lg"
                                style={{ transform: `translateY(${-parallaxY * 0.15}px)` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--clr-emerald-deep)] to-[var(--clr-gold-dark)] rounded-full blur-3xl opacity-30 cm-glow-pulse" />
                                <img
                                    src="/santa.jpeg"
                                    alt="Santa Hildegarda"
                                    className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                                    style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                                />

                                {/* Floating card 1 */}
                                <div className="of-float absolute -left-4 sm:-left-8 bottom-10 of-glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl z-20">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clr-emerald-deep)] flex items-center justify-center">
                                        <MonitorPlay className="w-5 h-5 text-[var(--clr-emerald-light)]" />
                                    </div>
                                    <div>
                                        <p className="of-font-heading font-bold text-sm text-[var(--clr-text)]">Gravação Completa</p>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider">Estude no seu ritmo</p>
                                    </div>
                                </div>

                                {/* Floating card 2 */}
                                <div className="of-float-slow absolute -right-2 sm:-right-6 top-1/4 of-glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl z-20" style={{ animationDelay: "2s" }}>
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clr-gold)]/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-[var(--clr-gold)]" />
                                    </div>
                                    <div>
                                        <p className="of-font-heading font-bold text-sm text-[var(--clr-text)]">Acesso Estendido</p>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider">Por 6 Meses</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ 2. UMA OFICINA DIFERENTE ═══════ */}
            <div className="of-line-thick" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[var(--clr-surface)] relative overflow-hidden">
                <div className="of-orb" style={{ width: 400, height: 400, top: -100, left: -200, background: "radial-gradient(circle, rgba(61,139,110,0.08) 0%, transparent 70%)" }} />

                <div className="max-w-6xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-16">
                        <span className="of-tag">O que você vai aprender</span>
                        <h2 className="of-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Preparações naturais aplicadas ao cuidado de:
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                        {careTopics.map((topic, idx) => (
                            <Reveal key={idx} delay={idx + 1}>
                                <div className="of-glass rounded-2xl p-6 text-center h-full flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--clr-emerald-deep)] border border-[var(--clr-border)] flex items-center justify-center">
                                        <topic.icon className="w-6 h-6 text-[var(--clr-emerald-light)]" />
                                    </div>
                                    <h4 className="of-font-heading font-bold text-sm text-[var(--clr-text)]">{topic.text}</h4>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 3. O QUE VOCÊ VAI APRENDER ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 of-noise relative">
                <div className="of-orb" style={{ width: 500, height: 500, top: "50%", right: -250, transform: "translateY(-50%)", background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />

                <div className="max-w-5xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-16">
                        <span className="of-tag of-tag-gold">
                            <Flame className="w-3.5 h-3.5" />
                            Conteúdo Prático
                        </span>
                        <h2 className="of-font-display text-3xl sm:text-4xl font-bold">
                            Nesta oficina, você vai aprender:
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {learningTopics.map((topic, idx) => (
                            <Reveal key={idx} delay={(idx % 4) + 1}>
                                <div className="of-topic-item h-full">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--clr-emerald-deep)] to-[var(--clr-emerald)]/30 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[var(--clr-emerald)]/20">
                                        <Check className="w-4 h-4 text-[var(--clr-emerald-light)]" />
                                    </div>
                                    <p className="text-[var(--clr-text-muted)] font-medium leading-relaxed">
                                        {topic}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 4. QUEM É A DRA ISA ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[var(--clr-surface)]">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <Reveal className="order-2 lg:order-1">
                            <div className="of-about-img rounded-3xl overflow-hidden shadow-2xl border border-[var(--clr-border)]">
                                <img
                                    src="/isa.jpeg"
                                    alt="Dra. Isa Bieski"
                                    className="w-full h-auto"
                                    style={{ transform: `translateY(${parallaxY * 0.08}px)`, transition: "transform 0.1s linear" }}
                                />
                            </div>
                        </Reveal>

                        {/* Bio */}
                        <Reveal className="order-1 lg:order-2 space-y-8">
                            <div className="space-y-3">
                                <span className="of-tag">A Professora</span>
                                <h2 className="of-font-display text-3xl sm:text-4xl font-bold">
                                    Com quem você vai aprender?
                                </h2>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--clr-emerald)] to-[var(--clr-gold)] rounded-full" />
                            </div>

                            <div className="space-y-5 text-[var(--clr-text-muted)] leading-relaxed">
                                <p>
                                    A oficina será conduzida por <strong className="text-[var(--clr-text)]">Dra. Isa Bieski (@dra.isafito)</strong>.
                                </p>
                                <p>
                                    Ela é farmacêutica clínica integrativa, <strong className="text-[var(--clr-text)]">doutora em Ciências da Saúde</strong>, pesquisadora e professora.
                                </p>
                                <p>
                                    Possui ampla experiência clínica em fitoterapia baseada em evidências e <strong className="text-[var(--clr-emerald-light)]">cuidado integral</strong>, unindo ciência rigorosa e a tradição no uso das plantas medicinais.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════ 5. PARA QUEM É ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <Reveal className="text-center space-y-5 mb-14">
                        <span className="of-tag of-tag-gold">Para quem é?</span>
                        <h2 className="of-font-display text-3xl sm:text-4xl font-bold">
                            Esta oficina é para quem...
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {targetAudience.map((audience, idx) => (
                            <Reveal key={idx} delay={(idx % 4) + 1}>
                                <div className="flex items-start gap-3 p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)] hover:border-[var(--clr-border-strong)] transition-colors h-full">
                                    <CheckCircle2 className="w-5 h-5 text-[var(--clr-emerald-light)] flex-shrink-0 mt-0.5" />
                                    <span className="text-[var(--clr-text-muted)] text-sm">{audience}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 6. OFERTA ═══════ */}
            <div className="of-line-thick" />
            <section id="oferta" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[var(--clr-surface)]">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/50 to-[var(--clr-bg)]" />
                <div className="of-orb" style={{ width: 500, height: 500, top: -150, right: -150, background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />

                <div className="max-w-3xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-6 mb-12">
                        <span className="of-tag cm-tag-gold mx-auto">
                            <Sparkles className="w-3.5 h-3.5" />
                            Acesso Imediato
                        </span>
                        <h2 className="of-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Garanta seu acesso agora
                        </h2>
                        <p className="text-[var(--clr-text-muted)] text-lg">
                            Aprenda a usar as plantas medicinais com mais consciência, segurança e propósito.
                        </p>
                    </Reveal>

                    <Reveal delay={1}>
                        <div className="of-pricing of-pricing-featured p-1 lg:p-2 bg-gradient-to-b from-[var(--clr-gold)] to-[var(--clr-emerald-deep)] rounded-3xl">
                            <div className="bg-[var(--clr-bg)] rounded-2xl p-8 sm:p-12 h-full flex flex-col items-center text-center">
                                <h3 className="of-font-heading text-2xl font-black text-[var(--clr-text)] mb-6">Oficina de Remédios Caseiros</h3>
                                
                                <div className="text-center space-y-2 mb-8">
                                    <p className="text-sm text-[var(--clr-text-dim)] uppercase tracking-widest font-semibold">Investimento</p>
                                    <p className="text-5xl sm:text-6xl font-black of-font-heading text-[var(--clr-gold)]">
                                        <span className="text-2xl text-[var(--clr-text-muted)] font-normal mr-1">R$</span>
                                        197,00
                                    </p>
                                    <p className="text-sm text-[var(--clr-emerald-light)] font-medium pt-2">
                                        Acesso por 6 meses na Hotmart.
                                    </p>
                                </div>

                                <div className="w-full space-y-4 text-left border-t border-[var(--clr-border)] pt-8 mb-8">
                                    <h4 className="font-bold text-[var(--clr-text)] text-lg mb-4 text-center">Ao adquirir, você recebe:</h4>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Video className="w-5 h-5 text-[var(--clr-gold)] flex-shrink-0" />
                                        <span className="text-[var(--clr-text-muted)]">Acesso à gravação completa por 6 meses</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Award className="w-5 h-5 text-[var(--clr-emerald-light)] flex-shrink-0" />
                                        <span className="text-[var(--clr-text-muted)]">Certificado de participação</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <MessageCircle className="w-5 h-5 text-[var(--clr-gold)] flex-shrink-0" />
                                        <span className="text-[var(--clr-text-muted)]">Grupo exclusivo no WhatsApp por 30 dias para tirar dúvidas com a Dra. Isa</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <BookOpen className="w-5 h-5 text-[var(--clr-emerald-light)] flex-shrink-0" />
                                        <span className="text-[var(--clr-text-muted)]">E-book exclusivo com 50 receitas de remédios caseiros</span>
                                    </div>
                                </div>

                                <a
                                    href="https://pay.hotmart.com/T105703302A?off=61wuns59"
                                    className="of-cta-gold w-full py-5 rounded-xl text-lg font-bold flex justify-center items-center gap-2 hover:scale-105 transition-transform"
                                >
                                    Quero Acessar Agora
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <p className="flex items-center justify-center gap-2 text-xs text-[var(--clr-text-dim)] mt-4">
                                    <Shield className="w-4 h-4 text-[var(--clr-emerald)]" />
                                    Pagamento 100% seguro via Hotmart
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <div className="of-line" />
            <footer className="py-12 px-4 sm:px-6 bg-[var(--clr-bg)] text-[var(--clr-text-dim)] text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="font-bold text-[var(--clr-text)] mb-1">Dra. Isa Bieski &copy; {new Date().getFullYear()}</p>
                        <p>Todos os direitos reservados.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <a href="https://wa.me/5565998200593" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--clr-emerald)] transition-colors">
                            <Phone className="w-4 h-4" />
                            (65) 99820-0593
                        </a>
                        <a href="https://instagram.com/dra.isafito" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--clr-emerald)] transition-colors">
                            <Instagram className="w-4 h-4" />
                            @dra.isafito
                        </a>
                    </div>

                    <div className="max-w-xs text-center md:text-right text-[10px] leading-relaxed">
                        <p>Este site não faz parte do Google ou do Facebook. Este site NÃO é endossado pelo Google ou Facebook em qualquer aspecto.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
