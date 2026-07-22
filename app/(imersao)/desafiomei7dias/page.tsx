"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    Calendar,
    Clock,
    Video,
    ArrowRight,
    Check,
    X,
    ChevronDown,
    Shield,
    Star,
    Sparkles,
    Eye,
    Brain,
    Salad,
    Activity,
    Leaf,
    Quote,
    Gift,
    Coffee,
    Award,
    Users,
    BookOpen,
    Heart,
    CheckCircle2,
    Target
} from "lucide-react";
import "./imersao.css";

/* ───────── DATA ───────── */
const testimonials = [
    {
        name: "Danúbia",
        result: "–6 kg em 15 dias",
        text: "Minha pressão arterial chegou a 20 por 12 e permaneceu elevada por mais de uma semana. Em apenas quinze dias aplicando o Método MEI eliminei seis quilos, minha pressão estabilizou e voltei a ter qualidade de vida. Hoje me sinto muito mais segura, leve e confiante.",
    },
    {
        name: "Marineide Marchezini",
        result: "–5 kg em 7 dias",
        text: "Perdi cinco quilos em apenas uma semana. O mais importante foi perceber que emagrecer pode acontecer com direção e estratégia.",
    },
    {
        name: "Marylília (Lilinha)",
        result: "–3 kg em 7 dias",
        text: "Voltei a caminhar sem dores e me senti muito mais leve.",
    },
    {
        name: "Zenóbia Carvalho",
        result: "–4 kg em 15 dias",
        text: "Depois de tantos anos acima dos 100 kg, finalmente encontrei um método que funcionou.",
    },
    {
        name: "Maria Eni Isolan",
        result: "–3,4 kg em 7 dias",
        text: "Minha disposição voltou e minhas dores diminuíram muito.",
    },
    {
        name: "Maria de Lourdes",
        result: "–2,5 kg",
        text: "Recuperei minha alegria e minha autoestima.",
    },
    {
        name: "Aline",
        result: "–5 kg em 30 dias",
        text: "Mesmo sem conseguir seguir tudo perfeitamente, consegui eliminar cinco quilos.",
    },
    {
        name: "Gislaine",
        result: "–4 kg em 30 dias",
        text: "Hoje me olho no espelho com orgulho.",
    },
    {
        name: "Regina",
        result: "Constância",
        text: "Descobri que emagrecer não é sofrimento. É organização e constância.",
    },
];

const learningItems = [
    "Como despertar seu metabolismo.",
    "Como reduzir inflamação.",
    "Como controlar ansiedade e compulsão alimentar.",
    "Como utilizar plantas medicinais com segurança.",
    "Como organizar uma alimentação inteligente.",
    "Como acelerar seu metabolismo naturalmente.",
    "Como manter a motivação.",
    "Como continuar emagrecendo depois do desafio.",
];

const dailySteps = [
    { day: 1, title: "Despertando o metabolismo." },
    { day: 2, title: "Alimentação Inteligente." },
    { day: 3, title: "Ansiedade, compulsão e fome emocional." },
    { day: 4, title: "Plantas Medicinais para emagrecer." },
    { day: 5, title: "Movimento Inteligente." },
    { day: 6, title: "Organização da rotina." },
    { day: 7, title: "Plano definitivo de continuidade." },
];

const faqItems = [
    { q: "O que é o Desafio MEI 7 Dias?", a: "É um programa intensivo criado pela Dra. Isa Bieski para ajudar mulheres que desejam emagrecer com saúde, equilíbrio e estratégia." },
    { q: "Para quem é o Desafio?", a: "Para mulheres que já tentaram dieta, jejum, e receitas, mas sempre recuperam o peso. Um método para tratar a causa e não apenas a balança." },
    { q: "Onde vai acontecer?", a: "Online, para você participar de qualquer lugar. No dia 08 de agosto, sábado, às 10h (horário de Brasília)." },
    { q: "Vai ter gravação?", a: "Se você optar pelo ingresso PREMIUM, terá acesso ao replay da aula para assistir quantas vezes quiser." },
    { q: "Como faço para me inscrever?", a: "Basta clicar em qualquer botão desta página, escolher seu ingresso e concluir o pagamento." },
    { q: "Quais as formas de pagamento?", a: "Você pode pagar no cartão de crédito, PIX ou boleto. As opções estão na página de checkout." },
];

const essentialFeatures = [
    "Aula ao vivo",
    "Participação no Desafio MEI 7 Dias",
    "Material digital",
    "Acesso durante a transmissão",
];

const premiumFeatures = [
    "Aula ao vivo + Participação no Desafio",
    "Replay da aula para assistir quantas vezes quiser",
    "Sete encontros ao vivo após o desafio",
    "Clube ISA MEI exclusivo no WhatsApp",
    "Acompanhamento da Dra. Isa",
    "Correção de dúvidas",
    "Receitas funcionais",
    "Planner exclusivo e Materiais complementares",
    "Comunidade exclusiva e Certificado",
    "Participação no sorteio: 1 Cafeteira Francesa e 1 Consulta completa com a Dra. Isa",
];

const pillars = [
    { icon: Heart, title: "Fé", description: "Fortaleça sua mente e seu propósito." },
    { icon: Leaf, title: "Plantas Medicinais", description: "Ciência aliada ao poder da natureza." },
    { icon: Salad, title: "Alimentação Inteligente", description: "Comida de verdade." },
    { icon: Activity, title: "Movimento", description: "Sem sofrimento." },
    { icon: Brain, title: "Motivação", description: "Constância para manter resultados." },
];

/* ───────── HOOKS ───────── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useScrollReveal();
    return (
        <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`}>
            {children}
        </div>
    );
}

/* ───────── COMPONENT ───────── */
export default function DesafioMEI7DiasPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [parallaxY, setParallaxY] = useState(0);

    const handleScroll = useCallback(() => {
        setParallaxY(window.scrollY * 0.15);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="imersao-container">

            {/* ═══════════ HERO ═══════════ */}
            <section className="hero-section noise-overlay relative min-h-[90vh] flex items-center">
                <div className="hero-gradient-orb" style={{ width: 600, height: 600, top: -200, right: -200, background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)" }} />
                <div className="hero-gradient-orb" style={{ width: 400, height: 400, bottom: -100, left: -100, background: "radial-gradient(circle, rgba(74,124,92,0.15) 0%, transparent 70%)" }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* LEFT — COPY */}
                        <div className="space-y-8 py-12 lg:py-0 order-2 lg:order-1">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    Desafio MEI 7 Dias
                                </span>
                            </div>

                            <p className="text-xl sm:text-2xl font-semibold text-[var(--clr-gold)] leading-relaxed italic border-l-2 border-[var(--clr-gold-dark)] pl-4">
                                "Você não precisa de mais uma dieta. Você precisa de um método que ensine seu corpo a voltar a emagrecer."
                            </p>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                                Emagreça de forma{" "}
                                <em className="text-[var(--clr-gold)] not-italic">inteligente</em>{" "}
                                sem viver presa a dietas, culpa ou efeito sanfona.
                            </h1>

                            <p className="text-lg sm:text-xl text-[var(--clr-text-muted)] leading-relaxed max-w-lg">
                                Descubra como despertar seu metabolismo, controlar a fome emocional, reduzir a inflamação e iniciar uma transformação real em apenas 7 dias.
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => scrollTo("ingressos")}
                                    className="cta-primary inline-flex items-center gap-3 px-10 py-5 rounded-xl text-base sm:text-lg cursor-pointer"
                                >
                                    QUERO PARTICIPAR DO DESAFIO
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <p className="flex items-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                    <CheckCircle2 className="w-4 h-4 text-[var(--clr-green)]" />
                                    Mais de 1.000 mulheres já transformaram sua saúde com o MEI.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT — IMAGE */}
                        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div
                                className="relative w-full max-w-lg lg:max-w-none"
                                style={{ transform: `translateY(${-parallaxY * 0.3}px)` }}
                            >
                                <img
                                    src="/WhatsApp%20Image%202026-07-20%20at%2018.23.30.jpeg"
                                    alt="Desafio MEI 7 Dias — Dra. Isa Bieski"
                                    className="w-full h-auto max-h-[450px] lg:max-h-[550px] object-cover object-top rounded-2xl shadow-2xl"
                                    style={{ filter: "brightness(1.02)" }}
                                />
                                <div className="absolute -inset-1 rounded-2xl border border-[var(--clr-border)] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ EVENT DETAILS BAR ═══════════ */}
            <div className="gold-line" />
            <section className="bg-[var(--clr-surface)] py-8 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: Calendar, label: "Data", value: "08 de agosto (sábado)" },
                        { icon: Clock, label: "Horário", value: "10h (Brasília)" },
                        { icon: Video, label: "Formato", value: "Aula ao vivo e online" },
                    ].map((item, idx) => (
                        <div key={idx} className="counter-item flex flex-col items-center gap-2">
                            <item.icon className="w-5 h-5 text-[var(--clr-gold)]" />
                            <span className="text-[10px] uppercase tracking-widest text-[var(--clr-text-dim)] font-semibold">{item.label}</span>
                            <span className="text-sm sm:text-base font-bold text-[var(--clr-text)]">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>
            <div className="gold-line" />

            {/* ═══════════ TALVEZ O PROBLEMA NUNCA TENHA SIDO VOCÊ ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 noise-overlay relative">
                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
                    <RevealSection>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Talvez o problema <em className="text-[var(--clr-gold)] not-italic">nunca tenha sido você…</em>
                        </h2>
                    </RevealSection>
                    
                    <RevealSection delay={1} className="text-lg text-[var(--clr-text-muted)] space-y-4 max-w-2xl mx-auto text-left">
                        <p>Você já tentou dieta.</p>
                        <p>Já começou na segunda-feira.</p>
                        <p>Já comprou suplementos.</p>
                        <p>Já fez jejum.</p>
                        <p>Já seguiu receitas da internet.</p>
                        <p>Já emagreceu… e recuperou tudo novamente.</p>
                    </RevealSection>

                    <RevealSection delay={2} className="space-y-6 pt-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--clr-text)]">A culpa não é sua.</h3>
                        <p className="text-xl text-[var(--clr-text-muted)]">
                            Você nunca recebeu um método que tratasse o metabolismo, a inflamação, a ansiedade, os hábitos e a mente ao mesmo tempo.
                        </p>
                        <p className="text-xl text-[var(--clr-gold-light)] font-medium">
                            É exatamente isso que você aprenderá no Desafio MEI 7 Dias.
                        </p>
                        <p className="text-xl font-bold">
                            Chegou o momento de cuidar da causa, e não apenas da balança.
                        </p>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ O QUE É O DESAFIO ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[var(--clr-surface)]">
                <div className="max-w-6xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-5 mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                            A Transformação
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            O que é o Desafio MEI 7 Dias?
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <RevealSection delay={1} className="space-y-6 text-lg text-[var(--clr-text-muted)] leading-relaxed">
                            <p>
                                O <strong className="text-[var(--clr-text)]">Desafio MEI 7 Dias</strong> é um programa intensivo criado pela Dra. Isa Bieski para ajudar mulheres que desejam emagrecer com saúde, equilíbrio e estratégia.
                            </p>
                            <p>
                                Durante sete dias você receberá orientações práticas para reorganizar sua alimentação, reduzir a inflamação, controlar a fome emocional, estimular o metabolismo e construir hábitos sustentáveis.
                            </p>
                            <ul className="space-y-3 font-medium text-[var(--clr-text)] pt-4">
                                <li className="flex items-center gap-3"><X className="text-red-400 w-5 h-5"/> Não é uma dieta.</li>
                                <li className="flex items-center gap-3"><X className="text-red-400 w-5 h-5"/> Não é uma promessa milagrosa.</li>
                                <li className="flex items-center gap-3"><Check className="text-[var(--clr-green)] w-5 h-5"/> É um método construído com mais de 20 anos de prática clínica e aplicado em mais de mil mulheres.</li>
                            </ul>
                        </RevealSection>

                        <RevealSection delay={2}>
                            <div className="card-dark rounded-2xl p-8 space-y-6">
                                <h3 className="font-heading font-bold text-2xl text-[var(--clr-gold)] text-center">
                                    O que você vai aprender
                                </h3>
                                <div className="space-y-4">
                                    {learningItems.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[var(--clr-green)] flex-shrink-0 mt-0.5" />
                                            <span className="text-[var(--clr-text-muted)]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </section>

            {/* ═══════════ COMO SERÃO OS 7 DIAS ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative">
                <div className="max-w-5xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-5 mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-green-light)]">
                            Cronograma
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Como serão os 7 dias
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dailySteps.map((step, idx) => (
                            <RevealSection key={idx} delay={idx % 4 + 1}>
                                <div className="card-dark rounded-2xl p-6 h-full flex flex-col items-start gap-3 border border-[var(--clr-border)] hover:border-[var(--clr-green-deep)] transition-colors">
                                    <div className="px-3 py-1 bg-[var(--clr-green-deep)]/20 text-[var(--clr-green-light)] rounded-md text-xs font-bold uppercase tracking-wider">
                                        Dia {step.day}
                                    </div>
                                    <h4 className="font-heading font-bold text-lg text-[var(--clr-text)]">{step.title}</h4>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ 5 PILARES ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[var(--clr-surface)]">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-green-deep)]/10 to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-5 mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                            O Método MEI
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Os cinco pilares da transformação
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {pillars.map((p, idx) => (
                            <RevealSection key={idx} delay={idx + 1}>
                                <div className="card-dark rounded-2xl p-6 text-center h-full flex flex-col items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--clr-gold)]/20 flex items-center justify-center">
                                        <p.icon className="w-6 h-6 text-[var(--clr-gold)]" />
                                    </div>
                                    <h4 className="font-heading font-bold text-base text-[var(--clr-text)]">{p.title}</h4>
                                    <p className="text-sm text-[var(--clr-text-dim)] leading-relaxed">{p.description}</p>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ DEPOIMENTOS ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 noise-overlay relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-5 mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                            Resultados Reais
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                            Mulheres comuns. <br className="hidden sm:block" /> Resultados extraordinários.
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {testimonials.map((t, idx) => (
                            <RevealSection key={idx} delay={(idx % 4) + 1}>
                                <div className="testimonial-card rounded-xl p-6 h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--clr-gold-dark)] to-[var(--clr-gold)] flex items-center justify-center text-[#0f0f0d] font-bold text-xs">
                                            {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                        </div>
                                        <div className="flex-grow space-y-3">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="font-heading font-bold text-sm text-[var(--clr-text)]">{t.name}</span>
                                                <span className="text-xs font-semibold text-[var(--clr-gold)] bg-[var(--clr-gold)]/10 px-2 py-0.5 rounded-md">{t.result}</span>
                                            </div>
                                            <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed italic">
                                                &ldquo;{t.text}&rdquo;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ INGRESSOS ═══════════ */}
            <div className="gold-line-thick" />
            <section id="ingressos" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[var(--clr-surface)]">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/50 to-[var(--clr-bg)]" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                            Escolha Sua Experiência
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            DESAFIO MEI 7 DIAS
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* ESSENCIAL */}
                        <RevealSection delay={1}>
                            <div className="pricing-card p-8 sm:p-10">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="font-heading text-xl font-bold text-[var(--clr-text)]">ESSENCIAL</h3>
                                        <p className="text-sm text-[var(--clr-text-dim)]">
                                            Para quem deseja participar da aula e realizar o desafio de forma independente.
                                        </p>
                                    </div>

                                    <ul className="space-y-3">
                                        <li className="font-semibold text-[var(--clr-text)] text-sm mb-4">Você recebe:</li>
                                        {essentialFeatures.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                <Check className="w-4 h-4 text-[var(--clr-green)] mt-0.5 flex-shrink-0" />
                                                <span className="text-[var(--clr-text-muted)]">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-[var(--clr-border)] pt-6 space-y-5">
                                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--clr-text-dim)]">Investimento</span>
                                        <p className="text-4xl font-black font-heading text-[var(--clr-text)]">
                                            R$ 47,00
                                        </p>
                                        <a
                                            href="/api/checkout/essencial"
                                            className="cta-primary block w-full text-center py-4 rounded-xl text-sm cursor-pointer"
                                        >
                                            QUERO O ESSENCIAL
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>

                        {/* PREMIUM */}
                        <RevealSection delay={2}>
                            <div className="pricing-card premium p-8 sm:p-10 pt-14 sm:pt-16 glow-gold-strong">
                                <div className="pricing-ribbon">A Experiência Completa</div>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-[var(--clr-gold)]" />
                                            <h3 className="font-heading text-xl font-bold text-[var(--clr-text)]">PREMIUM</h3>
                                        </div>
                                        <p className="text-sm text-[var(--clr-text-dim)]">
                                            A experiência completa para quem deseja resultados com acompanhamento.
                                        </p>
                                    </div>

                                    <ul className="space-y-3">
                                        <li className="font-semibold text-[var(--clr-text)] text-sm mb-4">Você recebe tudo do Essencial e ainda:</li>
                                        {premiumFeatures.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                <Check className="w-4 h-4 text-[var(--clr-gold)] mt-0.5 flex-shrink-0" />
                                                <span className="text-[var(--clr-text-muted)]">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-[var(--clr-gold-dark)]/30 pt-6 space-y-5">
                                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--clr-gold)]">Investimento</span>
                                        <p className="text-4xl font-black font-heading text-[var(--clr-text)]">
                                            R$ 97,00
                                        </p>
                                        <a
                                            href="/api/checkout/premium"
                                            className="cta-primary block w-full text-center py-4 rounded-xl text-sm cursor-pointer"
                                        >
                                            QUERO O PREMIUM
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    </div>

                    {/* ═══════════ BÔNUS ═══════════ */}
                    <RevealSection className="mt-16 flex justify-center px-4">
                        <img
                            src="/WhatsApp%20Image%202026-07-20%20at%2019.36.24.jpeg"
                            alt="Bônus: Sorteio Cafeteira MEI"
                            className="w-full max-w-4xl h-auto rounded-3xl shadow-2xl border border-[var(--clr-gold)]/30"
                        />
                    </RevealSection>
                </div>
            </section>
            <div className="gold-line" />

            {/* ═══════════ QUEM É A DRA ISA ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-bg)] via-transparent to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Bio */}
                        <RevealSection className="order-1 lg:order-1 space-y-8">
                            <div className="space-y-3">
                                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                                    Quem Será Sua Mentora
                                </span>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold">
                                    Dra. Isa Bieski
                                </h2>
                                <div className="w-16 h-0.5 bg-[var(--clr-gold)] rounded-full" />
                            </div>

                            <div className="space-y-5 text-[var(--clr-text-muted)] leading-relaxed">
                                <p className="text-[var(--clr-text)] font-medium">
                                    Farmacêutica Clínica Integrativa • Bióloga • Química<br/>
                                    Doutora em Ciências da Saúde • Pós-doutora em Plantas Medicinais
                                </p>
                                <p>
                                    Depois de enfrentar a própria luta contra a obesidade e emagrecer 34 kg, transformou sua experiência em um método baseado em ciência e prática clínica.
                                </p>
                                <p>
                                    Criou o Método de Emagrecimento Inteligente (MEI), uma abordagem integrativa que une ciência, fitoterapia, alimentação inteligente, movimento, motivação e espiritualidade para promover um emagrecimento sustentável.
                                </p>
                                <p>
                                    Com mais de 20 anos de experiência clínica, já ajudou mais de 1.000 mulheres a emagrecerem, recuperarem a saúde, melhorarem a autoestima e conquistarem uma nova relação com o próprio corpo.
                                </p>
                                <p>
                                    Agora, no Desafio MEI 7 Dias, ela vai mostrar a você o mesmo caminho que transformou a sua vida e a de centenas de mulheres: um método que ensina a entender o corpo, destravar o metabolismo e emagrecer sem viver presa às dietas da moda.
                                </p>
                            </div>
                        </RevealSection>
                        
                        {/* Image */}
                        <RevealSection className="order-2 lg:order-2">
                            <div className="about-image-mask rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/WhatsApp%20Image%202026-07-20%20at%2019.36.52.jpeg"
                                    alt="Dra. Isa Bieski"
                                    className="w-full h-auto"
                                    style={{ transform: `translateY(${parallaxY * 0.1}px)`, transition: "transform 0.1s linear" }}
                                />
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </section>

            {/* ═══════════ GARANTIA ═══════════ */}
            <section className="py-20 sm:py-24 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <RevealSection>
                        <div className="guarantee-seal p-8 sm:p-12 text-center space-y-6">
                            <Shield className="w-12 h-12 text-[var(--clr-green)] mx-auto" />
                            <h3 className="font-display text-2xl sm:text-3xl font-bold">GARANTIA</h3>
                            <p className="text-[var(--clr-text-muted)] leading-relaxed">
                                Sua inscrição é totalmente segura. Você terá sete dias de garantia.
                            </p>
                            <p className="text-[var(--clr-text-muted)] leading-relaxed">
                                Se entender que o desafio não era o que esperava, basta solicitar o reembolso dentro desse período.
                            </p>
                            <p className="text-xl font-bold text-[var(--clr-text)]">
                                Risco zero para você.<br/>Compromisso total com sua satisfação.
                            </p>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ FAQ ═══════════ */}
            <div className="gold-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[var(--clr-surface)]">
                <div className="max-w-3xl mx-auto">
                    <RevealSection className="text-center space-y-4 mb-14">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Ficou com alguma dúvida?
                        </h2>
                    </RevealSection>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <RevealSection key={idx}>
                                <details
                                    className="faq-item"
                                    open={openFaq === idx}
                                    onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === idx ? null : idx); }}
                                >
                                    <summary>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[var(--clr-gold)] transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? "rotate-180" : ""}`}
                                        />
                                        {item.q}
                                    </summary>
                                    {openFaq === idx && <div className="faq-answer">{item.a}</div>}
                                </details>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ FINAL CTA ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden noise-overlay">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-green-deep)] via-[var(--clr-bg)] to-[var(--clr-surface)]" />
                <div className="hero-gradient-orb" style={{ width: 500, height: 500, top: -100, right: -100, background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />

                <div className="max-w-3xl mx-auto relative z-10 text-center space-y-10">
                    <RevealSection className="space-y-6">
                        <span className="text-[var(--clr-gold)] font-semibold uppercase tracking-widest text-xs">ÚLTIMA CHAMADA</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Imagine como será olhar para trás e perceber que tudo começou com uma única decisão.
                        </h2>
                        <div className="text-[var(--clr-text-muted)] text-lg leading-relaxed max-w-2xl mx-auto space-y-4">
                            <p>Você pode continuar adiando.</p>
                            <p>Ou pode escolher que 08 de agosto, às 10h (horário de Brasília), será o primeiro dia da sua nova história.</p>
                            <p className="font-bold text-[var(--clr-text)]">
                                Seu metabolismo pode mudar. <br/>
                                Sua saúde pode melhorar. <br/>
                                Sua autoestima pode voltar.
                            </p>
                            <p className="text-xl text-[var(--clr-gold)]">Mas a decisão precisa ser tomada hoje.</p>
                        </div>
                    </RevealSection>

                    <RevealSection>
                        <button
                            onClick={() => scrollTo("ingressos")}
                            className="cta-primary inline-flex items-center gap-3 px-14 py-6 rounded-xl text-lg sm:text-xl cursor-pointer"
                        >
                            QUERO PARTICIPAR DO DESAFIO
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        <p className="text-sm mt-4 text-[var(--clr-text-dim)]">Vagas limitadas para garantir acompanhamento e organização do desafio.</p>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ FOOTER ═══════════ */}
            <div className="gold-line" />
            <footer className="py-12 px-4 sm:px-6 bg-[var(--clr-bg)] text-[var(--clr-text-dim)] text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="font-bold text-[var(--clr-text)] mb-1">Desafio MEI 7 Dias &copy; 2025</p>
                        <p>Todos os direitos reservados.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--clr-gold)] transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-[var(--clr-gold)] transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-[var(--clr-gold)] transition-colors">Contato</a>
                    </div>

                    <div className="max-w-xs text-center md:text-right text-[10px] leading-relaxed">
                        <p>Este site não faz parte do Google ou do Facebook. Este site NÃO é endossado pelo Google ou Facebook em qualquer aspecto.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
