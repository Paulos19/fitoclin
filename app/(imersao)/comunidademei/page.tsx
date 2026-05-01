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
} from "lucide-react";
import "./comunidade.css";

/* ─────────── DATA ─────────── */
const phases = [
    {
        letter: "M",
        title: "Mudar",
        description: "Despertar a consciência. Entender o que trava seu emagrecimento. Parar de viver no automático.",
        icon: Sparkles,
    },
    {
        letter: "E",
        title: "Estruturar",
        description: "Criar rotina inteligente. Organizar alimentação, sono, movimento e disciplina.",
        icon: Target,
    },
    {
        letter: "I",
        title: "Integrar",
        description: "Unir corpo, mente e hábitos saudáveis. Parar com o efeito sanfona.",
        icon: HeartHandshake,
    },
    {
        letter: "I",
        title: "Identidade",
        description: "Se tornar uma nova mulher. Saudável, leve, constante e segura.",
        icon: Crown,
    },
];

const pillars = [
    { icon: Heart, title: "Fé", description: "Força espiritual para permanecer." },
    { icon: Salad, title: "Alimentação Saudável", description: "Comida real, estratégia e equilíbrio." },
    { icon: Activity, title: "Movimento", description: "Atividade física possível e constante." },
    { icon: Brain, title: "Motivação", description: "Vencer sabotagem, ansiedade e procrastinação." },
    { icon: Leaf, title: "Plantas Medicinais", description: "Chás, blends e recursos naturais usados com inteligência." },
];

const cycles = [
    {
        title: "Ciclo 1 — Destravar o Corpo",
        modules: [
            { num: "01", title: "Despertar Metabólico + Consciência do Corpo" },
            { num: "02", title: "Reorganização Alimentar + Estratégia Antiinflamatória" },
            { num: "03", title: "Controle da Ansiedade + Compulsão Alimentar" },
        ],
    },
    {
        title: "Ciclo 2 — Curar a Mente e Acelerar Resultados",
        modules: [
            { num: "04", title: "Ativação do Metabolismo + Truques Naturais" },
            { num: "05", title: "Equilíbrio Hormonal + Energia e Disposição" },
            { num: "06", title: "Reprogramação Mental + Identidade Magra" },
        ],
    },
    {
        title: "Ciclo 3 — Mulher Forte e Constante",
        modules: [
            { num: "07", title: "Rotina Inteligente + Constância Sustentável" },
            { num: "08", title: "Uso Estratégico de Plantas Medicinais" },
            { num: "09", title: "Saúde Intestinal + Desinflamação Profunda" },
        ],
    },
    {
        title: "Ciclo 4 — Permanecer para Sempre",
        modules: [
            { num: "10", title: "Movimento Estratégico + Corpo Ativo" },
            { num: "11", title: "Manutenção do Resultado + Fim do Efeito Sanfona" },
            { num: "12", title: "Consolidação da Nova Mulher + Identidade Permanente" },
        ],
    },
];

const bonuses = [
    { icon: Award, text: "Consulta estratégica com Dra. Isa Bieski" },
    { icon: Brain, text: "Consulta com psicóloga parceira" },
    { icon: Video, text: "Encontros ao vivo por 12 meses" },
    { icon: MessageCircle, text: "Grupo exclusivo com suporte diário" },
    { icon: BookOpen, text: "Planos alimentares + receitas + estratégias" },
];

const testimonials = [
    { name: "Zenóbia Carvalho", result: "–4 kg em 15 dias", text: "Depois de tanto tempo acima dos 100 kg e sem conseguir emagrecer, finalmente vi resultado. Em apenas 15 dias eliminei 4 kg e ainda senti meu corpo desinchar. Voltei a acreditar em mim." },
    { name: "Marylilia (Lilinha)", result: "–3 kg em 7 dias", text: "Eu sofria com dores há anos e mal conseguia me movimentar. Em 7 dias eliminei 3 kg e me senti mais leve, mais disposta e com esperança de viver melhor." },
    { name: "Marineid Marchezini", result: "–5 kg em 7 dias", text: "Perdi 5 kg em apenas 7 dias. O que mais me impressionou foi perceber que existe método, direção e estratégia. Isso é inovador." },
    { name: "Maria de Lourdes", result: "–2,5 kg", text: "Eliminei 2,5 kg e voltei a sorrir. Mais do que peso, recuperei alegria e vontade de viver." },
    { name: "Maria Eni Isolan", result: "–3,4 kg em 7 dias", text: "Em apenas 7 dias perdi 3,4 kg. Meu corpo ficou mais leve, minhas dores melhoraram e minha motivação voltou." },
    { name: "Aline", result: "–5 kg em 30 dias", text: "Em 30 dias eliminei 5 kg, mesmo sem conseguir aplicar tudo perfeitamente. Imagine agora fazendo certo e com acompanhamento." },
];

const faqItems = [
    { q: "O que é a Comunidade Elite MEI?", a: "É uma comunidade premium com acompanhamento de 12 meses, baseada no Método de Emagrecimento Inteligente — unindo mente, metabolismo, rotina, emoções e hábitos permanentes." },
    { q: "Para quem é indicado?", a: "Para mulheres que desejam emagrecer com método, constância e transformação definitiva — sem dietas restritivas ou soluções milagrosas." },
    { q: "Como funciona o acompanhamento?", a: "Toda segunda às 21h07 (Brasília), com aula ao vivo semanal, grupo exclusivo diário, desafios mensais, prestação de contas e suporte contínuo." },
    { q: "Terei acesso a planos alimentares?", a: "Sim. Você receberá planos alimentares, receitas estratégicas e orientações práticas dentro da comunidade." },
    { q: "Posso participar de qualquer lugar?", a: "Sim, tudo é 100% online. Você acessa de onde estiver, no horário das aulas ao vivo ou pelo replay disponível." },
    { q: "Tem garantia?", a: "Sim, garantia incondicional de 7 dias. Se não se identificar com o método, devolvemos 100% do seu investimento." },
    { q: "Qual é o valor?", a: "O investimento é de 12x de R$ 61,74 ou R$ 697 à vista — uma fração do preço de consultas individuais durante 12 meses." },
    { q: "Quem é a Dra. Isa Bieski?", a: "Farmacêutica Clínica Integrativa com mais de 20 anos de experiência, especialista em Fitoterapia e criadora do Método MEI. Já transformou milhares de mulheres." },
];

const included = [
    "12 encontros premium ao vivo (1 por mês)",
    "Método estruturado em 4 fases + 5 pilares",
    "Grupo exclusivo com suporte diário",
    "Consulta estratégica com a Dra. Isa Bieski",
    "Consulta com psicóloga parceira",
    "Planos alimentares + receitas exclusivas",
    "Desafios mensais de transformação",
    "Prestação de contas e acompanhamento contínuo",
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
        <div ref={ref} className={`cm-reveal ${delay ? `cm-delay-${delay}` : ""} ${className}`}>
            {children}
        </div>
    );
}

/* ─────────── ANIMATED GUARANTEE SVG ─────────── */
function GuaranteeSVG() {
    return (
        <div className="relative w-28 h-28 mx-auto">
            <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Outer rotating ring */}
                <circle cx="60" cy="60" r="55" fill="none" stroke="url(#guaranteeGrad)" strokeWidth="2" strokeDasharray="8 4" opacity="0.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="30s" repeatCount="indefinite" />
                </circle>
                {/* Middle pulsing ring */}
                <circle cx="60" cy="60" r="48" fill="none" stroke="var(--clr-emerald)" strokeWidth="1.5" opacity="0.3">
                    <animate attributeName="r" values="46;50;46" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Shield body */}
                <path d="M60 18 L88 32 L88 58 C88 78 74 94 60 102 C46 94 32 78 32 58 L32 32 Z" fill="url(#shieldFill)" stroke="var(--clr-emerald-light)" strokeWidth="1.5" opacity="0.9">
                    <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" />
                </path>
                {/* Inner shield highlight */}
                <path d="M60 24 L84 36 L84 58 C84 75 72 89 60 96 C48 89 36 75 36 58 L36 36 Z" fill="none" stroke="var(--clr-emerald-light)" strokeWidth="0.5" opacity="0.3" />
                {/* Checkmark */}
                <path d="M45 58 L55 68 L75 48" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="0.8s" fill="freeze" />
                </path>
                {/* "7" text */}
                <text x="60" y="88" textAnchor="middle" fill="var(--clr-emerald-light)" fontSize="11" fontWeight="800" fontFamily="var(--font-heading)">7 DIAS</text>
                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="guaranteeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--clr-emerald)" />
                        <stop offset="100%" stopColor="var(--clr-gold)" />
                    </linearGradient>
                    <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--clr-emerald-deep)" />
                        <stop offset="100%" stopColor="rgba(61,139,110,0.3)" />
                    </linearGradient>
                </defs>
            </svg>
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-full bg-[var(--clr-emerald)] opacity-10 blur-xl cm-glow-pulse" />
        </div>
    );
}

/* ─────────── COMPONENT ─────────── */
export default function ComunidadeMEIPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
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
        <main className="comunidade-container">

            {/* ═══════ 1. HERO ═══════ */}
            <section className="cm-hero cm-noise relative min-h-[95vh] flex items-center">
                {/* Orbs */}
                <div className="cm-orb" style={{ width: 700, height: 700, top: -300, right: -300, background: "radial-gradient(circle, rgba(61,139,110,0.18) 0%, transparent 70%)" }} />
                <div className="cm-orb" style={{ width: 500, height: 500, bottom: -200, left: -200, background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />
                <div className="cm-orb" style={{ width: 300, height: 300, top: "40%", left: "50%", background: "radial-gradient(circle, rgba(61,139,110,0.08) 0%, transparent 70%)" }} />

                {/* Particles */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="cm-particle"
                        style={{
                            left: `${15 + i * 14}%`,
                            bottom: `${10 + (i % 3) * 15}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${10 + i * 2}s`,
                        }}
                    />
                ))}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT — COPY */}
                        <div className="space-y-8 py-16 lg:py-0 order-2 lg:order-1">
                            {/* Tags */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="cm-tag cm-tag-gold">
                                    <Crown className="w-3.5 h-3.5" />
                                    Comunidade Premium
                                </span>
                                <span className="cm-tag">
                                    <Calendar className="w-3.5 h-3.5" />
                                    12 meses de acompanhamento
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="cm-font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
                                Transforme seu corpo com um{" "}
                                <em className="text-[var(--clr-emerald-light)] not-italic">sistema inteligente</em>{" "}
                                que cura a raiz do problema.
                            </h1>

                            {/* Sub */}
                            <p className="text-lg sm:text-xl text-[var(--clr-text-muted)] leading-relaxed max-w-xl">
                                A comunidade premium para mulheres que desejam emagrecer com saúde, constância e transformação definitiva. Você não precisa de mais uma dieta — precisa de um método.
                            </p>

                            {/* CTA */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => scrollTo("oferta")}
                                    className="cm-cta inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base sm:text-lg cursor-pointer"
                                >
                                    Quero entrar na Comunidade
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <p className="flex items-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                    <CheckCircle2 className="w-4 h-4 text-[var(--clr-emerald)]" />
                                    Método validado em mais de 1.000 mulheres no consultório
                                </p>
                            </div>
                        </div>

                        {/* RIGHT — IMAGE + FLOATING CARDS */}
                        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div
                                className="relative w-full max-w-lg lg:max-w-none"
                                style={{ transform: `translateY(${-parallaxY * 0.25}px)` }}
                            >
                                <img
                                    src="/WhatsApp%20Image%202026-04-01%20at%2010.25.25.jpeg"
                                    alt="Dra. Isa Bieski — Mentora da Comunidade Elite MEI"
                                    className="w-full h-auto max-h-[500px] lg:max-h-[580px] object-cover object-top rounded-3xl shadow-2xl"
                                    style={{ filter: "brightness(1.05)" }}
                                />
                                <div className="absolute -inset-1 rounded-3xl border border-[var(--clr-border)] pointer-events-none" />

                                {/* Floating card 1 */}
                                <div className="cm-float absolute -left-4 sm:-left-8 bottom-20 cm-glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clr-emerald-deep)] flex items-center justify-center">
                                        <Users className="w-5 h-5 text-[var(--clr-emerald-light)]" />
                                    </div>
                                    <div>
                                        <p className="cm-font-heading font-bold text-sm text-[var(--clr-text)]">1.000+</p>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider">Mulheres transformadas</p>
                                    </div>
                                </div>

                                {/* Floating card 2 */}
                                <div className="cm-float-slow absolute -right-2 sm:-right-6 top-16 cm-glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl" style={{ animationDelay: "2s" }}>
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clr-gold)]/10 flex items-center justify-center">
                                        <Flame className="w-5 h-5 text-[var(--clr-gold)]" />
                                    </div>
                                    <div>
                                        <p className="cm-font-heading font-bold text-sm text-[var(--clr-text)]">12 meses</p>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider">De acompanhamento</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ 2. AUTHORITY / SOCIAL PROOF ═══════ */}
            <div className="cm-line-thick" />
            <section className="py-12 px-4 sm:px-6 bg-[var(--clr-surface)]">
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { value: "20+", label: "Anos de experiência", icon: Award },
                        { value: "1.000+", label: "Mulheres transformadas", icon: Users },
                        { value: "12", label: "Meses de acompanhamento", icon: Calendar },
                        { value: "5", label: "Pilares do Método", icon: Flower2 },
                    ].map((item, idx) => (
                        <div key={idx} className="cm-stat flex flex-col items-center gap-2">
                            <item.icon className="w-5 h-5 text-[var(--clr-emerald-light)]" />
                            <span className="text-2xl sm:text-3xl font-black cm-font-heading text-[var(--clr-text)]">{item.value}</span>
                            <span className="text-[10px] uppercase tracking-widest text-[var(--clr-text-dim)] font-semibold text-center">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>
            <div className="cm-line-thick" />

            {/* ═══════ 3. AS 4 FASES DO MEI ═══════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 cm-noise relative">
                <div className="cm-orb" style={{ width: 500, height: 500, top: -100, left: -200, background: "radial-gradient(circle, rgba(61,139,110,0.12) 0%, transparent 70%)" }} />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-16">
                        <span className="cm-tag">As 4 Fases</span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            O Método{" "}
                            <em className="text-[var(--clr-emerald-light)] not-italic">MEI</em>{" "}
                            em 4 fases transformadoras
                        </h2>
                        <p className="text-lg text-[var(--clr-text-muted)] max-w-2xl mx-auto">
                            Um método estruturado para organizar mente, metabolismo, rotina, emoções e hábitos permanentes.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {phases.map((p, idx) => (
                            <Reveal key={idx} delay={idx + 1}>
                                <div className="cm-phase p-8 h-full flex flex-col items-center text-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--clr-emerald-deep)] to-[var(--clr-emerald)]/30 border border-[var(--clr-border-strong)] flex items-center justify-center">
                                        <span className="cm-font-display text-3xl font-bold text-[var(--clr-emerald-light)]">{p.letter}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="cm-font-heading font-bold text-lg text-[var(--clr-text)]">{p.title}</h4>
                                        <p className="text-sm text-[var(--clr-text-dim)] leading-relaxed">{p.description}</p>
                                    </div>
                                    <p.icon className="w-5 h-5 text-[var(--clr-emerald)]/50 mt-auto" />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 4. OS 5 PILARES ═══════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-emerald-deep)]/10 to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-16">
                        <span className="cm-tag cm-tag-gold">Os 5 Pilares</span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl font-bold">
                            O Método que vai além da dieta
                        </h2>
                        <p className="text-[var(--clr-text-muted)] max-w-xl mx-auto">
                            Cada pilar sustenta sua transformação de forma completa e integrativa.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {pillars.map((p, idx) => (
                            <Reveal key={idx} delay={idx + 1}>
                                <div className="cm-glass rounded-2xl p-6 text-center h-full flex flex-col items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--clr-emerald-deep)] border border-[var(--clr-border)] flex items-center justify-center">
                                        <p.icon className="w-6 h-6 text-[var(--clr-emerald-light)]" />
                                    </div>
                                    <h4 className="cm-font-heading font-bold text-base text-[var(--clr-text)]">{p.title}</h4>
                                    <p className="text-sm text-[var(--clr-text-dim)] leading-relaxed">{p.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 5. OS 12 MÓDULOS ═══════ */}
            <div className="cm-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 cm-noise relative">
                <div className="cm-orb" style={{ width: 400, height: 400, bottom: -100, right: -100, background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />
                <div className="max-w-5xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-16">
                        <span className="cm-tag cm-tag-gold">
                            <BookOpen className="w-3.5 h-3.5" />
                            12 Encontros Premium
                        </span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Uma jornada completa de{" "}
                            <em className="text-[var(--clr-gold)] not-italic">12 meses</em>
                        </h2>
                        <p className="text-[var(--clr-text-muted)] max-w-2xl mx-auto">
                            4 ciclos transformadores, cada um com 3 módulos estratégicos para você evoluir gradualmente.
                        </p>
                    </Reveal>

                    <div className="space-y-8">
                        {cycles.map((cycle, cIdx) => (
                            <Reveal key={cIdx} delay={(cIdx % 2) + 1}>
                                <div className="cm-card rounded-2xl overflow-hidden">
                                    <div className="px-6 py-4 bg-gradient-to-r from-[var(--clr-emerald-deep)]/40 to-transparent border-b border-[var(--clr-border)]">
                                        <div className="flex items-center gap-3">
                                            <Flame className="w-5 h-5 text-[var(--clr-gold)]" />
                                            <h3 className="cm-font-heading font-bold text-base sm:text-lg text-[var(--clr-text)]">{cycle.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {cycle.modules.map((mod, mIdx) => (
                                            <div key={mIdx} className="flex items-start gap-3">
                                                <div className="flex flex-col items-center gap-1 pt-1">
                                                    <div className="cm-timeline-dot" />
                                                    {mIdx < 2 && <div className="cm-timeline-line h-8 hidden sm:block" />}
                                                </div>
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-[var(--clr-emerald)] font-semibold">
                                                        Módulo {mod.num}
                                                    </span>
                                                    <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed mt-1">{mod.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 6. DEPOIMENTOS ═══════ */}
            <div className="cm-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/30 to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-16">
                        <span className="cm-tag cm-tag-gold">
                            <Star className="w-3.5 h-3.5" />
                            Resultados Reais
                        </span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl font-bold leading-tight">
                            Veja o que mulheres reais viveram{" "}
                            <br className="hidden sm:block" />
                            após aplicar o Método MEI
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {testimonials.map((t, idx) => (
                            <Reveal key={idx} delay={(idx % 4) + 1}>
                                <div className="cm-testimonial rounded-xl p-6 h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--clr-emerald-deep)] to-[var(--clr-emerald)] flex items-center justify-center text-white font-bold text-xs">
                                            {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                        </div>
                                        <div className="flex-grow space-y-3">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="cm-font-heading font-bold text-sm text-[var(--clr-text)]">{t.name}</span>
                                                <span className="text-xs font-semibold text-[var(--clr-emerald-light)] bg-[var(--clr-emerald)]/10 px-2 py-0.5 rounded-md">{t.result}</span>
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
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="text-center pt-12">
                        <button
                            onClick={() => scrollTo("oferta")}
                            className="cm-cta inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-base sm:text-lg cursor-pointer"
                        >
                            Quero Fazer Parte
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Reveal>
                </div>
            </section>

            {/* ═══════ BÔNUS ═══════ */}
            <div className="cm-line-gold" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 cm-noise relative">
                <div className="cm-orb" style={{ width: 400, height: 400, top: -100, left: -100, background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-5 mb-14">
                        <span className="cm-tag cm-tag-gold">
                            <Gift className="w-3.5 h-3.5" />
                            Bônus Exclusivos
                        </span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl font-bold">
                            Você ainda recebe tudo isso
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {bonuses.map((b, idx) => (
                            <Reveal key={idx} delay={(idx % 3) + 1}>
                                <div className="cm-glass rounded-2xl p-6 h-full flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--clr-gold)]/10 border border-[var(--clr-border-gold)] flex items-center justify-center flex-shrink-0">
                                        <b.icon className="w-5 h-5 text-[var(--clr-gold)]" />
                                    </div>
                                    <p className="text-sm text-[var(--clr-text-muted)] leading-relaxed font-medium">{b.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 7. QUEM É A DRA ISA ═══════ */}
            <div className="cm-line" />
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-bg)] via-transparent to-[var(--clr-bg)]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <Reveal className="order-2 lg:order-1">
                            <div className="cm-about-img rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/isa.jpeg"
                                    alt="Dra. Isa Bieski — Farmacêutica Clínica Integrativa"
                                    className="w-full h-auto"
                                    style={{ transform: `translateY(${parallaxY * 0.08}px)`, transition: "transform 0.1s linear" }}
                                />
                            </div>
                        </Reveal>

                        {/* Bio */}
                        <Reveal className="order-1 lg:order-2 space-y-8">
                            <div className="space-y-3">
                                <span className="cm-tag cm-tag-gold">Conheça a Mentora</span>
                                <h2 className="cm-font-display text-3xl sm:text-4xl font-bold">
                                    Quem é a Dra. Isa Bieski?
                                </h2>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--clr-emerald)] to-[var(--clr-gold)] rounded-full" />
                            </div>

                            <div className="space-y-5 text-[var(--clr-text-muted)] leading-relaxed">
                                <p>
                                    <strong className="text-[var(--clr-text)]">Farmacêutica Clínica Integrativa, pesquisadora e especialista em Fitoterapia</strong> com mais de 20 anos de trajetória unindo ciência, prática clínica e cuidado humano.
                                </p>
                                <p>
                                    Desenvolveu o <strong className="text-[var(--clr-text)]">Método de Emagrecimento Inteligente (MEI)</strong>, uma abordagem que une estratégia alimentar, plantas medicinais, comportamento, espiritualidade, movimento e reprogramação mental.
                                </p>
                                <p>
                                    Já impactou <strong className="text-[var(--clr-text)]">milhares de mulheres</strong> por meio de atendimentos, mentorias e programas de transformação.
                                </p>
                                <p className="font-medium text-[var(--clr-emerald-light)] italic border-l-2 border-[var(--clr-emerald)] pl-4">
                                    O verdadeiro emagrecimento não começa no prato. Começa quando a mulher decide não se abandonar mais.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: "20+", label: "Anos de experiência" },
                                    { value: "1000+", label: "Pacientes transformadas" },
                                    { value: "5", label: "Pilares do Método" },
                                ].map((s, i) => (
                                    <div key={i} className="cm-stat">
                                        <span className="text-xl font-black cm-font-heading text-[var(--clr-emerald-light)]">{s.value}</span>
                                        <p className="text-[10px] text-[var(--clr-text-dim)] uppercase tracking-wider mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══════ 8. OFERTA + PRICING ═══════ */}
            <div className="cm-line-thick" />
            <section id="oferta" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-[var(--clr-surface)]/50 to-[var(--clr-bg)]" />
                <div className="cm-orb" style={{ width: 500, height: 500, top: -150, right: -150, background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)" }} />

                <div className="max-w-3xl mx-auto relative z-10">
                    <Reveal className="text-center space-y-6 mb-14">
                        <span className="cm-tag cm-tag-gold">
                            <Crown className="w-3.5 h-3.5" />
                            Oferta Especial
                        </span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Entre agora para a{" "}
                            <em className="text-[var(--clr-gold)] not-italic">Comunidade Elite MEI</em>
                        </h2>
                        <p className="text-[var(--clr-text-muted)] max-w-xl mx-auto">
                            12 meses de acompanhamento, método estruturado e suporte contínuo para transformar seu corpo e sua vida.
                        </p>
                    </Reveal>

                    <Reveal>
                        <div className="cm-pricing pt-14 cm-glow-gold">
                            <div className="cm-pricing-ribbon">Acesso Completo — 12 Meses</div>

                            <div className="p-8 sm:p-10 space-y-8">
                                {/* Included */}
                                <div className="space-y-2">
                                    <h3 className="cm-font-heading text-xl font-bold text-[var(--clr-text)] flex items-center gap-2">
                                        <Star className="w-5 h-5 text-[var(--clr-gold)]" />
                                        Comunidade Elite MEI
                                    </h3>
                                    <p className="text-sm text-[var(--clr-text-dim)]">
                                        Tudo que você precisa para emagrecer com método, constância e transformação definitiva.
                                    </p>
                                </div>

                                <ul className="space-y-3">
                                    {included.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <Check className="w-4 h-4 text-[var(--clr-emerald)] mt-0.5 flex-shrink-0" />
                                            <span className="text-[var(--clr-text-muted)]">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Price */}
                                <div className="border-t border-[var(--clr-border-gold)] pt-8 space-y-6">
                                    {/* Savings badge */}
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20">
                                            <Zap className="w-4 h-4 text-red-400" />
                                            <span className="text-sm font-bold text-red-400">Economia de R$ 9.288</span>
                                        </div>
                                    </div>

                                    {/* Original price */}
                                    <div className="text-center">
                                        <p className="text-base text-[var(--clr-text-dim)]">
                                            Valor real: <span className="line-through text-red-400/70">R$ 9.985</span>
                                        </p>
                                    </div>

                                    {/* Price display */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Installment - Primary */}
                                        <div className="cm-glass rounded-2xl p-6 text-center border-[var(--clr-border-gold)] relative overflow-hidden">
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--clr-gold)] to-[var(--clr-emerald)]" />
                                            <p className="text-[10px] uppercase tracking-widest text-[var(--clr-gold)] font-semibold mb-2">Parcelado</p>
                                            <p className="text-lg text-[var(--clr-text-muted)] cm-font-heading">12x de</p>
                                            <p className="text-5xl font-black cm-font-heading text-[var(--clr-gold)] leading-tight mt-1">
                                                R$ 61<span className="text-3xl">,74</span>
                                            </p>
                                            <p className="text-xs text-[var(--clr-text-dim)] mt-2">no cartão de crédito</p>
                                        </div>
                                        {/* A vista */}
                                        <div className="cm-glass rounded-2xl p-6 text-center flex flex-col justify-center">
                                            <p className="text-[10px] uppercase tracking-widest text-[var(--clr-emerald-light)] font-semibold mb-2">À Vista</p>
                                            <p className="text-4xl font-black cm-font-heading text-[var(--clr-text)] leading-tight">
                                                R$ 597
                                            </p>
                                            <p className="text-xs text-[var(--clr-emerald-light)] mt-2 font-medium">Melhor preço</p>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href="https://go.hotmart.com/I104935049E?dp=1"
                                        className="cm-cta-gold block w-full text-center py-5 rounded-2xl text-base cursor-pointer"
                                    >
                                        Garantir Minha Vaga Agora
                                    </a>

                                    {/* Trust indicators */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[var(--clr-text-dim)]">
                                        <div className="flex items-center gap-1.5">
                                            <Shield className="w-4 h-4 text-[var(--clr-emerald)]" />
                                            Garantia de 7 dias
                                        </div>
                                        <div className="hidden sm:block w-1 h-1 rounded-full bg-[var(--clr-text-dim)]" />
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-[var(--clr-emerald)]" />
                                            Pagamento 100% seguro
                                        </div>
                                        <div className="hidden sm:block w-1 h-1 rounded-full bg-[var(--clr-text-dim)]" />
                                        <div className="flex items-center gap-1.5">
                                            <BadgeCheck className="w-4 h-4 text-[var(--clr-emerald)]" />
                                            Acesso imediato
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Guarantee */}
                    <Reveal className="mt-10">
                        <div className="cm-guarantee p-8 sm:p-10 text-center space-y-5">
                            <GuaranteeSVG />
                            <h3 className="cm-font-display text-2xl font-bold">Garantia Incondicional de 7 Dias</h3>
                            <p className="text-[var(--clr-text-muted)] leading-relaxed max-w-lg mx-auto">
                                Se por qualquer motivo você decidir que não é para você, é só pedir reembolso dentro de 7 dias e{" "}
                                <strong className="text-[var(--clr-text)]">devolvemos 100% do valor.</strong> Sem burocracia, sem perguntas.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════ COMO FUNCIONA ═══════ */}
            <div className="cm-line" />
            <section className="py-16 px-4 sm:px-6 bg-[var(--clr-surface)]">
                <div className="max-w-4xl mx-auto">
                    <Reveal className="text-center space-y-4 mb-10">
                        <h3 className="cm-font-heading font-bold text-xl text-[var(--clr-text)]">Como funciona na prática</h3>
                    </Reveal>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { icon: Calendar, text: "Toda segunda" },
                            { icon: Clock, text: "21h07 Brasília" },
                            { icon: Video, text: "Aula ao vivo" },
                            { icon: MessageCircle, text: "Grupo diário" },
                            { icon: Target, text: "Desafios mensais" },
                            { icon: BadgeCheck, text: "Suporte contínuo" },
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={(idx % 3) + 1}>
                                <div className="cm-stat flex flex-col items-center gap-2">
                                    <item.icon className="w-5 h-5 text-[var(--clr-emerald-light)]" />
                                    <span className="text-xs font-semibold text-[var(--clr-text)] text-center">{item.text}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            <div className="cm-line" />

            {/* ═══════ 9. FAQ ═══════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <Reveal className="text-center space-y-4 mb-14">
                        <h2 className="cm-font-display text-3xl sm:text-4xl font-bold">
                            Ficou com alguma dúvida?
                        </h2>
                        <p className="text-[var(--clr-text-muted)]">Tire suas dúvidas sobre a Comunidade Elite MEI</p>
                    </Reveal>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <Reveal key={idx}>
                                <details
                                    className="cm-faq"
                                    open={openFaq === idx}
                                    onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === idx ? null : idx); }}
                                >
                                    <summary>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[var(--clr-emerald)] transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? "rotate-180" : ""}`}
                                        />
                                        {item.q}
                                    </summary>
                                    {openFaq === idx && <div className="cm-faq-answer">{item.a}</div>}
                                </details>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 10. FINAL CTA ═══════ */}
            <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden cm-noise">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-emerald-deep)] via-[var(--clr-bg)] to-[var(--clr-surface)]" />
                <div className="cm-orb" style={{ width: 600, height: 600, top: -200, right: -200, background: "radial-gradient(circle, rgba(61,139,110,0.12) 0%, transparent 70%)" }} />
                <div className="cm-orb" style={{ width: 400, height: 400, bottom: -100, left: -100, background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)" }} />

                <div className="max-w-3xl mx-auto relative z-10 text-center space-y-10">
                    <Reveal className="space-y-6">
                        <span className="cm-tag cm-tag-gold mx-auto">Sua Transformação Começa Agora</span>
                        <h2 className="cm-font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Isso não é mais uma tentativa.{" "}
                            <br className="hidden sm:block" />
                            É um processo guiado por{" "}
                            <em className="text-[var(--clr-emerald-light)] not-italic">12 meses.</em>
                        </h2>
                        <p className="text-[var(--clr-text-muted)] text-lg leading-relaxed max-w-2xl mx-auto">
                            Onde você deixa de lutar com seu corpo e aprende a viver em equilíbrio com ele.
                        </p>
                    </Reveal>

                    <Reveal>
                        <div className="space-y-6">
                            <div className="flex justify-center gap-4 flex-wrap">
                                <div className="cm-stat px-5 py-3">
                                    <p className="text-2xl font-black cm-font-heading text-[var(--clr-gold)]">12x</p>
                                    <p className="text-xs text-[var(--clr-text-dim)]">R$ 61,74</p>
                                </div>
                                <div className="cm-stat px-5 py-3">
                                    <p className="text-lg font-bold cm-font-heading text-[var(--clr-text)]">ou</p>
                                    <p className="text-xs text-[var(--clr-text-dim)]">R$ 697 à vista</p>
                                </div>
                            </div>

                            <a
                                href="https://go.hotmart.com/I104935049E?dp=1"
                                className="cm-cta-gold inline-flex items-center gap-3 px-14 py-6 rounded-2xl text-lg sm:text-xl cursor-pointer"
                            >
                                Entrar na Comunidade Elite
                                <ArrowRight className="w-6 h-6" />
                            </a>

                            <p className="flex items-center justify-center gap-2 text-sm text-[var(--clr-text-dim)]">
                                <Shield className="w-4 h-4 text-[var(--clr-emerald)]" />
                                Garantia incondicional de 7 dias
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <div className="cm-line" />
            <footer className="py-12 px-4 sm:px-6 bg-[var(--clr-bg)] text-[var(--clr-text-dim)] text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="font-bold text-[var(--clr-text)] mb-1">Comunidade Elite MEI &copy; 2025</p>
                        <p>Todos os direitos reservados.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <a href="https://wa.me/5565998200593" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--clr-emerald)] transition-colors">
                            <Phone className="w-4 h-4" />
                            65 99820-0593
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
