"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { asset } from "@/lib/base-path";
import { categories, details, faq, heroStats, mailLink, nav, projects, renderPairs, ringPhotos, services, steps, studio, testimonials, videos, type Project } from "@/lib/data";
import { wrap } from "@/lib/ui";
import { Magnetic } from "./FX";
import { PhotoRing } from "./Hero3D";
import { IconArrow, IconInstagram } from "./Icons";
import { useHistoryLayer } from "./Nav";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

/** Progresso (0 a 1) de um elemento alto passando pela tela; usado nas seções presas à rolagem. */
function useStickyProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return [ref, p] as const;
}

/** Fecha com Esc, trava a rolagem e liga a janela ao histórico (voltar do celular fecha). */
function useLayer(open: boolean, close: () => void, extra?: (e: KeyboardEvent) => void) {
  useHistoryLayer(open, close);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      extra?.(e);
    };
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", k);
    };
  }, [open, close, extra]);
}

function BackPill({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-[0.85rem] font-medium text-ink transition-colors hover:bg-accent hover:text-paper">
      <span aria-hidden>←</span> Voltar
    </button>
  );
}

/* ---------- botão pílula, como no Vxora ---------- */
export function Pill({ href, children, variant = "accent", external = false, cursor }: { href: string; children: React.ReactNode; variant?: "accent" | "light" | "dark" | "outline"; external?: boolean; cursor?: string }) {
  const styles = {
    accent: "bg-accent text-paper hover:bg-ink",
    light: "bg-paper text-ink hover:bg-accent hover:text-paper",
    dark: "bg-ink text-paper hover:bg-accent",
    outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  }[variant];
  return (
    <Magnetic strength={0.2}>
      <a
        href={href}
        data-cursor={cursor}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={`group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-[0.95rem] font-medium transition-colors duration-300 ${styles}`}
      >
        {children}
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-current/15">
          <span className="relative block h-4 w-4">
            <IconArrow className="absolute inset-0 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-5 group-hover:translate-x-5" />
            <IconArrow className="absolute inset-0 h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
        </span>
      </a>
    </Magnetic>
  );
}

/* ---------- cabeçalho: pílula translúcida; some ao descer e volta ao subir ---------- */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 600 && y > last);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  useLayer(open, close);
  return (
    <>
      <header className={`fixed inset-x-0 top-3 z-50 transition-transform duration-500 md:top-5 ${hidden && !open ? "-translate-y-[140%]" : ""}`}>
        <div className={wrap}>
          <div className={`flex items-center justify-between rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow,color] duration-500 ${solid ? "bg-card/92 text-ink shadow-[0_8px_30px_-12px_rgba(31,26,21,0.25)] backdrop-blur-md" : "bg-paper/10 text-paper backdrop-blur-sm"}`}>
            <a href="#topo" data-no-back className="text-[1.05rem] font-semibold tracking-[-0.02em]">
              Taissa Santos<span className="t-serif ml-1 font-normal opacity-80">arquitetura</span>
            </a>
            <nav className="hidden items-center gap-7 text-[0.92rem] lg:flex" aria-label="Seções">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="group relative py-1">
                  {n.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a href="#contato" className={`hidden rounded-full px-5 py-2.5 text-[0.9rem] font-medium transition-colors sm:inline-flex ${solid ? "bg-accent text-paper hover:bg-ink" : "bg-paper text-ink hover:bg-accent hover:text-paper"}`}>
                Iniciar projeto
              </a>
              <button type="button" onClick={() => setOpen(true)} className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden ${solid ? "bg-ink text-paper" : "bg-paper text-ink"}`} aria-label="Abrir menu" aria-expanded={open}>
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[70] flex animate-[menuIn_0.6s_cubic-bezier(0.77,0,0.18,1)_both] flex-col bg-night px-6 pb-8 pt-6 text-paper" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Taissa Santos</span>
            <BackPill onClick={close} />
          </div>
          <nav className="mt-12 flex flex-col gap-1" aria-label="Seções">
            {nav.map((n, i) => (
              <a key={n.href} href={n.href} onClick={close} className="t-h1 animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both] py-1.5" style={{ animationDelay: `${150 + i * 60}ms` }}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto space-y-1 text-paper/75">
            <a href={`mailto:${studio.email}`} className="block">
              {studio.email}
            </a>
            <a href={studio.instagram} target="_blank" rel="noreferrer" className="block">
              {studio.handle}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- topo: painel escuro arredondado com o anel 3D de fotos ---------- */
export function Hero() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const lines = ["Arquitetura", "que também", "se *sente*."];
  return (
    <section id="topo" data-title="o início" className="p-2 md:p-3">
      <div className="relative h-[100svh] min-h-[640px] animate-[heroIn_1.6s_cubic-bezier(0.77,0,0.18,1)_both] overflow-hidden rounded-[22px] bg-night text-paper md:max-h-[980px] md:rounded-[32px]">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_70%_45%,#3a2c21_0%,#1b1612_70%)]" />
        <div className={`absolute inset-0 transition-opacity duration-[1.6s] ${ready ? "opacity-100" : "opacity-0"}`}>
          <PhotoRing photos={ringPhotos} onReady={onReady} />
        </div>
        {/* véu para o texto ler bem sobre as fotos */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(27,22,18,0.92)_0%,rgba(27,22,18,0.6)_38%,rgba(27,22,18,0)_62%)] max-md:bg-[linear-gradient(0deg,rgba(27,22,18,0.95)_8%,rgba(27,22,18,0.55)_55%,rgba(27,22,18,0.2)_100%)]" />

        <div className={`${wrap} pointer-events-none relative flex h-full flex-col justify-end pb-8 pt-28 md:justify-center md:pb-24`}>
          <div className="pointer-events-auto max-w-[36rem]">
            <p className="flex animate-[fadeUp_1s_0.9s_both] items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-paper/80">
              <span className="h-1.5 w-1.5 rounded-full bg-sand" /> Interiores · Goiânia
            </p>
            <h1 className="t-hero mt-5" aria-label="Arquitetura que também se sente.">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.06em]" aria-hidden>
                  <span className="block animate-[riseIn_1.2s_cubic-bezier(0.16,1,0.3,1)_both] md:whitespace-nowrap" style={{ animationDelay: `${700 + i * 120}ms` }}>
                    {l.split("*").map((c, k) => (k % 2 ? <em key={k} className="t-serif text-sand">{c}</em> : c))}
                  </span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-[30rem] animate-[fadeUp_1s_1.2s_both] text-[1.05rem] leading-relaxed text-paper/85">
              O lar carrega a identidade de quem vive ali. O trabalho da Taissa Santos é traduzir pessoas em espaços, com textura, luz e o essencial.
            </p>
            <div className="mt-8 flex animate-[fadeUp_1s_1.35s_both] flex-wrap gap-3">
              <Pill href="#contato" variant="light">
                Iniciar um projeto
              </Pill>
              <a href="#projetos" className="inline-flex items-center rounded-full border border-paper/35 bg-paper/10 px-5 py-2.5 text-[0.95rem] font-medium backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink">
                Ver projetos
              </a>
            </div>
          </div>
        </div>

        {/* cartão de números, à direita embaixo (como no Vxora) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden md:block">
          <div className={`${wrap} flex justify-end`}>
            <div className="pointer-events-auto grid w-[25rem] animate-[fadeUp_1s_1.6s_both] grid-cols-3 gap-4 rounded-[22px] border border-paper/15 bg-paper/10 p-5 backdrop-blur-md">
              {heroStats.map((s) => (
                <div key={s.value}>
                  <p className="text-[1.6rem] font-medium leading-none tracking-[-0.03em]">{s.value}</p>
                  <p className="mt-2 text-[0.74rem] leading-snug text-paper/80">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroStatsMobile() {
  return (
    <div className={`${wrap} grid grid-cols-3 gap-3 pt-6 md:hidden`}>
      {heroStats.map((s) => (
        <div key={s.value} className="rounded-2xl bg-card p-3">
          <p className="text-[1.25rem] font-medium tracking-[-0.03em]">{s.value}</p>
          <p className="mt-1 text-[0.72rem] leading-snug text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- serviços: lista com foto que acompanha o item ativo + cartão 3D que inclina ---------- */
export function Services() {
  const [active, setActive] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  return (
    <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14">
      <div
        className="relative hidden aspect-square [perspective:1200px] md:block"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !card.current) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
        }}
        onPointerLeave={() => card.current && (card.current.style.transform = "")}
      >
        <div ref={card} className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]">
          {services.map((s, i) => (
            <div key={s.title} className="absolute inset-0 overflow-hidden rounded-[28px] transition-[opacity,clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]" style={{ opacity: i === active ? 1 : 0, clipPath: i === active ? "inset(0 0 0 0 round 28px)" : "inset(0 0 100% 0 round 28px)" }}>
              <Image src={asset(s.img)} alt={s.alt} fill quality={90} sizes="560px" className="object-cover" />
            </div>
          ))}
          <span className="absolute bottom-5 left-5 rounded-full bg-paper/90 px-4 py-2 text-[0.85rem] font-medium backdrop-blur [transform:translateZ(60px)]">{services[active].title}</span>
        </div>
      </div>
      <ol className="border-t border-line">
        {services.map((s, i) => (
          <li key={s.title} className="border-b border-line">
            <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className="group flex w-full items-start gap-5 py-6 text-left md:py-7" aria-expanded={i === active}>
              <span className={`mt-1 text-[0.85rem] tabular-nums transition-colors ${i === active ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
              <span className="flex-1">
                <span className={`block text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.03em] transition-transform duration-500 ${i === active ? "translate-x-2" : "group-hover:translate-x-1"}`}>{s.title}</span>
                <span className={`grid transition-[grid-template-rows] duration-500 ${i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <span className="overflow-hidden">
                    <span className="block max-w-[32rem] pt-3 leading-relaxed text-muted">{s.text}</span>
                    <span className="relative mt-4 block aspect-[16/10] overflow-hidden rounded-2xl md:hidden">
                      <Image src={asset(s.img)} alt={s.alt} fill quality={90} sizes="100vw" className="object-cover" />
                    </span>
                  </span>
                </span>
              </span>
              <span className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${i === active ? "rotate-45 border-accent bg-accent text-paper" : "border-line"}`} aria-hidden>
                +
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- projetos: filtros, cartões com inclinação 3D e segunda foto, janela com galeria ---------- */
export function Projects() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Todos");
  const [open, setOpen] = useState<number | null>(null);
  const [more, setMore] = useState(false);
  const list = useMemo(() => projects.map((p, i) => ({ p, i })).filter(({ p }) => cat === "Todos" || p.category === cat), [cat]);
  const shown = more || cat !== "Todos" ? list : list.slice(0, 7);
  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar projetos">
        {categories.map((c) => {
          const n = c === "Todos" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors ${cat === c ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-line"}`}>
              {c} <sup className="ml-0.5 text-[0.7em] opacity-70">{n}</sup>
            </button>
          );
        })}
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {shown.map(({ p, i }, k) => (
          <ProjectCard key={p.slug} p={p} wide={cat === "Todos" && !more && k === 0} onOpen={() => setOpen(i)} delay={(k % 2) * 120} />
        ))}
      </div>
      {cat === "Todos" && !more && (
        <div className="mt-12 flex justify-center">
          <button type="button" onClick={() => setMore(true)} className="rounded-full border border-ink/20 px-6 py-3 font-medium transition-colors hover:bg-ink hover:text-paper">
            Ver todos os {projects.length} projetos
          </button>
        </div>
      )}
      {open !== null && <ProjectModal index={open} setIndex={setOpen} />}
    </>
  );
}

function ProjectCard({ p, onOpen, wide, delay }: { p: Project; onOpen: () => void; wide: boolean; delay: number }) {
  const [ref, v] = useInView<HTMLButtonElement>(0.15);
  const inner = useRef<HTMLDivElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-cursor="Ver projeto"
      className={`group block text-left transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [perspective:1000px] ${wide ? "md:col-span-2" : ""} ${v ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !inner.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        inner.current.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.01)`;
      }}
      onPointerLeave={() => inner.current && (inner.current.style.transform = "")}
    >
      <div ref={inner} className={`relative overflow-hidden rounded-[24px] bg-line transition-transform duration-500 ease-out ${wide ? "aspect-[4/5] md:aspect-[21/10]" : "aspect-[4/5] md:aspect-[4/3]"}`}>
        <Image src={asset(p.images[0])} alt={p.title} fill quality={90} sizes={wide ? "(min-width: 768px) 1160px, 100vw" : "(min-width: 768px) 570px, 100vw"} className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
        {p.images[1] && <Image src={asset(p.images[1])} alt="" fill quality={90} sizes={wide ? "1160px" : "570px"} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 max-md:hidden" />}
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[0.8rem] font-medium backdrop-blur">{p.year}</span>
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-[0.78rem] text-paper opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
          {p.images.length} fotos{p.video ? " · vídeo" : ""}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[1.35rem] font-medium tracking-[-0.025em]">{p.title}</h3>
          <p className="mt-0.5 text-[0.95rem] text-muted">{p.kind}</p>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
          <IconArrow className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

function ProjectModal({ index, setIndex }: { index: number; setIndex: (v: number | null) => void }) {
  const p = projects[index];
  const [img, setImg] = useState(0);
  const [playing, setPlaying] = useState(false);
  // trocou de projeto: volta para a primeira foto (ajuste durante a renderização, sem efeito)
  const [shownIndex, setShownIndex] = useState(index);
  if (shownIndex !== index) {
    setShownIndex(index);
    setImg(0);
    setPlaying(false);
  }
  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback((d: number) => setImg((v) => (v + d + p.images.length) % p.images.length), [p.images.length]);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go],
  );
  useLayer(true, close, keys);
  const swipe = useRef<number | null>(null);
  return (
    <div className="fixed inset-0 z-[70] grid animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both] overflow-y-auto bg-night text-paper md:grid-cols-[1fr_24rem] md:overflow-hidden" role="dialog" aria-modal="true" aria-label={p.title}>
      <div
        className="relative min-h-[58svh] touch-pan-y"
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {playing && p.video ? (
          <video src={asset(`/video/${p.video}.mp4`)} poster={asset(`/video/${p.video}.webp`)} controls autoPlay playsInline className="absolute inset-0 h-full w-full object-contain p-3 md:p-8" />
        ) : (
          p.images.map((src, k) => (
            <Image key={src} src={asset(src)} alt={`${p.title}: foto ${k + 1}`} fill unoptimized sizes="100vw" className={`object-contain p-3 pb-16 transition-[opacity,transform] duration-700 md:p-8 md:pb-20 ${k === img ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`} />
          ))
        )}
        <div className="absolute left-4 top-4 md:hidden">
          <BackPill onClick={close} />
        </div>
        {!playing && (
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
            <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 hover:bg-paper hover:text-ink" aria-label="Foto anterior">
              ←
            </button>
            <span className="w-16 text-center text-[0.85rem] tabular-nums text-paper/80">
              {img + 1} / {p.images.length}
            </span>
            <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 hover:bg-paper hover:text-ink" aria-label="Próxima foto">
              →
            </button>
          </div>
        )}
      </div>
      <aside className="flex flex-col border-paper/10 p-6 md:overflow-y-auto md:border-l md:p-8">
        <div className="hidden items-center justify-between md:flex">
          <BackPill onClick={close} />
          <span className="text-[0.8rem] text-paper/60">Esc fecha · ← → trocam</span>
        </div>
        <p className="mt-2 text-[0.85rem] text-paper/65 md:mt-8">
          {p.kind} · {p.year}
        </p>
        <h3 className="mt-1 text-[2rem] font-medium leading-tight tracking-[-0.03em]">{p.title}</h3>
        <p className="mt-5 leading-relaxed text-paper/85">{p.text}</p>
        {p.credit && <p className="mt-4 text-[0.85rem] text-paper/60">{p.credit}</p>}
        {p.video && (
          <button type="button" onClick={() => setPlaying((v) => !v)} className="mt-6 self-start rounded-full bg-paper px-5 py-2.5 text-[0.9rem] font-medium text-ink transition-colors hover:bg-sand">
            {playing ? "Ver as fotos" : "▶ Assistir ao vídeo"}
          </button>
        )}
        <div className="mt-8 grid grid-cols-4 gap-2 md:mt-auto md:pt-8">
          {p.images.map((src, k) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setPlaying(false);
                setImg(k);
              }}
              className={`relative aspect-square overflow-hidden rounded-lg transition-opacity ${k === img && !playing ? "opacity-100 ring-2 ring-paper" : "opacity-45 hover:opacity-90"}`}
              aria-label={`Ver foto ${k + 1}`}
            >
              <Image src={asset(src)} alt="" fill quality={70} sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setIndex((index - 1 + projects.length) % projects.length)} className="rounded-full border border-paper/20 py-2.5 text-[0.9rem] hover:bg-paper hover:text-ink">
            ← Anterior
          </button>
          <button type="button" onClick={() => setIndex((index + 1) % projects.length)} className="rounded-full border border-paper/20 py-2.5 text-[0.9rem] hover:bg-paper hover:text-ink">
            Próximo →
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ---------- do 3D à obra pronta: comparador arrastável (os ângulos são parecidos) ---------- */
export function RenderCompare() {
  const [pair, setPair] = useState(0);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const [ref, v] = useInView<HTMLDivElement>(0.4);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pr = renderPairs[pair];

  // ao aparecer, a linha passeia sozinha para mostrar que dá para arrastar
  useEffect(() => {
    if (!v || touched || reduced()) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = (t - t0) / 1000;
      setPos(50 + Math.sin(k * 1.4) * 32 * Math.max(0, 1 - k / 6));
      if (k < 6) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, touched, pair]);

  const set = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div ref={ref} className="mt-12 grid gap-8 md:grid-cols-[1fr_20rem] md:items-end">
      <div
        ref={box}
        className="relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] bg-line md:aspect-[16/11]"
        data-cursor="Arraste"
        onPointerDown={(e) => {
          dragging.current = true;
          setTouched(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          set(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && set(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image key={pr.real} src={asset(pr.real)} alt={`${pr.title}: obra pronta`} fill quality={90} sizes="(min-width: 768px) 820px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image key={pr.render} src={asset(pr.render)} alt={`${pr.title}: imagem 3D do projeto`} fill quality={90} sizes="(min-width: 768px) 820px, 100vw" className="object-cover" />
        </div>
        <div className="absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-xl">⟷</span>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-[0.8rem] text-paper backdrop-blur">Projeto 3D · {pr.renderYear}</span>
        <span className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.8rem] text-ink backdrop-blur">Obra pronta · {pr.realYear}</span>
      </div>
      <div>
        <div className="flex flex-col gap-2" role="tablist" aria-label="Escolher ambiente">
          {renderPairs.map((r, i) => (
            <button
              key={r.title}
              type="button"
              role="tab"
              aria-selected={pair === i}
              onClick={() => {
                setPair(i);
                setTouched(false);
              }}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 text-left transition-colors ${pair === i ? "bg-ink text-paper" : "bg-card hover:bg-line"}`}
            >
              <span className="text-[1.1rem] font-medium tracking-[-0.02em]">{r.title}</span>
              <span className="text-[0.8rem] opacity-70">
                {r.renderYear} → {r.realYear}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-5 text-[0.85rem] text-muted">{pr.credit}</p>
      </div>
    </div>
  );
}

/* ---------- processo: seção presa à rolagem; as fotos formam uma pilha 3D que vira a cada etapa ---------- */
export function Process() {
  const [ref, p] = useStickyProgress<HTMLDivElement>();
  const n = steps.length;
  const cur = Math.min(n - 1, Math.floor(p * n));
  return (
    <div ref={ref} className="relative" style={{ height: `${n * 85 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className={`${wrap} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="order-2 md:order-1">
            <p className="text-[0.85rem] font-medium uppercase tracking-[0.14em] text-accent">Processo</p>
            <h2 className="t-h2 mt-3">Do primeiro encontro à casa pronta.</h2>
            <div className="relative mt-8 h-[13rem] md:h-[12rem]">
              {steps.map((s, i) => (
                <div key={s.title} className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: i === cur ? 1 : 0, transform: i === cur ? "none" : `translateY(${i < cur ? -24 : 24}px)` }} aria-hidden={i !== cur}>
                  <p className="text-[0.9rem] tabular-nums text-muted">Etapa {i + 1} de {n}</p>
                  <h3 className="mt-1 text-[clamp(1.6rem,2.8vw,2.3rem)] font-medium tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-3 max-w-[30rem] leading-relaxed text-muted">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.title} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <span className="block h-full origin-left bg-accent transition-transform duration-300" style={{ transform: `scaleX(${Math.min(1, Math.max(0, p * n - i))})` }} />
                </span>
              ))}
            </div>
          </div>
          <div className="order-1 mx-auto aspect-[4/5] w-[min(78vw,26rem)] [perspective:1400px] md:order-2 md:w-full md:max-w-[30rem]">
            <div className="relative h-full w-full [transform-style:preserve-3d]">
              {steps.map((s, i) => {
                const d = i - cur; // >0: ainda na pilha; <0: já virou
                const style: React.CSSProperties =
                  d < 0
                    ? { transform: "translate3d(-8%, -120%, 0) rotateX(55deg) rotateZ(-8deg)", opacity: 0 }
                    : { transform: `translate3d(${d * 5}%, ${d * -5}%, ${-d * 90}px) rotateZ(${d * 3}deg)`, opacity: d > 2 ? 0 : 1 - d * 0.18, zIndex: n - d };
                return (
                  <div key={s.title} className="absolute inset-0 overflow-hidden rounded-[26px] shadow-[0_30px_60px_-25px_rgba(31,26,21,0.55)] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={style}>
                    <Image src={asset(s.img)} alt={s.alt} fill quality={90} sizes="(min-width: 768px) 480px, 78vw" className="object-cover" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.8rem] font-medium">{String(i + 1).padStart(2, "0")} · {s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- vídeo que toca quando aparece (sem som) ---------- */
export function AutoVideo({ slug, className = "" }: { slug: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={asset(`/video/${slug}-preview.mp4`)} poster={asset(`/video/${slug}.webp`)} muted loop playsInline preload="none" className={className} />;
}

/* ---------- cubo 3D de detalhes: gira sozinho e pode ser arrastado ---------- */
export function DetailCube() {
  const cube = useRef<HTMLDivElement>(null);
  const [face, setFace] = useState(0);
  useEffect(() => {
    let lastFace = 0;
    let rx = -14, ry = 28, vx = 0, vy = reduced() ? 0 : 0.18, drag = false, lx = 0, ly = 0, raf = 0;
    const el = cube.current?.parentElement;
    if (!el) return;
    const down = (e: PointerEvent) => {
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      vy = (e.clientX - lx) * 0.35;
      vx = -(e.clientY - ly) * 0.35;
      lx = e.clientX;
      ly = e.clientY;
    };
    const up = () => (drag = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    const tick = () => {
      if (!drag) {
        vy += ((reduced() ? 0 : 0.18) - vy) * 0.03;
        vx += (0 - vx) * 0.05;
        rx += (-14 - rx) * 0.01;
      }
      rx = Math.max(-60, Math.min(60, rx + vx));
      ry += vy;
      if (cube.current) cube.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      // face voltada para a frente (para a legenda)
      const a = ((-ry % 360) + 360) % 360;
      const f = Math.round(a / 90) % 4;
      if (f !== lastFace) setFace((lastFace = f));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);
  const faces = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[min(80vw,24rem)] w-full cursor-grab touch-pan-y items-center justify-center [perspective:1100px] active:cursor-grabbing" data-cursor="Arraste">
        <div ref={cube} className="relative h-[min(52vw,15rem)] w-[min(52vw,15rem)] [transform-style:preserve-3d]">
          {details.map((d, i) => (
            <div key={d.src} className="absolute inset-0 overflow-hidden rounded-[18px] border border-paper/20 [backface-visibility:hidden]" style={{ transform: `${faces[i]} translateZ(calc(min(52vw,15rem)/2))` }}>
              <Image src={asset(d.src)} alt={d.alt} fill quality={85} sizes="260px" className="pointer-events-none object-cover" draggable={false} />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 min-h-[1.5em] text-center text-[0.9rem] opacity-75">{details[face].alt}</p>
    </div>
  );
}

/* ---------- vídeos: trilho arrastável, prévia ao passar o mouse (ou ao aparecer no celular) e vídeo completo com som ---------- */
export function Reels() {
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const scrollBy = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.7, behavior: "smooth" });
  return (
    <>
      <div className="mt-10 flex items-center justify-between gap-4">
        <p className="text-[0.95rem] text-muted">Arraste para o lado ou use as setas.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:bg-ink hover:text-paper" aria-label="Vídeos anteriores">
            ←
          </button>
          <button type="button" onClick={() => scrollBy(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:bg-ink hover:text-paper" aria-label="Próximos vídeos">
            →
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="no-scrollbar mt-6 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 active:cursor-grabbing md:snap-none"
        data-cursor="Arraste"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { on: true, x: e.clientX, left: track.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          if (!drag.current.on) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 5) drag.current.moved = true;
          track.current!.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => setTimeout(() => (drag.current.on = false))}
        onPointerLeave={() => (drag.current.on = false)}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.stopPropagation();
            e.preventDefault();
            drag.current.moved = false;
          }
        }}
      >
        {videos.map((v, i) => (
          <ReelCard key={v.slug} v={v} onOpen={() => setOpen(i)} />
        ))}
      </div>
      {open !== null && <ReelModal index={open} setIndex={setOpen} />}
    </>
  );
}

function ReelCard({ v, onOpen }: { v: (typeof videos)[number]; onOpen: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const tilt = useRef<HTMLButtonElement>(null);
  // no celular (sem hover) a prévia toca quando o cartão aparece
  useEffect(() => {
    const el = vid.current;
    if (!el || window.matchMedia("(hover: hover)").matches || reduced()) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <button
      ref={tilt}
      type="button"
      onClick={onOpen}
      data-cursor="Assistir"
      className="group relative aspect-[9/16] w-[62vw] shrink-0 snap-start overflow-hidden rounded-[22px] bg-night text-left text-paper transition-transform duration-500 ease-out sm:w-[15rem]"
      onMouseEnter={() => vid.current?.play().catch(() => {})}
      onMouseLeave={() => {
        vid.current?.pause();
        if (tilt.current) tilt.current.style.transform = "";
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !tilt.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.current.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      }}
    >
      <video ref={vid} src={asset(`/video/${v.slug}-preview.mp4`)} poster={asset(`/video/${v.slug}.webp`)} muted loop playsInline preload="none" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(27,22,18,0.85)_0%,rgba(27,22,18,0)_50%)]" />
      <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-[0.8rem] text-ink transition-transform duration-500 group-hover:scale-110">▶</span>
      <span className="absolute inset-x-4 bottom-4">
        <span className="block text-[1.05rem] font-medium leading-tight">{v.title}</span>
        <span className="mt-0.5 block text-[0.85rem] text-paper/80">{v.sub}</span>
      </span>
    </button>
  );
}

function ReelModal({ index, setIndex }: { index: number; setIndex: (v: number | null) => void }) {
  const v = videos[index];
  const close = useCallback(() => setIndex(null), [setIndex]);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((index + 1) % videos.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + videos.length) % videos.length);
    },
    [index, setIndex],
  );
  useLayer(true, close, keys);
  return (
    <div className="fixed inset-0 z-[70] flex animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-center bg-night/95 p-4 text-paper backdrop-blur" role="dialog" aria-modal="true" aria-label={v.title}>
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <BackPill onClick={close} />
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setIndex((index - 1 + videos.length) % videos.length)} className="hidden h-12 w-12 items-center justify-center rounded-full border border-paper/25 hover:bg-paper hover:text-ink md:flex" aria-label="Vídeo anterior">
          ←
        </button>
        <div className="w-[min(88vw,calc(82svh*9/16))]">
          <video key={v.slug} src={asset(`/video/${v.slug}.mp4`)} poster={asset(`/video/${v.slug}.webp`)} controls autoPlay playsInline className="aspect-[9/16] w-full rounded-[20px] bg-black object-cover" />
          <p className="mt-3 text-center">
            <span className="font-medium">{v.title}</span> <span className="text-paper/70">· {v.sub}</span>
          </p>
        </div>
        <button type="button" onClick={() => setIndex((index + 1) % videos.length)} className="hidden h-12 w-12 items-center justify-center rounded-full border border-paper/25 hover:bg-paper hover:text-ink md:flex" aria-label="Próximo vídeo">
          →
        </button>
      </div>
    </div>
  );
}

/* ---------- depoimentos: carrossel com troca em cortina, arrastar e barra de tempo ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  useEffect(() => {
    if (paused || reduced()) return;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [i, paused, go]);
  const sx = useRef<number | null>(null);
  const t = testimonials[i];
  return (
    <div
      className="mx-auto mt-12 max-w-[60rem] touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (sx.current = e.clientX)}
      onPointerUp={(e) => {
        if (sx.current === null) return;
        const dx = e.clientX - sx.current;
        sx.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="grid items-center gap-8 rounded-[28px] bg-card p-5 md:grid-cols-[15rem_1fr] md:p-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] max-md:mx-auto max-md:w-40">
          {testimonials.map((x, k) => (
            <div key={k} className="absolute inset-0 transition-[clip-path] duration-1000 ease-[cubic-bezier(0.77,0,0.18,1)]" style={{ clipPath: k === i ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}>
              <Image src={asset(x.img)} alt="" fill quality={85} sizes="240px" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="min-h-[15rem] md:min-h-[13rem]">
          <span className="t-serif block text-[4rem] leading-[0.6] text-accent" aria-hidden>
            “
          </span>
          <blockquote key={i} className="mt-3 text-[clamp(1.25rem,2.2vw,1.65rem)] leading-snug tracking-[-0.02em]">
            {t.quote.split(" ").map((w, k) => (
              <span key={k} className="inline-block animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: `${k * 25}ms` }}>
                {w}&nbsp;
              </span>
            ))}
          </blockquote>
          <p className="mt-5 font-medium">{t.who}</p>
          <p className="text-[0.9rem] text-muted">
            {t.context} · Comentário no Instagram
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:bg-ink hover:text-paper" aria-label="Anterior">
          ←
        </button>
        <div className="flex flex-1 gap-1.5">
          {testimonials.map((_, k) => (
            <button key={k} type="button" onClick={() => setI(k)} className="h-6 flex-1" aria-label={`Comentário ${k + 1}`}>
              <span className="block h-[3px] overflow-hidden rounded-full bg-line">
                <span key={`${i}-${paused}`} className={`block h-full origin-left bg-accent ${k < i ? "scale-x-100" : k === i ? (paused ? "scale-x-50" : "animate-[fill_7s_linear_both]") : "scale-x-0"}`} />
              </span>
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:bg-ink hover:text-paper" aria-label="Próximo">
          →
        </button>
      </div>
    </div>
  );
}

/* ---------- perguntas: acordeão ---------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {faq.map((f, i) => (
        <div key={f.q}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={open === i}>
            <span className="text-[1.1rem] font-medium tracking-[-0.015em]">{f.q}</span>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open === i ? "rotate-45 border-accent bg-accent text-paper" : "border-line"}`} aria-hidden>
              +
            </span>
          </button>
          <div className={`grid transition-[grid-template-rows] duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <p className="overflow-hidden pr-12 leading-relaxed text-muted">
              <span className="block pb-6">{f.a}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- contato: o formulário monta o e-mail (sem backend) ---------- */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const types = ["Apartamento", "Casa", "Um ambiente", "Outro"];
  const [type, setType] = useState(types[0]);
  return (
    <form
      className="rounded-[28px] bg-card p-6 text-ink md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const body = [`Olá, Taissa! Meu nome é ${d.get("nome")}.`, `Projeto: ${type}${d.get("bairro") ? `, em ${d.get("bairro")}` : ""}.`, "", String(d.get("mensagem") || ""), "", `Contato: ${d.get("telefone") || "(sem telefone)"}`].join("\n");
        window.location.href = mailLink(`Novo projeto: ${type}`, body);
        setSent(true);
      }}
    >
      <p className="text-[1.4rem] font-medium tracking-[-0.025em]">Conte o que você imagina</p>
      <p className="mt-1 text-[0.95rem] text-muted">O formulário abre o seu e-mail com a mensagem pronta para a Taissa.</p>
      <fieldset className="mt-6">
        <legend className="text-[0.85rem] font-medium">Tipo de projeto</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {types.map((t) => (
            <button key={t} type="button" onClick={() => setType(t)} aria-pressed={type === t} className={`rounded-full px-4 py-2 text-[0.9rem] transition-colors ${type === t ? "bg-ink text-paper" : "bg-paper hover:bg-line"}`}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.85rem] font-medium">Nome</span>
          <input name="nome" required className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-accent" />
        </label>
        <label className="block">
          <span className="text-[0.85rem] font-medium">Telefone ou WhatsApp</span>
          <input name="telefone" inputMode="tel" className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-accent" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[0.85rem] font-medium">Bairro ou cidade do imóvel</span>
          <input name="bairro" className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-accent" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[0.85rem] font-medium">Sobre o projeto</span>
          <textarea name="mensagem" rows={4} className="mt-1.5 w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-accent" placeholder="Ambientes, metragem, prazo, o que não pode faltar…" />
        </label>
      </div>
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-paper transition-colors hover:bg-ink">
        {sent ? "E-mail aberto ✓ (envie por lá)" : "Enviar por e-mail"}
      </button>
      <a href={studio.dm} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 text-[0.9rem] text-muted transition-colors hover:text-ink">
        <IconInstagram className="h-4 w-4" /> Prefere direct? Fale pelo Instagram
      </a>
    </form>
  );
}

/* ---------- nome gigante no rodapé: letras sobem ao aparecer e viram serifa no hover ---------- */
export function FooterName() {
  const [ref, v] = useInView<HTMLDivElement>(0.3);
  const word = "Taissa Santos";
  return (
    <div ref={ref} className="flex justify-center overflow-hidden whitespace-nowrap text-[clamp(2.6rem,12.4vw,9.6rem)] font-medium leading-[1] tracking-[-0.05em]" aria-label={word}>
      {word.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden>
          <span
            className="inline-block transition-[transform,font-style,color] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:t-serif hover:text-sand"
            style={{ transform: v ? "none" : "translateY(105%)", transitionDelay: `${i * 45}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        </span>
      ))}
    </div>
  );
}
