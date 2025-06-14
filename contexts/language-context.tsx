"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  mounted: boolean
}

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.packs": "Packs",
    "nav.contact": "Contact",

    // Hero
    "hero.typing": "web solutions with ",
    "hero.subtitle": "Full-stack web developer & E-commerce stores realizer",
    "hero.cta": "Explore My Work",

    // About
    "about.title": "About Me",
    "about.experience": "Years Experience",
    "about.projects": "Projects Completed",
    "about.clients": "Happy Clients",
    "about.location": "Algiers, Algeria",
    "about.available": "Available for work",
    "about.intro": "Hello, I'm",
    "about.name": "Mehdi Kernou",
    "about.description1":
      "a passionate web developer with expertise in creating gorgeous and functional websites and E-commerce shops.",
    "about.description2": "With experience in both",
    "about.skills": "front-end and back-end development",
    "about.description3": "I bring ideas to life through clean code and modern design principles.",
    "about.approach": "My approach combines",
    "about.values": "technical excellence with creative problem-solving and excellent communication",
    "about.commitment": "for client satisfaction, ensuring that every project not only meets but exceeds expectations.",
    "about.connect": "Let's Connect",

    // Services
    "services.title": "Services",
    "services.learnMore": "Learn More",
    "services.web.title": "Web Design & Landing Pages",
    "services.web.description":
      "Modern, responsive web design and high-converting landing pages that engage your audience.",
    "services.ecommerce.title": "Custom & Shopify Stores",
    "services.ecommerce.description":
      "Professional e-commerce solutions with custom design and Shopify integration for your business needs.",
    "services.cards.title": "Virtual Visit Cards",
    "services.cards.description":
      "Digital business cards that make a lasting impression and help you network effectively.",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.viewProject": "View Project",
    "portfolio.project1.title": "Adel Copywriter Portfolio",
    "portfolio.project1.description":
      "A comprehensive portfolio website showcasing professional copywriting services with modern Arabic design and user-friendly navigation.",
    "portfolio.project1.category": "Portfolio",
    "portfolio.project2.title": "Farid Abdeddaim Consulting",
    "portfolio.project2.description":
      "Professional consulting website with service presentation, client testimonials, and comprehensive business solutions.",
    "portfolio.project2.category": "Consulting",
    "portfolio.project3.title": "QR Virtual Visit Cards",
    "portfolio.project3.description":
      "Digital business card platform with QR code integration, contact management, and professional networking features.",
    "portfolio.project3.category": "Digital Cards",

    // Packs
    "packs.title": "Packs",
    "packs.viewPacks": "View Packs",
    "packs.selectPack": "Select Pack",
    "packs.popular": "Most Popular",
    "packs.pageTitle": "Choose Your Perfect Package",
    "packs.pageDescription":
      "Select the package that best fits your business needs and budget. All packages include professional design, development, and ongoing support.",
    "packs.backHome": "Back to Home",
    "packs.deliveryTime": "Delivery Time",
    "packs.revisions": "Revisions",
    "packs.support": "Support",
    "packs.customTitle": "Need Something Custom?",
    "packs.customDescription":
      "Every business is unique. Let's discuss a custom solution tailored specifically to your needs and requirements.",
    "packs.contactCustom": "Contact for Custom Quote",
    "packs.delivery.basic": "7-10 days",
    "packs.delivery.standard": "10-14 days",
    "packs.delivery.premium": "14-21 days",
    "packs.revisions.unlimited": "Unlimited",
    "packs.support.email": "Email Support",
    "packs.support.priority": "Priority Support",
    "packs.support.dedicated": "Dedicated Support",
    "packs.visibility.title": "Visibility Pack",
    "packs.visibility.subtitle": "Perfect for businesses looking to establish a strong online presence",
    "packs.visibility.feature1": "Professional branding integration",
    "packs.visibility.feature2": "Content forms with database",
    "packs.visibility.feature3": "User account management",
    "packs.visibility.feature4": "Advanced integration",
    "packs.visibility.feature5": "Inventory branding",
    "packs.visibility.feature6": "Report management",
    "packs.visibility.feature7": "Mobile responsive design",
    "packs.visibility.feature8": "Basic SEO optimization",
    "packs.management.title": "Management Pack",
    "packs.management.subtitle": "Perfect for businesses that need ongoing content management and regular updates",
    "packs.management.feature1": "Content Management System",
    "packs.management.feature2": "Regular Updates & Maintenance",
    "packs.management.feature3": "SEO Optimization",
    "packs.management.feature4": "Analytics & Reporting",
    "packs.management.feature5": "User Authentication",
    "packs.management.feature6": "Database Integration",
    "packs.management.feature7": "Advanced security features",
    "packs.management.feature8": "Performance optimization",
    "packs.innovative.title": "Innovative Systems Pack",
    "packs.innovative.subtitle": "Advanced solutions for businesses ready to leverage cutting-edge technology",
    "packs.innovative.feature1": "Advanced E-commerce Features",
    "packs.innovative.feature2": "AI-Powered Analytics",
    "packs.innovative.feature3": "Custom Integrations",
    "packs.innovative.feature4": "Advanced Security Systems",
    "packs.innovative.feature5": "Scalable Architecture",
    "packs.innovative.feature6": "24/7 Support",
    "packs.innovative.feature7": "Custom API development",
    "packs.innovative.feature8": "Advanced automation tools",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together",
    "contact.description": "Have a project in mind or need a custom solution? I'd love to hear from you.",
    "contact.intro":
      "Whether you need a complete website, e-commerce solution, or just want to discuss your ideas, I'm here to help bring your vision to life.",
    "contact.phone": "Phone",
    "contact.phoneDesc": "Call me directly for urgent inquiries",
    "contact.email": "Email",
    "contact.emailDesc": "Send me a detailed message",
    "contact.location": "Location",
    "contact.locationValue": "Algiers, Algeria",
    "contact.locationDesc": "Available for remote work worldwide",
    "contact.responseTime": "Quick Response",
    "contact.responseDesc": "I typically respond within 24 hours",
    "contact.formTitle": "Send me a message",
    "contact.formDescription": "Fill out the form below and I'll get back to you soon",
    "contact.name": "Full Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.successTitle": "Message Sent Successfully!",
    "contact.successMessage": "Thank you for reaching out. I'll get back to you soon.",

    // Visit Card
    "visitCard.title": "Full-stack Developer",
    "visitCard.call": "CALL",
    "visitCard.email": "EMAIL",
    "visitCard.mobile": "Mobile",
    "visitCard.website": "Website",
    "visitCard.download": "Download Visit Card",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  fr: {
    // Navigation
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.packs": "Packs",
    "nav.contact": "Contact",

    // Hero
    "hero.typing": "solutions web avec ",
    "hero.subtitle": "Développeur web full-stack & Créateur de boutiques e-commerce",
    "hero.cta": "Découvrir Mon Travail",

    // About
    "about.title": "À propos de moi",
    "about.experience": "Années d'Expérience",
    "about.projects": "Projets Réalisés",
    "about.clients": "Clients Satisfaits",
    "about.location": "Alger, Algérie",
    "about.available": "Disponible pour travailler",
    "about.intro": "Bonjour, je suis",
    "about.name": "Mehdi Kernou",
    "about.description1":
      "un développeur web passionné avec une expertise dans la création de sites web et boutiques e-commerce magnifiques et fonctionnels.",
    "about.description2": "Avec de l'expérience en",
    "about.skills": "développement front-end et back-end",
    "about.description3": "je donne vie aux idées grâce à un code propre et des principes de conception modernes.",
    "about.approach": "Mon approche combine",
    "about.values": "l'excellence technique avec la résolution créative de problèmes et une excellente communication",
    "about.commitment":
      "pour la satisfaction du client, garantissant que chaque projet non seulement répond mais dépasse les attentes.",
    "about.connect": "Restons Connectés",

    // Services
    "services.title": "Services",
    "services.learnMore": "En Savoir Plus",
    "services.web.title": "Design Web & Pages d'Atterrissage",
    "services.web.description":
      "Design web moderne et réactif et pages d'atterrissage à forte conversion qui engagent votre audience.",
    "services.ecommerce.title": "Boutiques Personnalisées & Shopify",
    "services.ecommerce.description":
      "Solutions e-commerce professionnelles avec design personnalisé et intégration Shopify pour vos besoins d'entreprise.",
    "services.cards.title": "Cartes de Visite Virtuelles",
    "services.cards.description":
      "Cartes de visite numériques qui laissent une impression durable et vous aident à réseauter efficacement.",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.viewProject": "Voir le Projet",
    "portfolio.project1.title": "Portfolio Adel Copywriter",
    "portfolio.project1.description":
      "Un site portfolio complet présentant des services de rédaction professionnels avec un design arabe moderne et une navigation conviviale.",
    "portfolio.project1.category": "Portfolio",
    "portfolio.project2.title": "Conseil Farid Abdeddaim",
    "portfolio.project2.description":
      "Site web de conseil professionnel avec présentation de services, témoignages clients et solutions d'affaires complètes.",
    "portfolio.project2.category": "Conseil",
    "portfolio.project3.title": "Cartes de Visite QR Virtuelles",
    "portfolio.project3.description":
      "Plateforme de cartes de visite numériques avec intégration de code QR, gestion de contacts et fonctionnalités de réseautage professionnel.",
    "portfolio.project3.category": "Cartes Numériques",

    // Packs
    "packs.title": "Packs",
    "packs.viewPacks": "Voir les Packs",
    "packs.selectPack": "Sélectionner le Pack",
    "packs.popular": "Le Plus Populaire",
    "packs.pageTitle": "Choisissez Votre Package Parfait",
    "packs.pageDescription":
      "Sélectionnez le package qui correspond le mieux aux besoins et au budget de votre entreprise. Tous les packages incluent un design professionnel, le développement et un support continu.",
    "packs.backHome": "Retour à l'Accueil",
    "packs.deliveryTime": "Temps de Livraison",
    "packs.revisions": "Révisions",
    "packs.support": "Support",
    "packs.customTitle": "Besoin de Quelque Chose de Personnalisé?",
    "packs.customDescription":
      "Chaque entreprise est unique. Discutons d'une solution personnalisée adaptée spécifiquement à vos besoins et exigences.",
    "packs.contactCustom": "Contact pour Devis Personnalisé",
    "packs.delivery.basic": "7-10 jours",
    "packs.delivery.standard": "10-14 jours",
    "packs.delivery.premium": "14-21 jours",
    "packs.revisions.unlimited": "Illimitées",
    "packs.support.email": "Support Email",
    "packs.support.priority": "Support Prioritaire",
    "packs.support.dedicated": "Support Dédié",
    "packs.visibility.title": "Pack Visibilité",
    "packs.visibility.subtitle": "Parfait pour les entreprises cherchant à établir une forte présence en ligne",
    "packs.visibility.feature1": "Intégration de marque professionnelle",
    "packs.visibility.feature2": "Formulaires de contenu avec base de données",
    "packs.visibility.feature3": "Gestion de compte utilisateur",
    "packs.visibility.feature4": "Intégration avancée",
    "packs.visibility.feature5": "Marque d'inventaire",
    "packs.visibility.feature6": "Gestion de rapports",
    "packs.visibility.feature7": "Design responsive mobile",
    "packs.visibility.feature8": "Optimisation SEO de base",
    "packs.management.title": "Pack Gestion",
    "packs.management.subtitle":
      "Parfait pour les entreprises qui ont besoin de gestion de contenu continue et de mises à jour régulières",
    "packs.management.feature1": "Système de Gestion de Contenu",
    "packs.management.feature2": "Mises à Jour et Maintenance Régulières",
    "packs.management.feature3": "Optimisation SEO",
    "packs.management.feature4": "Analytiques et Rapports",
    "packs.management.feature5": "Authentification Utilisateur",
    "packs.management.feature6": "Intégration Base de Données",
    "packs.management.feature7": "Fonctionnalités de sécurité avancées",
    "packs.management.feature8": "Optimisation des performances",
    "packs.innovative.title": "Pack Systèmes Innovants",
    "packs.innovative.subtitle": "Solutions avancées pour les entreprises prêtes à exploiter la technologie de pointe",
    "packs.innovative.feature1": "Fonctionnalités E-commerce Avancées",
    "packs.innovative.feature2": "Analytiques Alimentées par IA",
    "packs.innovative.feature3": "Intégrations Personnalisées",
    "packs.innovative.feature4": "Systèmes de Sécurité Avancés",
    "packs.innovative.feature5": "Architecture Évolutive",
    "packs.innovative.feature6": "Support 24/7",
    "packs.innovative.feature7": "Développement d'API personnalisées",
    "packs.innovative.feature8": "Outils d'automatisation avancés",

    // Contact
    "contact.title": "Contactez-moi",
    "contact.subtitle": "Travaillons ensemble",
    "contact.description":
      "Vous avez un projet en tête ou besoin d'une solution personnalisée ? J'aimerais vous entendre.",
    "contact.intro":
      "Que vous ayez besoin d'un site web complet, d'une solution e-commerce, ou que vous souhaitiez simplement discuter de vos idées, je suis là pour vous aider à donner vie à votre vision.",
    "contact.phone": "Téléphone",
    "contact.phoneDesc": "Appelez-moi directement pour les demandes urgentes",
    "contact.email": "Email",
    "contact.emailDesc": "Envoyez-moi un message détaillé",
    "contact.location": "Localisation",
    "contact.locationValue": "Alger, Algérie",
    "contact.locationDesc": "Disponible pour le travail à distance dans le monde entier",
    "contact.responseTime": "Réponse Rapide",
    "contact.responseDesc": "Je réponds généralement dans les 24 heures",
    "contact.formTitle": "Envoyez-moi un message",
    "contact.formDescription": "Remplissez le formulaire ci-dessous et je vous répondrai bientôt",
    "contact.name": "Nom complet",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    "contact.successTitle": "Message envoyé avec succès !",
    "contact.successMessage": "Merci de m'avoir contacté. Je vous répondrai bientôt.",

    // Visit Card
    "visitCard.title": "Développeur Full-stack",
    "visitCard.call": "APPELER",
    "visitCard.email": "EMAIL",
    "visitCard.mobile": "Mobile",
    "visitCard.website": "Site web",
    "visitCard.download": "Télécharger la carte de visite",

    // Footer
    "footer.rights": "Tous droits réservés.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    // Save language to localStorage when it changes
    if (mounted) {
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  const t = (key: string): string => {
    if (!mounted) return key
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
