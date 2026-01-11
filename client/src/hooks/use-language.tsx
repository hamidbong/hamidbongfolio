import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "home.title": "Ingénieur DevSecOps Junior | Sécurité Réseau",
    "home.subtitle": "Ingénieur DevSecOps passionné par la sécurité, les technologies cloud et l'automatisation. J'accompagne les équipes dans le déploiement sécurisé d'applications basées sur des microservices ou monolithiques, l'industrialisation des pipelines CI/CD et la mise en place d'architectures résilientes basées sur Kubernetes.",
    "home.view_projects": "Voir mes projets",
    "home.contact_me": "Me contacter",
    "projects.title": "Projets",
    "projects.subtitle": "Une sélection de mes travaux en DevOps et Cybersécurité.",
    "skills.title": "Compétences",
    "skills.subtitle": "Mon arsenal technique pour sécuriser et automatiser les infrastructures.",
    "publications.title": "Publications",
    "publications.subtitle": "Articles techniques, retours d'expérience et réflexions sur la cybersécurité et le DevOps.",
    "publications.read_more": "Voir plus",
    "publications.read_less": "Voir moins",
    "publications.github_tutorial": "Voir le tutoriel complet sur GitHub",
    "contact.title": "Contact",
    "contact.subtitle": "Travaillons ensemble sur votre prochain projet sécurisé.",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    "contact.sending": "Envoi en cours...",
    "contact.success": "Message envoyé avec succès !",
    "contact.error": "Une erreur est survenue.",
    "education.title": "Éducation",
    "education.download_cv": "Télécharger mon CV",
    "education.download_cv_desc": "Téléchargez mon CV complet pour découvrir l'intégralité de mon parcours et mes compétences techniques.",
  },
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "home.title": "DevSecOps Engineer Junior | Network Security",
    "home.subtitle": "DevSecOps Engineer passionate about security, cloud technologies, and automation. I support teams in securely deploying both microservices-based and monolithic applications, industrializing CI/CD pipelines, and implementing resilient Kubernetes-based architectures.",
    "home.view_projects": "View Projects",
    "home.contact_me": "Contact Me",
    "projects.title": "Projects",
    "projects.subtitle": "A selection of my work in DevOps and Cybersecurity.",
    "skills.title": "Skills",
    "skills.subtitle": "My technical arsenal for securing and automating infrastructures.",
    "publications.title": "Publications",
    "publications.subtitle": "Technical articles, case studies, and thoughts on cybersecurity and DevOps.",
    "publications.read_more": "Read more",
    "publications.read_less": "Read less",
    "publications.github_tutorial": "View full tutorial on GitHub",
    "contact.title": "Contact",
    "contact.subtitle": "Let's work together on your next secure project.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "An error occurred.",
    "education.title": "Education",
    "education.download_cv": "Download My CV",
    "education.download_cv_desc": "Download my full CV to discover my entire background and technical skills.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "fr";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
