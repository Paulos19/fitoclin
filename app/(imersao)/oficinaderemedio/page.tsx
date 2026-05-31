"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    ArrowRight,
    Check,
    ChevronDown,
    Shield,
    Star,
    Sparkles,
    Brain,
    Salad,
    Activity,
    Leaf,
    Heart,
    Gift,
    Users,
    BookOpen,
    Calendar,
    Clock,
    CheckCircle2,
    Flame,
    Target,
    Zap,
    Crown,
    Award,
    MessageCircle,
    Video,
    HeartHandshake,
    Flower2,
    Timer,
    BadgeCheck,
    Instagram,
    Phone,
    AlertTriangle,
    MapPin,
    MonitorPlay,
    Coffee
} from "lucide-react";
import "./oficina.css";

/* ─────────── DATA ─────────── */
const mistakes = [
    "A planta certa",
    "A dose certa",
    "A forma correta de preparo",
    "O horário ideal",
    "A estratégia clínica adequada"
];

const careTopics = [
    { text: "Ansiedade e Insônia", icon: Brain },
    { text: "Emagrecimento", icon: Activity },
    { text: "Dores no corpo", icon: Shield },
    { text: "Gastrite", icon: Flame },
    { text: "Intestino inflamado", icon: Flower2 },
];

const learningTopics = [
    "Como preparar chás terapêuticos corretamente",
    "Blends funcionais de plantas medicinais",
    "Xaropes naturais estratégicos",
    "Vinhos, Tinturas e Extratos botânicos artesanais",
    "Óleos medicados naturais para dores",
    "Preparações inspiradas na tradição de Santa Hildegarda",
    "Estratégias para potencializar resultados clínicos",
    "Como evitar os erros que fazem as plantas “não funcionarem”",
];

const targetAudience = [
    "Pessoas que desejam cuidar da saúde de forma mais natural",
    "Profissionais da saúde",
    "Farmacêuticos",
    "Terapeutas",
    "Mulheres que desejam aprender remédios caseiros com estratégia",
    "Pessoas apaixonadas por plantas medicinais",
    "Quem busca unir fé, ciência e cuidado integral"
];

const takeaways = [
    "Direção",
    "Estratégia",
    "Consciência",
    "Prática",
    "Nova visão sobre o cuidado natural"
];

const lots = [
    {
        name: "1º LOTE",
        presencial: "297,00",
        online: "97,00",
        linkPresencial: "https://hotm.io/jbk79m",
        linkOnline: "https://pay.hotmart.com/T105703302A?off=kois9ees",
        active: false
    },
    {
        name: "2º LOTE",
        presencial: "397,00",
        online: "127,00",
        linkPresencial: "https://pay.hotmart.com/T105703302A?off=4yyyvrht",
        linkOnline: "https://pay.hotmart.com/T105703302A?off=vx9nda8p",
        active: true
    },
    {
        name: "3º LOTE",
        presencial: "597,00",
        online: "197,00",
        linkPresencial: "https://pay.hotmart.com/T105703302A?off=54y1vdqc",
        linkOnline: "https://pay.hotmart.com/T105703302A?off=61wuns59",
        active: false
    }
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-20 pb-16 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT — COPY */}
                        <div className="space-y-8 order-2 lg:order-1">
                            {/* Tags */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="of-tag of-tag-gold">
                                    <Leaf className="w-3.5 h-3.5" />
                                    Oficina Prática
                                </span>
                                <span className="of-tag">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Inédito
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
                                    Você já percebeu que muitas pessoas usam plantas medicinais… mas não têm resultado?
                                </p>
                                <p className="font-semibold text-[var(--clr-text)]">
                                    Porque não utilizam a “planta certa”.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                                {mistakes.map((m, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                        <AlertTriangle className="w-4 h-4 text-[var(--clr-gold)] flex-shrink-0" />
                                        <span>Existe {m.toLowerCase()}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[var(--clr-emerald-light)] font-medium max-w-xl border-l-2 border-[var(--clr-emerald)] pl-4">
                                E é exatamente isso que você vai aprender nesta experiência única.
                            </p>

                            {/* CTA */}
                            <div className="space-y-4 pt-4">
                                <button
                                    onClick={() => scrollTo("oferta")}
                                    className="of-cta inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base sm:text-lg cursor-pointer"
                                >
                                    Quero Garantir Minha Vaga
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
                                        <MapPin className="w-5 h-5 text-[var(--clr-emerald-light)]" />
                                    </div>
                                    <div>
                                        <p className="of-font-heading font-bold text-sm text-[var(--clr-text)]">Presencial</p>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider">Vagas Limitadas</p>
                                    </div>
                                </div>

                                {/* Floating card 2 */}
                                <div className="of-float-slow absolute -right-2 sm:-right-6 top-1/4 of-glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl z-20" style={{ animationDelay: "2s" }}>
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clr-gold)]/10 flex items-center justify-center">
                                        <MonitorPlay className="w-5 h-5 text-[var(--clr-gold)]" />
                                    </div>
                                    <div>
                                        <p className="of-font-heading font-bold text-sm text-[var(--clr-text)]">Online</p>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider">Qualquer Lugar</p>
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
                        <span className="of-tag">Experiência Única</span>
                        <h2 className="of-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Uma oficina diferente de <em className="text-[var(--clr-emerald-light)] not-italic">tudo</em> o que você já viu
                        </h2>
                        <p className="text-lg text-[var(--clr-text-muted)] max-w-3xl mx-auto leading-relaxed">
                            Inspirada nos ensinamentos de <strong className="text-[var(--clr-gold)] font-medium">Santa Hildegarda de Bingen</strong> e unindo ciência, tradição e prática clínica moderna, esta oficina foi criada para ensinar como utilizar plantas medicinais de forma inteligente, segura e estratégica.
                        </p>
                    </Reveal>

                    <Reveal delay={1} className="max-w-4xl mx-auto text-center mb-10">
                        <h3 className="of-font-heading font-bold text-xl text-[var(--clr-text)] mb-8">
                            Você vai aprender preparações naturais utilizadas no cuidado de:
                        </h3>
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
                            O que você vai aprender na Oficina
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

            {/* ═══════ 4. UM EVENTO COM PROPÓSITO ═══════ */}
            <div className="of-line-gold" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/80 to-[var(--clr-bg)]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="of-mission-card p-8 sm:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <Reveal className="space-y-6">
                                <span className="of-tag of-tag-gold">
                                    <Gift className="w-3.5 h-3.5" />
                                    Evento com Propósito
                                </span>
                                <h2 className="of-font-display text-3xl sm:text-4xl font-bold leading-tight">
                                    Saúde, fé e propósito unidos em uma <em className="text-[var(--clr-gold)] not-italic">única experiência</em>.
                                </h2>

                                <div className="space-y-4 text-lg text-[var(--clr-text-muted)] leading-relaxed">
                                    <p>
                                        Todo o recurso arrecadado nesta oficina será destinado como presente pelos <strong className="text-[var(--clr-text)]">20 anos de missão do Padre Paulo Ricardo</strong>.
                                    </p>
                                    <p className="border-l-2 border-[var(--clr-gold)] pl-4 italic">
                                        Mais do que aprender… você também estará ajudando uma missão de evangelização que transforma vidas.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => scrollTo("oferta")}
                                        className="of-cta-gold inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base cursor-pointer"
                                    >
                                        Quero Participar e Ajudar
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                            </Reveal>

                            <Reveal delay={2} className="flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[var(--clr-border-gold)]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-bg)]/80 via-transparent to-transparent z-10" />
                                    <img
                                        src="/padre.jpeg"
                                        alt="Padre Paulo Ricardo"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ 5. QUEM É A DRA ISA ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
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
                                <span className="of-tag">A Mentora</span>
                                <h2 className="of-font-display text-3xl sm:text-4xl font-bold">
                                    Com quem você vai aprender?
                                </h2>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--clr-emerald)] to-[var(--clr-gold)] rounded-full" />
                            </div>

                            <div className="space-y-5 text-[var(--clr-text-muted)] leading-relaxed">
                                <p>
                                    A oficina será conduzida por <strong className="text-[var(--clr-text)]">Dra. Isa Bieski (@dra.isafito)</strong>, farmacêutica clínica integrativa, pesquisadora e especialista em fitoterapia baseada em evidências.
                                </p>
                                <p>
                                    Com <strong className="text-[var(--clr-text)]">mais de 10 anos de prática clínica</strong> e milhares de pacientes atendidos.
                                </p>
                                <p>
                                    Criadora de um método próprio baseado em <strong className="text-[var(--clr-emerald-light)]">epigenética, neuroplasticidade e fitoneuromodulação</strong>.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════ 6. PARA QUEM É ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[var(--clr-surface)] relative">
                <div className="max-w-4xl mx-auto">
                    <Reveal className="text-center space-y-5 mb-14">
                        <span className="of-tag of-tag-gold">Para quem é?</span>
                        <h2 className="of-font-display text-3xl sm:text-4xl font-bold">
                            Essa oficina é para você que...
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

            {/* ═══════ 7. OFERTA + LOTES ═══════ */}
            <div className="of-line-thick" />
            <section id="oferta" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/50 to-[var(--clr-bg)]" />
                <div className="of-orb" style={{ width: 500, height: 500, top: -150, right: -150, background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />

                <div className="max-w-5xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-6 mb-16">
                        <span className="of-tag cm-tag-gold">
                            <MonitorPlay className="w-3.5 h-3.5" />
                            Presencial & Online
                        </span>
                        <h2 className="of-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Modalidades e Lotes Oficiais
                        </h2>
                        <div className="of-urgency-strip max-w-2xl mx-auto rounded-lg p-3 mt-4 flex items-center justify-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-[var(--clr-red-alert)]" />
                            <p className="text-sm font-semibold text-[var(--clr-red-alert)]">
                                ATENÇÃO: As vagas presenciais serão extremamente limitadas. Os valores aumentam conforme os lotes avançam.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                        {lots.map((lote, idx) => (
                            <Reveal key={idx} delay={idx + 1} className="h-full">
                                <div className={`of-pricing h-full flex flex-col ${lote.active ? "of-pricing-featured transform scale-105 z-10" : "opacity-80"}`}>
                                    {lote.active && <div className="of-pricing-ribbon">Lote Atual</div>}

                                    <div className="p-8 text-center border-b border-[var(--clr-border)] bg-[var(--clr-bg)]">
                                        <h3 className="of-font-heading text-2xl font-black text-[var(--clr-text)] mb-2 mt-4">{lote.name}</h3>
                                        <div className={`of-lote-badge ${lote.active ? "of-lote-active" : "of-lote-future"}`}>
                                            {lote.active ? "Disponível Agora" : "Em Breve"}
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6 flex-grow flex flex-col justify-center">
                                        <div className="text-center space-y-2">
                                            <p className="text-sm text-[var(--clr-text-dim)] uppercase tracking-widest font-semibold">Presencial</p>
                                            <p className="text-4xl font-black of-font-heading text-[var(--clr-gold)]">
                                                <span className="text-lg text-[var(--clr-text-muted)] font-normal mr-1">R$</span>
                                                {lote.presencial}
                                            </p>
                                            <a
                                                href={lote.active ? lote.linkPresencial : undefined}
                                                className={`mt-4 w-full py-3 rounded-lg flex justify-center items-center font-bold transition-all ${lote.active ? 'bg-[var(--clr-gold)] text-[var(--clr-bg)] hover:brightness-110' : 'bg-[var(--clr-surface)] text-[var(--clr-text-dim)] cursor-not-allowed pointer-events-none'}`}
                                            >
                                                Garantir Presencial
                                            </a>
                                        </div>

                                        <div className="h-px w-full bg-[var(--clr-border)] relative my-4">
                                            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--clr-surface)] px-2 text-xs text-[var(--clr-text-dim)]">OU</div>
                                        </div>

                                        <div className="text-center space-y-2">
                                            <p className="text-sm text-[var(--clr-text-dim)] uppercase tracking-widest font-semibold">Online</p>
                                            <p className="text-4xl font-black of-font-heading text-[var(--clr-emerald-light)]">
                                                <span className="text-lg text-[var(--clr-text-muted)] font-normal mr-1">R$</span>
                                                {lote.online}
                                            </p>
                                            <a
                                                href={lote.active ? lote.linkOnline : undefined}
                                                className={`mt-4 w-full py-3 rounded-lg flex justify-center items-center font-bold transition-all ${lote.active ? 'bg-[var(--clr-emerald)] text-white hover:brightness-110' : 'bg-[var(--clr-surface)] text-[var(--clr-text-dim)] cursor-not-allowed pointer-events-none'}`}
                                            >
                                                Garantir Online
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="max-w-2xl mx-auto">
                        <div className="of-glass rounded-2xl p-8 space-y-6 text-center">
                            <h3 className="of-font-heading text-xl font-bold text-[var(--clr-text)]">O que está incluso?</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                <div className="flex items-center gap-3 text-sm">
                                    <Award className="w-5 h-5 text-[var(--clr-gold)] flex-shrink-0" />
                                    <span className="text-[var(--clr-text-muted)]">Certificado de Participação</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MessageCircle className="w-5 h-5 text-[var(--clr-emerald-light)] flex-shrink-0" />
                                    <span className="text-[var(--clr-text-muted)]">Grupo no WhatsApp para dúvidas com a Dra. Isa (30 dias)</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Video className="w-5 h-5 text-[var(--clr-emerald-light)] flex-shrink-0" />
                                    <span className="text-[var(--clr-text-muted)]">Sala de aula na HOTMART (Acesso por 6 meses)</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Heart className="w-5 h-5 text-[var(--clr-gold)] flex-shrink-0" />
                                    <span className="text-[var(--clr-text-muted)]">Apoio à missão do Pe. Paulo Ricardo</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={() => scrollTo("oferta")}
                                    className="of-cta block w-full py-5 rounded-xl text-base sm:text-lg cursor-pointer"
                                >
                                    Escolher Meu Lote Acima
                                </button>
                                <p className="text-xs text-[var(--clr-text-dim)] mt-4">
                                    Se você deseja aprender fitoterapia de verdade… com profundidade, propósito e aplicação prática, essa pode ser a oportunidade mais especial do ano.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════ 8. PATROCINADORES ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative bg-[var(--clr-surface)]/30">
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <Reveal className="space-y-6 mb-12">
                        <span className="of-tag mx-auto">Parceiros</span>
                        <h2 className="of-font-display text-3xl sm:text-4xl font-bold">
                            Patrocinadores <em className="text-[var(--clr-gold)] not-italic">&</em> Apoio
                        </h2>
                        <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
                            Empresas e instituições que acreditam na nossa missão de levar saúde natural e evangelização para o mundo.
                        </p>
                    </Reveal>

                    <Reveal delay={1}>
                        <div className="of-sponsors-grid flex flex-wrap justify-center items-center gap-12">
                            {/* Em breve / Espaço reservado */}
                            <div className="p-8 border border-dashed border-[var(--clr-border)] rounded-2xl flex items-center justify-center min-w-[240px] group hover:border-[var(--clr-gold)] transition-colors duration-500">
                                <span className="text-[var(--clr-text-dim)] group-hover:text-[var(--clr-gold)] font-medium italic transition-colors">Em breve...</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════ 9. FINAL ═══════ */}
            <div className="of-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden of-noise">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-emerald-deep)] via-[var(--clr-bg)] to-[var(--clr-surface)]" />
                <div className="of-orb" style={{ width: 600, height: 600, top: -200, right: -200, background: "radial-gradient(circle, rgba(61,139,110,0.12) 0%, transparent 70%)" }} />

                <div className="max-w-3xl mx-auto relative z-10 text-center space-y-10">
                    <Reveal className="space-y-6">
                        <span className="of-tag of-tag-gold mx-auto">
                            <Sparkles className="w-3.5 h-3.5" />
                            Transformação
                        </span>
                        <h2 className="of-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Você não vai sair dessa oficina <em className="text-[var(--clr-emerald-light)] not-italic">apenas</em> com conhecimento.
                        </h2>

                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {takeaways.map((item, idx) => (
                                <span key={idx} className="bg-[var(--clr-surface)] border border-[var(--clr-border-strong)] px-4 py-2 rounded-full text-sm text-[var(--clr-text-muted)]">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="space-y-6 pt-6">
                            <button
                                onClick={() => scrollTo("oferta")}
                                className="of-cta-gold inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg sm:text-xl cursor-pointer shadow-2xl shadow-[var(--clr-gold)]/20"
                            >
                                Garantir Minha Vaga
                                <ArrowRight className="w-6 h-6" />
                            </button>
                            <p className="flex items-center justify-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                <Shield className="w-4 h-4 text-[var(--clr-emerald)]" />
                                Pagamento 100% seguro via Hotmart
                            </p>
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
