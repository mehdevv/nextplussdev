export type FeaturedProject = {
  id: string
  title: string
  titleFr?: string
  description: string
  descriptionFr?: string
  category: string
  categoryFr?: string
  demoUrl: string
  image: string
  techs: string[]
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "aem-consulting",
    title: "AEM Consulting",
    titleFr: "AEM Consulting",
    description: "Professional consulting website with service presentation and client-focused business solutions.",
    descriptionFr: "Site de conseil professionnel avec présentation des services et solutions orientées client.",
    category: "Consulting",
    categoryFr: "Conseil",
    demoUrl: "https://aemconsulting.vercel.app/",
    image: "/projects/aem-consulting.png",
    techs: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    id: "scale-crm",
    title: "Scale CRM",
    titleFr: "Scale CRM",
    description: "CRM platform with authentication, dashboards, and workflow tools for sales teams.",
    descriptionFr: "Plateforme CRM avec authentification, tableaux de bord et outils pour équipes commerciales.",
    category: "SaaS",
    categoryFr: "SaaS",
    demoUrl: "https://scalecrm.vercel.app/login",
    image: "/projects/scale-crm.png",
    techs: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "visa-center",
    title: "Visa Center",
    titleFr: "Visa Center",
    description: "Landing page for visa services with clear CTAs, service highlights, and modern UI.",
    descriptionFr: "Page d'atterrissage pour services visa avec CTA, offres et interface moderne.",
    category: "Landing Page",
    categoryFr: "Landing Page",
    demoUrl: "https://visacenter-landing-page.vercel.app/",
    image: "/projects/visa-center.png",
    techs: ["Next.js", "Tailwind CSS"],
  },
  {
    id: "petro-west",
    title: "Petro West",
    titleFr: "Petro West",
    description: "Corporate web presence for an energy-sector brand with product and company storytelling.",
    descriptionFr: "Présence web corporate pour une marque énergétique avec storytelling produit et entreprise.",
    category: "Corporate",
    categoryFr: "Corporate",
    demoUrl: "https://petrowest.vercel.app/",
    image: "/projects/petro-west.png",
    techs: ["React", "Tailwind CSS"],
  },
  {
    id: "packmad",
    title: "Packmad",
    titleFr: "Packmad",
    description: "E-commerce style showcase for packaging products with catalog-style browsing.",
    descriptionFr: "Vitrine e-commerce pour produits d'emballage avec navigation type catalogue.",
    category: "E-commerce",
    categoryFr: "E-commerce",
    demoUrl: "https://packmadfgdfgdfg.vercel.app/",
    image: "/projects/packmad.png",
    techs: ["Next.js", "React", "Supabase"],
  },
]
