/*
  Todo o conteúdo do site. Fonte: Instagram @taissasantosarquitetura (bio, legendas e comentários dos posts).
  A Taissa não tem ficha no Google Maps nem site no ar (o domínio do e-mail não responde), então não há avaliações do Google.
*/

export const studio = {
  name: "Taissa Santos",
  full: "Taissa Santos Arquitetura",
  role: "Arquitetura de interiores",
  email: "contato@taissasantosarq.com.br",
  instagram: "https://www.instagram.com/taissasantosarquitetura/",
  handle: "@taissasantosarquitetura",
  dm: "https://ig.me/m/taissasantosarquitetura",
  address: "Ed. The Prime Tamandaré Office, sala 707",
  district: "Setor Oeste, Goiânia (GO)",
  maps: "https://www.google.com/maps/search/?api=1&query=Ed.+The+Prime+Tamand%C3%A1re+Office+Goi%C3%A2nia",
  followers: "11,2 mil",
};

/** Monta o e-mail pronto (o site não tem backend). */
export function mailLink(subject: string, body: string) {
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#casacor", label: "CASACOR" },
  { href: "#contato", label: "Contato" },
];

/** Fotos do anel 3D do topo (recortes 4:5 em /img/3d). */
export const ringPhotos = Array.from({ length: 14 }, (_, i) => `/img/3d/p${i}.webp`);

export const heroStats = [
  { value: "2025", label: "CASACOR Goiás, ambiente Infinitude dos Milagres" },
  { value: "3×", label: "premiada como destaque de talento e influência (2020, 2021 e 2022)" },
  { value: "11,2 mil", label: "pessoas acompanham os projetos no Instagram" },
];

/** Fornecedores e parceiros citados nas legendas dos projetos. */
export const partners = [
  "Studio Móveis",
  "Cena Iluminação",
  "Monet Acabamentos",
  "Lab Decor Metais",
  "Marmorarte",
  "Summer Conceito",
  "Arraial Brasil",
  "Multipedras",
  "Casa Mais Planejados",
  "Paulete Armários",
];

export const services = [
  {
    title: "Interiores residenciais",
    text: "Apartamentos e casas pensados por inteiro: living, cozinha, suítes, closets, lavabos e varandas conversando entre si, com marcenaria e iluminação desenhadas para quem vai morar ali.",
    img: "/img/historias-0.webp",
    alt: "Living com sofá curvo, cortinas e mesa de centro em madeira",
  },
  {
    title: "Quartos infantis e de bebê",
    text: "Quartinhos neutros, com silêncio visual, ou cheios de universo, como o do pequeno explorador. Tudo pensado para crescer junto com a criança.",
    img: "/img/irmaos-0.webp",
    alt: "Quarto de irmãos com duas camas, nichos arredondados e iluminação embutida",
  },
  {
    title: "Marcenaria, pedra e luz",
    text: "Cristaleira com nicho de pedra, adega iluminada, painéis ripados e cuba de piso: os detalhes que organizam a casa e dão personalidade a cada ambiente.",
    img: "/img/historias-6.webp",
    alt: "Cristaleira em madeira com nicho de pedra, taças e decanter",
  },
  {
    title: "Mostras e ambientação",
    text: "Da CASACOR Goiás 2025 à produção de Natal nos apartamentos das clientes: ambientes montados para sentir, com texturas, flores e elementos naturais.",
    img: "/img/casacor-0.webp",
    alt: "Ambiente Infinitude dos Milagres na CASACOR Goiás 2025",
  },
];

export type Category = "Apartamentos" | "Casas" | "Mostras" | "Ambientes";

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  category: Category;
  text: string;
  images: string[];
  credit?: string;
  video?: string;
};

const imgs = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/img/${slug}-${i}.webp`);

export const projects: Project[] = [
  {
    slug: "casacor",
    title: "Infinitude dos Milagres",
    year: "2025",
    kind: "CASACOR Goiás",
    category: "Mostras",
    text: "Um convite à calma, ao toque, ao sentir. Texturas, elementos naturais e aconchego se unem para criar um espaço onde a conexão acontece: no olhar, no silêncio e no essencial.",
    images: imgs("casacor", 5),
    credit: "Fotografia @igorcarvalhofotografia",
    video: "casacor",
  },
  {
    slug: "vg",
    title: "Apartamento V|G",
    year: "2025",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Jantar para receber, cozinha com ilha e um lavabo com torneira de teto, cuba de piso e a leveza da pedra natural. O projeto nasceu em 3D e hoje está fotografado, pronto e vivido.",
    images: imgs("vg", 9),
    credit: "Fotografia @eiigouveia",
  },
  {
    slug: "ao",
    title: "Apartamento A|O",
    year: "2024",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Um segundo apartamento para clientes que voltaram. Painel em MDF com porta mimetizada, cozinha em grafite com pedra clara e uma sala de jantar aberta para a vista.",
    images: imgs("ao", 6),
    credit: "Fotografia @igorcarvalhofotografia",
  },
  {
    slug: "historias",
    title: "Ambientes que contam histórias",
    year: "2025",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Aconchego, texturas e cores. Uma cristaleira marcada por um nicho de pedra, junção entre funcionalidade e elegância: beleza que organiza.",
    images: imgs("historias", 8),
    credit: "Fotografia @eiigouveia",
  },
  {
    slug: "jl",
    title: "Apartamento J|L",
    year: "2026",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Entre o lar e o horizonte, uma vista. Travertino, madeira, couro e luz baixa: um apartamento feito de texturas e contrastes.",
    images: imgs("jl", 6),
    video: "jl",
  },
  {
    slug: "jb",
    title: "Penthouse J|B",
    year: "2024",
    kind: "Cobertura",
    category: "Apartamentos",
    text: "Varanda aberta para a cidade, adega iluminada e um banho de suíte master com banheira. Uma cobertura pensada para receber.",
    images: imgs("jb", 8),
  },
  {
    slug: "bg",
    title: "Apartamento B|G",
    year: "2024",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Pé-direito duplo, parede de pedra e uma sala que se abre para o céu de Goiânia. Na suíte, a leveza dos tons claros.",
    images: imgs("bg", 6),
  },
  {
    slug: "unique",
    title: "Casa Unique",
    year: "2025",
    kind: "Casa",
    category: "Casas",
    text: "Suíte master em tons de areia, com cabeceira desenhada, poltronas orgânicas e madeira ripada envolvendo o ambiente.",
    images: imgs("unique", 3),
  },
  {
    slug: "app",
    title: "Apartamento AP|P",
    year: "2024",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Detalhes que demonstram aconchego e elegância. Uma suíte master com mármore, um closet amplo e sofisticado e um lavabo com espelho iluminado.",
    images: imgs("app", 9),
  },
  {
    slug: "anaville",
    title: "Residência Anaville",
    year: "2024",
    kind: "Casa",
    category: "Casas",
    text: "Sala clara com estante iluminada e uma varanda gourmet com teto de madeira, pronta para os fins de semana em família.",
    images: imgs("anaville", 4),
  },
  {
    slug: "lumina",
    title: "Casa Lumina",
    year: "2024",
    kind: "Casa",
    category: "Casas",
    text: "Área de lazer integrada à piscina, com deck de madeira, mesa de sinuca e brises que filtram a luz.",
    images: imgs("lumina", 2),
  },
  {
    slug: "ap",
    title: "Casa A|P",
    year: "2024",
    kind: "Casa",
    category: "Casas",
    text: "Um projeto atemporal, com uma paleta de tons neutros e detalhes sofisticados. Living amplo voltado para o jardim.",
    images: imgs("ap", 4),
  },
  {
    slug: "lg",
    title: "Apartamento L|G",
    year: "2024",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Um hall de entrada que é o cartão de visitas do lar, uma suíte master com a leveza dos detalhes e um living integrado.",
    images: imgs("lg", 5),
  },
  {
    slug: "mj",
    title: "Apartamento M|J",
    year: "2024",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Varanda gourmet com teto de madeira, estante iluminada e uma suíte com painel ripado e cabeceira estofada.",
    images: imgs("mj", 5),
  },
  {
    slug: "casajl",
    title: "Casa J|L",
    year: "2024",
    kind: "Casa",
    category: "Casas",
    text: "Leveza, fluidez e um design orgânico definem o living. Na suíte do Felipe, a cama sobe para o mezanino e libera o chão para brincar.",
    images: imgs("casajl", 4),
  },
  {
    slug: "irmaos",
    title: "Quarto dos irmãos",
    year: "2025",
    kind: "Quarto infantil",
    category: "Ambientes",
    text: "Onde a bagunça vira memória e o amor se multiplica por dois. Camas gêmeas, nichos arredondados e um corredor de armários iluminados.",
    images: imgs("irmaos", 2),
  },
  {
    slug: "jh",
    title: "Apartamento J|H",
    year: "2025",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "A ambientação certa transforma: uma varanda vira refúgio. Adega, painel ripado e vista para a cidade.",
    images: imgs("jh", 2),
    video: "jh",
  },
  {
    slug: "ana",
    title: "Apartamento Ana",
    year: "2024",
    kind: "Apartamento",
    category: "Apartamentos",
    text: "Ambientes pequenos e integrados possibilitam um maior aproveitamento do espaço.",
    images: imgs("ana", 2),
  },
];

export const categories: ("Todos" | Category)[] = ["Todos", "Apartamentos", "Casas", "Mostras", "Ambientes"];

/** Mesmo ambiente: a imagem 3D apresentada à cliente e a foto da obra pronta. */
export const renderPairs = [
  {
    title: "Cozinha A|O",
    render: "/img/ao-render-0.webp",
    real: "/img/ao-2.webp",
    renderYear: "2022",
    realYear: "2024",
    credit: "3D @triestudio · Foto @igorcarvalhofotografia",
  },
  {
    title: "Lavabo V|G",
    render: "/img/vg-render-1.webp",
    real: "/img/vg-7.webp",
    renderYear: "2023",
    realYear: "2025",
    credit: "3D @triestudio · Foto @eiigouveia",
  },
  {
    title: "Jantar V|G",
    render: "/img/vg-render-0.webp",
    real: "/img/vg-0.webp",
    renderYear: "2023",
    realYear: "2024",
    credit: "3D @triestudio · Foto @eiigouveia",
  },
];

export const steps = [
  {
    title: "Escuta",
    text: "O lar carrega a identidade de quem vive ali. Antes de qualquer traço, a conversa é sobre a rotina, os hábitos e o jeito que a família quer se sentir em casa.",
    img: "/img/taissa-3.webp",
    alt: "Taissa Santos na cozinha do ambiente da CASACOR",
  },
  {
    title: "Projeto em 3D",
    text: "Cada ambiente é apresentado em imagens 3D. Dá para ver a casa pronta, ajustar e escolher com segurança antes de começar a obra.",
    img: "/img/ao-render-0.webp",
    alt: "Imagem 3D da cozinha do Apartamento A|O",
  },
  {
    title: "Materiais e detalhes",
    text: "Pedras, madeiras, metais e tecidos escolhidos de perto, com os fornecedores. É aqui que entram a marcenaria, a iluminação e os acabamentos.",
    img: "/img/detalhes-9.webp",
    alt: "Mão sobre amostras de pedra e texturas na mesa de materiais",
  },
  {
    title: "Obra e ambientação",
    text: "Arquiteta na obra: visitas para conferir cada etapa com a equipe de execução, até a produção final, com flores, adornos e a casa pronta para ser vivida.",
    img: "/img/taissa-1.webp",
    alt: "Taissa Santos em visita de obra, diante de um painel de madeira",
  },
];

export const videos = [
  { slug: "casacor", title: "CASACOR Goiás 2025", sub: "Infinitude dos Milagres" },
  { slug: "casa-arquiteta", title: "A casa da arquiteta", sub: "O apartamento da Taissa" },
  { slug: "trya", title: "Apartamento Trya", sub: "Uma casa com propósito" },
  { slug: "quartinho", title: "Quartinho neutro", sub: "Do jeitinho que a mamãe pediu" },
  { slug: "me", title: "Apartamento M|E", sub: "Traduzir pessoas em espaços" },
  { slug: "jl", title: "Apartamento J|L", sub: "Entre o lar e o horizonte" },
  { slug: "jh", title: "Apartamento J|H", sub: "Living e varanda" },
  { slug: "explorador", title: "Pequeno explorador", sub: "Quarto infantil" },
  { slug: "closet-trya", title: "Closet e banho master", sub: "Apartamento Trya" },
  { slug: "cozinha-me", title: "Cozinha M|E", sub: "Apartamento M|E" },
];

/** Comentários reais deixados nos posts (o perfil não tem avaliações no Google). */
export const testimonials = [
  {
    quote: "Minha arquiteta linda, talentosa, dedicada, com bom gosto único! Você é gigante e todos os seus projetos são lindos, mas esse é muito especial!! Obrigada por tanto!",
    who: "@lumavaladao",
    context: "Cliente da Casa L|B",
    img: "/img/lb-0.webp",
  },
  {
    quote: "Nosso lugar de paz. 🤍",
    who: "@malugalvao",
    context: "No post do quartinho neutro",
    img: "/video/quartinho.webp",
  },
  {
    quote: "Quanta perfeição… Muitos detalhes fazendo a diferença em seu projeto.",
    who: "Lab Decor Metais",
    context: "Fornecedor do Apartamento Trya",
    img: "/img/trya-0.webp",
  },
  {
    quote: "Sempre perfeito!!! Que olhar sensível 🥰",
    who: "@brunakethelyn",
    context: "No post do quartinho neutro",
    img: "/video/quartinho.webp",
  },
  {
    quote: "Taissa, ficou maravilhoso o projeto 😍",
    who: "Arraial Brasil",
    context: "Parceiro de adornos do Apartamento Trya",
    img: "/video/trya.webp",
  },
  {
    quote: "Sensibilidade e bom gosto na medida certa ✨",
    who: "@ribas.og",
    context: "No post do quartinho neutro",
    img: "/video/quartinho.webp",
  },
];

export const details = [
  { src: "/img/detalhes-0.webp", alt: "Arandela de madeira sobre parede iluminada" },
  { src: "/img/detalhes-6.webp", alt: "Poltrona de tecido texturizado ao lado de mesa de madeira" },
  { src: "/img/detalhes-7.webp", alt: "Travertino encontrando a madeira" },
  { src: "/img/detalhes-3.webp", alt: "Torneira escura sobre parede de travertino" },
  { src: "/img/detalhes-2.webp", alt: "Piso de pedra em cacos" },
  { src: "/img/jl-5.webp", alt: "Travertino e prateleiras metálicas da adega" },
];

export const faq = [
  {
    q: "Onde fica o escritório?",
    a: "No Ed. The Prime Tamandaré Office, sala 707, no Setor Oeste, em Goiânia (GO).",
  },
  {
    q: "Que tipos de projeto a Taissa faz?",
    a: "Arquitetura de interiores para apartamentos e casas: living, cozinha, suítes, closets, lavabos, varandas, home office e quartos infantis e de bebê. Ela também assina ambientes de mostras, como a CASACOR Goiás 2025.",
  },
  {
    q: "Consigo ver o projeto antes da obra?",
    a: "Sim. Os ambientes são apresentados em imagens 3D. Na seção “Do 3D à obra pronta” dá para comparar o que foi apresentado com o resultado fotografado.",
  },
  {
    q: "A arquiteta vai até a obra?",
    a: "Vai. As visitas de obra fazem parte do trabalho, junto da equipe de execução e dos fornecedores de marcenaria, iluminação, pedras e metais.",
  },
  {
    q: "Vocês indicam fornecedores?",
    a: "Sim. Os projetos são feitos com parceiros de confiança em Goiânia, de móveis e marcenaria a iluminação, acabamentos e adornos.",
  },
  {
    q: "Como peço um orçamento?",
    a: "Pelo formulário no fim da página (ele monta o e-mail para você), pelo e-mail contato@taissasantosarq.com.br ou por direct no Instagram.",
  },
];
