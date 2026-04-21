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
} from "lucide-react";
import "./imersao.css";

/* ───────── DATA ───────── */
const testimonials = [
    {
        name: "Zenóbia Carvalho",
        result: "–4 kg em 15 dias",
        text: "Depois de tanto tempo acima dos 100 kg e sem conseguir emagrecer, finalmente vi resultado. Em apenas 15 dias eliminei 4 kg e ainda senti meu corpo desinchar. Voltei a acreditar em mim.",
    },
    {
        name: "Marylilia (Lilinha)",
        result: "–3 kg em 7 dias",
        text: "Eu sofria com dores há anos e mal conseguia me movimentar. Em 7 dias eliminei 3 kg e me senti mais leve, mais disposta e com esperança de viver melhor.",
    },
    {
        name: "Marineid Marchezini",
        result: "–5 kg em 7 dias",
        text: "Perdi 5 kg em apenas 7 dias. O que mais me impressionou foi perceber que existe método, direção e estratégia. Isso é inovador.",
    },
    {
        name: "Maria de Lourdes",
        result: "–2,5 kg",
        text: "Eliminei 2,5 kg e voltei a sorrir. Mais do que peso, recuperei alegria e vontade de viver.",
    },
    {
        name: "Maria Eni Isolan",
        result: "–3,4 kg em 7 dias",
        text: "Em apenas 7 dias perdi 3,4 kg. Meu corpo ficou mais leve, minhas dores melhoraram e minha motivação voltou.",
    },
    {
        name: "Aline",
        result: "–5 kg em 30 dias",
        text: "Em 30 dias eliminei 5 kg, mesmo sem conseguir aplicar tudo perfeitamente. Imagine agora fazendo certo e com acompanhamento.",
    },
    {
        name: "Gislaine",
        result: "–4 kg em 30 dias",
        text: "Perdi 4 kg em 30 dias e o melhor foi voltar a me olhar com alegria. Voltei a sorrir.",
    },
    {
        name: "Regina",
        result: "Constância",
        text: "Eu entendi que emagrecer não é sofrimento. É organização, constância e viver os pilares certos todos os dias.",
    },
];

const faqItems = [
    { q: "O que é a Imersão MEI?", a: "É uma experiência prática para mulheres que querem emagrecer com método, clareza e direção." },
    { q: "Quem pode participar?", a: "Mulheres que desejam emagrecer, melhorar a saúde, controlar a fome emocional e recuperar a autoestima." },
    { q: "Onde vai acontecer?", a: "Online, para você participar de qualquer lugar." },
    { q: "Vai ter gravação?", a: "Depende do ingresso escolhido. Isso será informado no momento da compra." },
    { q: "Como saber se meu ingresso é Premium?", a: "Essa informação aparece na compra e no e-mail de confirmação." },
    { q: "Como faço para me inscrever?", a: "Basta clicar em Garantir Minha Vaga, preencher seus dados e concluir o pagamento." },
    { q: "Qual é o valor do ingresso?", a: "O valor promocional está disponível nesta página." },
    { q: "E se eu não puder participar ao vivo?", a: "Se o seu ingresso incluir replay, você poderá assistir depois dentro do prazo informado." },
    { q: "Essa imersão é para iniciantes?", a: "Sim. Ela foi pensada tanto para iniciantes quanto para quem já tentou várias vezes e precisa de um método mais claro." },
    { q: "Qual é o diferencial da Imersão MEI?", a: "Ela vai além de dieta. Você entende como agir sobre mente, metabolismo, rotina e estratégias naturais para emagrecer com mais constância." },
    { q: "Como posso pagar?", a: "As formas de pagamento disponíveis aparecem no checkout." },
    { q: "E se eu tiver problemas no acesso?", a: "Nossa equipe de suporte estará disponível para ajudar." },
];

const essentialFeatures = [
    "Participação ao vivo na Imersão MEI",
    "Acesso aos materiais enviados no grupo de apoio",
    "Acesso à área exclusiva da imersão",
];

const premiumFeatures = [
    "Participação ao vivo na Imersão MEI",
    "Acesso aos materiais enviados no grupo de apoio",
    "Acesso à área exclusiva da imersão",
    "Gravação da imersão por 30 dias",
    "Material de apoio com direcionamentos práticos",
    "PDF exclusivo: 5 pilares e 3 fases do MEI",
    "Planner + 70 Receitas sem Glúten e sem Lactose",
];

const pillars = [
    { icon: Heart, title: "Fé", description: "A base espiritual que fortalece sua jornada." },
    { icon: Salad, title: "Alimentação Estratégica", description: "Inteligência alimentar para emagrecer com equilíbrio." },
    { icon: Activity, title: "Movimento Organizado", description: "Movimento com estratégia para gerar resultado." },
    { icon: Brain, title: "Reprogramação Neuroemocional e Motivação", description: "Equilibre emoções, fortaleça a motivação e mantenha a constância." },
    { icon: Leaf, title: "Fitoterapia Inteligente", description: "Plantas medicinais usadas com estratégia e ciência." },
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
export default function ImersaoMEIPage() {
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
                {/* Gradient orbs */}
                <div className="hero-gradient-orb" style={{ width: 600, height: 600, top: -200, right: -200, background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)" }} />
                <div className="hero-gradient-orb" style={{ width: 400, height: 400, bottom: -100, left: -100, background: "radial-gradient(circle, rgba(74,124,92,0.15) 0%, transparent 70%)" }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* LEFT — COPY */}
                        <div className="space-y-8 py-12 lg:py-0 order-2 lg:order-1">
                            {/* Tag */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    Ao Vivo no Meet
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[var(--clr-border)] text-[var(--clr-text-muted)]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Segunda, 11/05
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                                Emagreça de forma{" "}
                                <em className="text-[var(--clr-gold)] not-italic">Inteligente</em>{" "}
                                sem virar escrava de Dieta da internet.
                            </h1>

                            {/* Sub */}
                            <p className="text-lg sm:text-xl text-[var(--clr-text-muted)] leading-relaxed max-w-lg">
                                O passo a passo para destravar seu metabolismo, controlar a mente e emagrecer com método — sem depender de remédio, modinha ou sofrimento.
                            </p>

                            {/* CTA */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => scrollTo("ingressos")}
                                    className="cta-primary inline-flex items-center gap-3 px-10 py-5 rounded-xl text-base sm:text-lg cursor-pointer"
                                >
                                    Garanta sua vaga agora
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <p className="flex items-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                    <CheckCircle2 className="w-4 h-4 text-[var(--clr-green)]" />
                                    Método validado em mais de 1 mil pessoas no consultório
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
                                    src="/bannerimersao.jpeg"
                                    alt="Imersão MEI — Método de Emagrecimento Inteligente com a Dra. Isa"
                                    className="w-full h-auto max-h-[450px] lg:max-h-[550px] object-cover object-top rounded-2xl shadow-2xl"
                                    style={{ filter: "brightness(1.02)" }}
                                />
                                {/* Decorative border glow */}
                                <div className="absolute -inset-1 rounded-2xl border border-[var(--clr-border)] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ EVENT DETAILS BAR ═══════════ */}
            <div className="gold-line" />
            <section className="bg-[var(--clr-surface)] py-8 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { icon: Calendar, label: "Data", value: "Sábado, 11/05" },
                        { icon: Clock, label: "Horário", value: "20:07" },
                        { icon: Video, label: "Formato", value: "Ao Vivo no Meet" },
                        { icon: Eye, label: "Atenção", value: "Sem Gravação*" },
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

            {/* ═══════════ O QUE VOCÊ VAI VIVER ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 noise-overlay relative">
                <div className="max-w-5xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-5 mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                            Experiência Transformadora
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            A Imersão MEI será uma experiência{" "}
                            <em className="text-[var(--clr-gold)] not-italic">intensa e prática</em>
                        </h2>
                        <p className="text-lg text-[var(--clr-text-muted)] max-w-2xl mx-auto">
                            Você vai destravar o seu Emagrecimento com direção. Ao final, você terá:
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            "Uma visão muito mais clara sobre os erros que estão impedindo seu corpo de responder ao emagrecimento",
                            "Um caminho estruturado para aplicar os 5 pilares do MEI de forma simples, estratégica e possível na sua rotina",
                            "Um direcionamento objetivo e prático para reorganizar alimentação, mente, metabolismo e hábitos com constância, leveza e resultado",
                        ].map((text, idx) => (
                            <RevealSection key={idx} delay={idx + 1}>
                                <div className="card-dark rounded-2xl p-8 h-full">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--clr-gold)]/10 border border-[var(--clr-border)] flex items-center justify-center text-[var(--clr-gold)] font-bold text-lg mb-6 font-heading">
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>
                                    <p className="text-[var(--clr-text-muted)] leading-relaxed">{text}</p>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ 5 PILARES ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-green-deep)]/10 to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-5 mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-green-light)]">
                            Os 5 Pilares
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            O Método que vai além da dieta
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {pillars.map((p, idx) => (
                            <RevealSection key={idx} delay={idx + 1}>
                                <div className="card-dark rounded-2xl p-6 text-center h-full flex flex-col items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--clr-green-deep)] flex items-center justify-center">
                                        <p.icon className="w-6 h-6 text-[var(--clr-green-light)]" />
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
                            Veja o que mulheres reais viveram{" "}
                            <br className="hidden sm:block" />
                            após aplicar o Método MEI
                        </h2>
                        <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
                            Mulheres comuns, mesmo após várias tentativas frustradas, começaram a recuperar autoestima, controle e resultados reais.
                        </p>
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
                                            <span className="text-[10px] uppercase tracking-widest text-[var(--clr-text-dim)]">
                                                Participante MEI
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>

                    <RevealSection className="text-center pt-12">
                        <button
                            onClick={() => scrollTo("ingressos")}
                            className="cta-primary inline-flex items-center gap-3 px-12 py-5 rounded-xl text-base sm:text-lg cursor-pointer"
                        >
                            Quero Participar da Imersão
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ FAQ ═══════════ */}
            <div className="gold-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <RevealSection className="text-center space-y-4 mb-14">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Ficou com alguma dúvida?
                        </h2>
                        <p className="text-[var(--clr-text-muted)]">Tire suas dúvidas sobre a Imersão MEI</p>
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

            {/* ═══════════ BÔNUS — CAFETEIRA ═══════════ */}
            <section className="bonus-section py-20 sm:py-28 px-4 sm:px-6 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <RevealSection>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-[var(--clr-border-strong)] glow-gold">
                            {/* Image */}
                            <div className="relative h-72 lg:h-auto">
                                <img
                                    src="/WhatsApp%20Image%202026-04-19%20at%2013.43.24.jpeg"
                                    alt="Dra. Isa segurando a Cafeteira MEI — Bônus exclusivo"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--clr-bg)] lg:block hidden" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-bg)] to-transparent lg:hidden" />
                            </div>

                            {/* Content */}
                            <div className="bg-[var(--clr-surface)] p-8 sm:p-12 flex flex-col justify-center space-y-6">
                                <div className="flex items-center gap-3">
                                    <Gift className="w-6 h-6 text-[var(--clr-gold)]" />
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--clr-gold)]">Bônus Exclusivo</span>
                                </div>
                                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                                    Concorra a uma exclusiva{" "}
                                    <span className="text-[var(--clr-gold)]">Cafeteira MEI</span>
                                </h3>
                                <p className="text-[var(--clr-text-muted)] leading-relaxed">
                                    Ao se inscrever <strong className="text-[var(--clr-text)]">HOJE</strong>, você estará automaticamente participando do sorteio. Uma peça especial para acompanhar suas manhãs de transformação.
                                </p>
                                <button
                                    onClick={() => scrollTo("ingressos")}
                                    className="cta-outline inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm self-start cursor-pointer"
                                >
                                    Garantir minha vaga + Concorrer
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ INGRESSOS ═══════════ */}
            <div className="gold-line-thick" />
            <section id="ingressos" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/50 to-[var(--clr-bg)]" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <RevealSection className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                            Garanta seu Ingresso
                        </span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Entre para a imersão que está despertando mulheres a emagrecer com{" "}
                            <em className="text-[var(--clr-gold)] not-italic">direção, constância e inteligência.</em>
                        </h2>
                        <p className="text-[var(--clr-text-muted)]">
                            A oportunidade de reorganizar seu corpo, sua mente e seu metabolismo com método e clareza começa agora.
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* ESSENCIAL */}
                        <RevealSection delay={1}>
                            <div className="pricing-card p-8 sm:p-10">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="font-heading text-xl font-bold text-[var(--clr-text)]">Ingresso Essencial</h3>
                                        <p className="text-sm text-[var(--clr-text-dim)]">
                                            Ideal para quem vai participar ao vivo e colocar em prática imediatamente
                                        </p>
                                    </div>

                                    <ul className="space-y-3">
                                        {essentialFeatures.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                <Check className="w-4 h-4 text-[var(--clr-green)] mt-0.5 flex-shrink-0" />
                                                <span className="text-[var(--clr-text-muted)]">{f}</span>
                                            </li>
                                        ))}
                                        <li className="flex items-start gap-3 text-sm">
                                            <X className="w-4 h-4 text-[var(--clr-text-dim)] mt-0.5 flex-shrink-0" />
                                            <span className="text-[var(--clr-text-dim)] line-through">Não inclui replay</span>
                                        </li>
                                    </ul>

                                    <div className="border-t border-[var(--clr-border)] pt-6 space-y-5">
                                        <span className="text-[10px] uppercase tracking-widest font-semibold text-red-400">Por tempo limitado</span>
                                        <p className="text-4xl font-black font-heading text-[var(--clr-text)]">
                                            R$ 47,00
                                        </p>
                                        <a
                                            href="/api/checkout/essencial"
                                            className="cta-primary block w-full text-center py-4 rounded-xl text-sm cursor-pointer"
                                        >
                                            Garantir meu acesso Essencial
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>

                        {/* PREMIUM */}
                        <RevealSection delay={2}>
                            <div className="pricing-card premium p-8 sm:p-10 pt-14 sm:pt-16 glow-gold-strong">
                                <div className="pricing-ribbon">Mais Escolhido</div>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-[var(--clr-gold)]" />
                                            <h3 className="font-heading text-xl font-bold text-[var(--clr-text)]">Ingresso Premium</h3>
                                        </div>
                                        <p className="text-sm text-[var(--clr-text-dim)]">
                                            Ideal para quem quer rever com calma, aplicar melhor e não perder nenhum detalhe
                                        </p>
                                    </div>

                                    <ul className="space-y-3">
                                        {premiumFeatures.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                <Check className="w-4 h-4 text-[var(--clr-gold)] mt-0.5 flex-shrink-0" />
                                                <span className="text-[var(--clr-text-muted)]">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-[var(--clr-gold-dark)]/30 pt-6 space-y-5">
                                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--clr-gold)]">Por tempo limitado</span>
                                        <p className="text-4xl font-black font-heading text-[var(--clr-text)]">
                                            R$ 97,00
                                        </p>
                                        <a
                                            href="/api/checkout/premium"
                                            className="cta-primary block w-full text-center py-4 rounded-xl text-sm cursor-pointer"
                                        >
                                            Garantir meu acesso Premium
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </section>
            <div className="gold-line" />

            {/* ═══════════ GARANTIA ═══════════ */}
            <section className="py-20 sm:py-24 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <RevealSection>
                        <div className="guarantee-seal p-8 sm:p-12 text-center space-y-6">
                            <Shield className="w-12 h-12 text-[var(--clr-green)] mx-auto" />
                            <h3 className="font-display text-2xl sm:text-3xl font-bold">Garantia de 7 dias</h3>
                            <p className="text-[var(--clr-text-muted)] leading-relaxed">
                                Se por qualquer motivo você se arrepender da inscrição, é só pedir reembolso dentro desse prazo e{" "}
                                <strong className="text-[var(--clr-text)]">devolvemos 100% do valor.</strong>
                            </p>
                            <p className="text-xs text-[var(--clr-text-dim)] italic">
                                Aviso: Após a data do evento, o acesso é considerado consumido e não é reembolsável.
                            </p>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ QUEM É A DRA ISA ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-bg)] via-transparent to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <RevealSection className="order-2 lg:order-1">
                            <div className="about-image-mask rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/WhatsApp%20Image%202026-04-01%20at%2010.25.25.jpeg"
                                    alt="Dra. Isa Bieski — Farmacêutica Clínica Integrativa"
                                    className="w-full h-auto"
                                    style={{ transform: `translateY(${parallaxY * 0.1}px)`, transition: "transform 0.1s linear" }}
                                />
                            </div>
                        </RevealSection>

                        {/* Bio */}
                        <RevealSection className="order-1 lg:order-2 space-y-8">
                            <div className="space-y-3">
                                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[var(--clr-border-strong)] text-[var(--clr-gold)]">
                                    Conheça a Mentora
                                </span>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold">
                                    Quem é a Dra. Isa Bieski?
                                </h2>
                                <div className="w-16 h-0.5 bg-[var(--clr-gold)] rounded-full" />
                            </div>

                            <div className="space-y-5 text-[var(--clr-text-muted)] leading-relaxed">
                                <p>
                                    <strong className="text-[var(--clr-text)]">Farmacêutica Clínica Integrativa, pesquisadora e especialista em Fitoterapia</strong> com uma trajetória construída unindo ciência, prática clínica e cuidado humano. Há mais de 20 anos dedica sua vida ao estudo da saúde natural e da transformação real de mulheres.
                                </p>
                                <p>
                                    Desenvolveu um olhar pioneiro ao integrar conhecimento científico com a realidade emocional, metabólica e comportamental de quem sofre com excesso de peso, compulsão alimentar, inflamação e baixa autoestima.
                                </p>
                                <p>
                                    Sua experiência permitiu criar o <strong className="text-[var(--clr-text)]">Método de Emagrecimento Inteligente (MEI)</strong>, uma abordagem que une estratégia alimentar, plantas medicinais, comportamento, espiritualidade, movimento e reprogramação mental.
                                </p>
                                <p>
                                    Já impactou <strong className="text-[var(--clr-text)]">milhares de mulheres</strong> por meio de atendimentos, mentorias e programas de transformação, ajudando-as a saírem do ciclo de começar, parar e recomeçar.
                                </p>
                                <p className="font-medium text-[var(--clr-gold-light)] italic border-l-2 border-[var(--clr-gold-dark)] pl-4">
                                    Emagrecer não precisa ser sofrimento. Com direção certa, método comprovado e acompanhamento estratégico, é possível recuperar saúde, autoestima e liberdade.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4">
                                {[
                                    { value: "20+", label: "Anos de experiência" },
                                    { value: "1000+", label: "Pacientes transformadas" },
                                    { value: "5", label: "Pilares do Método" },
                                ].map((s, i) => (
                                    <div key={i} className="counter-item">
                                        <span className="text-xl font-black font-heading text-[var(--clr-gold)]">{s.value}</span>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </RevealSection>
                    </div>
                </div>
            </section>

            {/* ═══════════ FINAL CTA ═══════════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden noise-overlay">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-green-deep)] via-[var(--clr-bg)] to-[var(--clr-surface)]" />
                <div className="hero-gradient-orb" style={{ width: 500, height: 500, top: -100, right: -100, background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />

                <div className="max-w-3xl mx-auto relative z-10 text-center space-y-10">
                    <RevealSection className="space-y-6">
                        <span className="text-[var(--clr-gold)] font-semibold uppercase tracking-widest text-xs">Sua Transformação Começa Agora</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Entre para a Imersão do Método de Emagrecimento Inteligente
                        </h2>
                        <p className="text-[var(--clr-text-muted)] text-lg leading-relaxed max-w-2xl mx-auto">
                            Descubra como sair do ciclo de começar, parar e recomeçar. Aprenda a emagrecer com método, clareza, estratégia e os pilares certos para transformar seu corpo e sua saúde.
                        </p>
                    </RevealSection>

                    <RevealSection>
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                            {[
                                { icon: Calendar, label: "11 de Maio" },
                                { icon: Clock, label: "20:07" },
                                { icon: Video, label: "Ao Vivo" },
                            ].map((item, i) => (
                                <div key={i} className="counter-item">
                                    <item.icon className="w-5 h-5 text-[var(--clr-gold)] mx-auto mb-2" />
                                    <span className="text-sm font-bold text-[var(--clr-text)]">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </RevealSection>

                    <RevealSection>
                        <button
                            onClick={() => scrollTo("ingressos")}
                            className="cta-primary inline-flex items-center gap-3 px-14 py-6 rounded-xl text-lg sm:text-xl cursor-pointer"
                        >
                            Garantir Minha Vaga Agora
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </RevealSection>
                </div>
            </section>

            {/* ═══════════ FOOTER ═══════════ */}
            <div className="gold-line" />
            <footer className="py-12 px-4 sm:px-6 bg-[var(--clr-bg)] text-[var(--clr-text-dim)] text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="font-bold text-[var(--clr-text)] mb-1">Imersão MEI &copy; 2025</p>
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
