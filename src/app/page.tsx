import Image from "next/image";
import { Cursor, InkSection, RevealImage, SmoothScroll, Split, VelocityMarquee } from "@/components/FX";
import { IconInstagram } from "@/components/Icons";
import { BackButton } from "@/components/Nav";
import { Counter, Reveal } from "@/components/Reveal";
import { AutoVideo, ContactForm, DetailCube, Faq, FooterName, Header, Hero, HeroStatsMobile, Pill, Process, Projects, Reels, RenderCompare, Services, Testimonials } from "@/components/Site";
import { asset } from "@/lib/base-path";
import { nav, partners, studio } from "@/lib/data";
import { wrap } from "@/lib/ui";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <BackButton />
      <Header />
      <main>
        <Hero />
        <HeroStatsMobile />

        {/* Parceiros (como a faixa de logos do Vxora) */}
        <section className="pt-16 md:pt-24" aria-label="Parceiros">
          <p className={`${wrap} text-center text-[0.95rem] text-muted`}>Fornecedores e parceiros que assinam as obras junto com a Taissa</p>
          <div className="mx-auto mt-6 max-w-[calc(1160px+4rem)] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <VelocityMarquee items={partners} />
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" data-title="Sobre" className="py-24 md:py-32">
          <div className={`${wrap} grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16`}>
            <div className="relative">
              <RevealImage className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image src={asset("/img/taissa-0.webp")} alt="Retrato da arquiteta Taissa Santos" fill unoptimized sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
              </RevealImage>
              <Reveal delay={300} className="absolute -bottom-6 right-4 w-[46%] md:-right-8">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border-[6px] border-paper shadow-xl">
                  <Image src={asset("/img/taissa-1.webp")} alt="Taissa Santos em visita de obra" fill quality={90} sizes="240px" className="object-cover" />
                </div>
              </Reveal>
            </div>
            <div className="md:pt-4">
              <p className="eyebrow">Sobre a Taissa</p>
              <Split text="Projetar sonhos, dar vida a formas e transformar cada detalhe em *lar.*" className="t-h2 mt-4" />
              <div className="mt-7 space-y-4 text-[1.05rem] leading-relaxed text-muted">
                <p>Taissa Santos é arquiteta em Goiânia e assina projetos de interiores de apartamentos e casas. O escritório fica no Setor Oeste, com uma equipe de mulheres que ela mesma define como admiráveis e talentosas.</p>
                <p>Em cada casa, o ponto de partida é quem vai morar ali. A arquitetura, para ela, é uma expressão de valores: um convite à calma, ao toque e ao sentir, com texturas, elementos naturais e aconchego.</p>
              </div>
              <blockquote className="mt-8 border-l-2 border-accent pl-5 text-[1.15rem] leading-snug">
                <span className="t-serif text-[1.35rem]">“Conte comigo para fazer do seu sonho uma realidade e do seu projeto um lugar com propósito.”</span>
                <footer className="mt-2 text-[0.9rem] text-muted">Taissa Santos</footer>
              </blockquote>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
                <div>
                  <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em]">
                    2025
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-snug text-muted">ano da estreia na CASACOR Goiás</p>
                </div>
                <div>
                  <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em]">
                    <Counter value={3} />×
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-snug text-muted">premiada: destaque de talento e influência</p>
                </div>
                <div>
                  <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em]">
                    <Counter value={11.2} decimals={1} /> mil
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-snug text-muted">seguidores no Instagram</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" data-title="Serviços" className="rounded-t-[32px] bg-card py-24 md:rounded-t-[48px] md:py-32">
          <div className={wrap}>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow">Serviços</p>
                <Split text="Do primeiro traço ao *último* detalhe." className="t-h2 mt-4 max-w-[38rem]" />
              </div>
              <p className="max-w-[24rem] leading-relaxed text-muted">Interiores completos ou um ambiente só. Em todos, a mesma atenção à luz, ao material e ao jeito de viver de cada família.</p>
            </div>
            <Services />
          </div>
        </section>

        {/* Projetos */}
        <section id="projetos" data-title="Projetos" className="bg-card pb-24 md:pb-32">
          <div className={wrap}>
            <div className="grid gap-6 border-t border-line pt-20 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow">Projetos</p>
                <Split text="Alguns lares, cada um com a sua *história.*" className="t-h2 mt-4 max-w-[40rem]" />
              </div>
              <Pill href={studio.instagram} variant="outline" external>
                Mais no Instagram
              </Pill>
            </div>
            <Projects />
          </div>
        </section>

        {/* Do 3D à obra */}
        <section id="do-3d-a-obra" data-title="Do 3D à obra" className="py-24 md:py-32">
          <div className={wrap}>
            <div className="grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <p className="eyebrow">Do 3D à obra pronta</p>
                <Split text="O que foi apresentado é o que foi *entregue.*" className="t-h2 mt-4" />
              </div>
              <p className="max-w-[28rem] leading-relaxed text-muted md:justify-self-end">Arraste a linha para comparar a imagem 3D mostrada à cliente com a foto do ambiente pronto, anos depois.</p>
            </div>
            <RenderCompare />
          </div>
        </section>

        {/* Processo (preso à rolagem) */}
        <section id="processo" data-title="Processo" className="bg-paper">
          <Process />
        </section>

        {/* CASACOR (seção escura) */}
        <InkSection id="casacor" className="py-24 md:py-32">
          <div data-title="CASACOR" className={wrap}>
            <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:items-center md:gap-16">
              <div>
                <p className="eyebrow group-data-[dark=true]/ink:!text-sand">CASACOR Goiás 2025</p>
                <Split text="Infinitude dos *Milagres.*" className="t-h2 mt-4" />
                <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed opacity-85">
                  Um convite à calma, ao toque, ao sentir. Texturas, elementos naturais e aconchego se unem para criar um espaço onde a conexão acontece: no olhar, no silêncio e no essencial.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  {["/img/casacor-1.webp", "/img/casacor-3.webp"].map((src, i) => (
                    <RevealImage key={src} delay={i * 150} className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                      <Image src={asset(src)} alt="Ambiente Infinitude dos Milagres na CASACOR Goiás 2025" fill quality={90} sizes="(min-width: 768px) 320px, 50vw" className="object-cover" />
                    </RevealImage>
                  ))}
                </div>
                <p className="mt-4 text-[0.85rem] opacity-70">Fotografia @igorcarvalhofotografia · Vídeo @joaovictor.mov</p>
              </div>
              <div className="relative mx-auto w-full max-w-[24rem]">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-black shadow-2xl">
                  <AutoVideo slug="casacor" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="absolute -left-6 bottom-10 hidden h-28 w-28 items-center justify-center md:flex" aria-hidden>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_18s_linear_infinite]">
                    <defs>
                      <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                    </defs>
                    <text fontSize="9.5" letterSpacing="2.5" fill="currentColor">
                      <textPath href="#circ">CASACOR GOIÁS · 2025 · TAISSA SANTOS ·</textPath>
                    </text>
                  </svg>
                  <span className="t-serif text-[1.6rem] text-sand">TS</span>
                </div>
              </div>
            </div>

            <div className="mt-20 grid gap-8 border-t border-current/15 pt-12 md:grid-cols-[auto_1fr] md:gap-16">
              <p className="text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.05em]">
                2020<span className="t-serif text-sand">–</span>22
              </p>
              <div>
                <p className="text-[1.3rem] font-medium tracking-[-0.02em]">Premiada pelo destaque de talento e influência</p>
                <p className="mt-3 max-w-[38rem] leading-relaxed opacity-80">
                  Em janeiro de 2023, o escritório foi premiado pelo destaque de talento e influência nos anos de 2020, 2021 e 2022. “Uma premiação fruto de muito esforço, dedicação e amor”, escreveu a Taissa.
                </p>
              </div>
            </div>
            <div id="detalhes" data-title="Detalhes" className="mt-24 grid items-center gap-10 md:mt-32 md:grid-cols-2">
              <div>
                <p className="eyebrow group-data-[dark=true]/ink:!text-sand">Uma sequência de detalhes</p>
                <Split text="Encontro de *texturas.*" className="t-h2 mt-4" />
                <p className="mt-6 max-w-[28rem] leading-relaxed opacity-80">Travertino, madeira, pedra em cacos, metal escovado e tecidos com trama. Gire o cubo para ver de perto os materiais que aparecem nos projetos.</p>
              </div>
              <DetailCube />
            </div>
          </div>
        </InkSection>

        {/* Vídeos */}
        <section id="videos" data-title="Vídeos" className="overflow-hidden py-24 md:py-32">
          <div className={wrap}>
            <p className="eyebrow">Vídeos</p>
            <Split text="Entre e *sinta* cada ambiente." className="t-h2 mt-4 max-w-[36rem]" />
            <Reels />
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" data-title="Depoimentos" className="rounded-[32px] bg-card py-24 md:mx-3 md:rounded-[48px] md:py-32">
          <div className={wrap}>
            <div className="text-center">
              <p className="eyebrow">Quem viveu o projeto</p>
              <Split text="O melhor resultado se sente *todo dia.*" className="t-h2 mx-auto mt-4 max-w-[44rem]" />
              <p className="mx-auto mt-5 max-w-[34rem] text-muted">Comentários deixados por clientes e parceiros nos posts dos projetos.</p>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Perguntas */}
        <section id="perguntas" data-title="Perguntas" className="py-24 md:py-32">
          <div className={`${wrap} grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16`}>
            <div>
              <p className="eyebrow">Perguntas</p>
              <Split text="O que você talvez queira *saber.*" className="t-h2 mt-4" />
              <div className="mt-10 rounded-[24px] bg-ink p-6 text-paper">
                <p className="text-[1.15rem] font-medium">Ainda com dúvida?</p>
                <p className="mt-1 text-paper/75">Mande um e-mail ou um direct. A equipe responde por lá.</p>
                <div className="mt-5">
                  <Pill href="#contato" variant="light">
                    Falar com a Taissa
                  </Pill>
                </div>
              </div>
            </div>
            <Faq />
          </div>
        </section>

        {/* Contato */}
        <section id="contato" data-title="Contato" className="p-2 md:p-3">
          <div className="relative overflow-hidden rounded-[22px] bg-night py-20 text-paper md:rounded-[32px] md:py-28">
            <Image src={asset("/img/casacor-4.webp")} alt="" fill quality={80} sizes="100vw" className="object-cover opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_30%,rgba(27,22,18,0.4),#1b1612_80%)]" />
            <div className={`${wrap} relative grid gap-12 md:grid-cols-[1fr_1.05fr] md:gap-16`}>
              <div>
                <p className="eyebrow !text-sand">Contato</p>
                <Split text="O seu próximo lar começa com uma *conversa.*" className="t-h2 mt-4" />
                <p className="mt-6 max-w-[28rem] leading-relaxed text-paper/80">Conte o que você imagina. A Taissa ajuda a enxergar o que é possível e a definir o próximo passo.</p>
                <ul className="mt-10 space-y-5">
                  <li>
                    <p className="text-[0.8rem] uppercase tracking-[0.14em] text-paper/60">E-mail</p>
                    <a href={`mailto:${studio.email}`} className="text-[1.15rem] underline-offset-4 hover:underline">
                      {studio.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-[0.8rem] uppercase tracking-[0.14em] text-paper/60">Instagram</p>
                    <a href={studio.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[1.15rem] underline-offset-4 hover:underline">
                      <IconInstagram className="h-5 w-5" /> {studio.handle}
                    </a>
                  </li>
                  <li>
                    <p className="text-[0.8rem] uppercase tracking-[0.14em] text-paper/60">Escritório</p>
                    <a href={studio.maps} target="_blank" rel="noreferrer" className="text-[1.15rem] underline-offset-4 hover:underline">
                      {studio.address}
                      <br />
                      {studio.district}
                    </a>
                  </li>
                </ul>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="pb-8 pt-16">
        <div className={wrap}>
          <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="text-[1.3rem] font-medium tracking-[-0.02em]">
                Taissa Santos <span className="t-serif text-accent">arquitetura</span>
              </p>
              <p className="mt-2 max-w-[22rem] text-muted">Arquitetura de interiores em Goiânia, pensada a partir de quem vive em cada casa.</p>
            </div>
            <nav aria-label="Rodapé">
              <p className="text-[0.8rem] uppercase tracking-[0.14em] text-muted">Navegação</p>
              <ul className="mt-3 grid grid-cols-2 gap-y-1.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-accent">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.14em] text-muted">Contato</p>
              <a href={`mailto:${studio.email}`} className="mt-3 block hover:text-accent">
                {studio.email}
              </a>
              <a href={studio.instagram} target="_blank" rel="noreferrer" className="block hover:text-accent">
                {studio.handle}
              </a>
              <p className="mt-1 text-muted">{studio.district}</p>
            </div>
          </div>
          <div className="pt-8">
            <FooterName />
          </div>
          <div className="mt-6 flex flex-col justify-between gap-2 text-[0.85rem] text-muted md:flex-row">
            <p>© {new Date().getFullYear()} Taissa Santos Arquitetura</p>
            <p>Fotos: @igorcarvalhofotografia e @eiigouveia · Vídeos: @joaovictor.mov · Imagens 3D: @triestudio</p>
          </div>
        </div>
      </footer>
    </>
  );
}
