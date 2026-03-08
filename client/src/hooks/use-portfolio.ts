import { useMemo } from "react";

export interface Project {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  images?: string[];
  featured?: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: Record<string, string>;
  description: Record<string, string>;
  projectCount: number;
  icon: string;
  relatedProjectId?: number;
  projectLink?: string;
}

export interface Experience {
  id: number;
  role: Record<string, string>;
  company: string;
  duration: string;
  description: Record<string, string>;
}

export interface Education {
  id: number;
  degree: Record<string, string>;
  school: string;
  duration: string;
  description: Record<string, string>;
}

export interface Certification {
  id: number;
  name: Record<string, string>;
  issuer: string;
  date: string;
  link?: string;
  credlyId?: string;
}

export interface Publication {
  id: number;
  title: Record<string, string>;
  date: string;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  tags: string[];
  githubUrl?: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: { fr: "CI/CD DevSecOps sécurisé sur un cloud OpenStack privé", en: "Secure DevSecOps CI/CD on Private OpenStack Cloud" },
    description: { 
      fr: "Conception et mise en œuvre d'un pipeline CI/CD sécurisé pour une application basée sur des microservices déployée sur un cloud privé OpenStack (DevStack), intégrant l'analyse statique de la sécurité des applications (SAST) automatisée, l'analyse des dépendances, les analyses de sécurité des conteneurs et le déploiement Kubernetes.",
      en: "Design and implementation of a secure CI/CD pipeline for a microservices-based application deployed on a private OpenStack cloud (DevStack), integrating automated SAST, Dependency Scanning, container security scans, and Kubernetes deployment."},
    techStack: [
      "OpenStack (DevStack)",
      "Kubernetes",
      "Docker",
      "Helm",
      "Jenkins CI/CD",
      "SonarQube (SAST)",
      "OWASP Check (Dependency Scanning)",
      "Trivy",
      "NGINX Ingress",
      "Cert-Manager (SSL/TLS)",
      "WAF (ModSecurity)",
      "Prometheus & Grafana"
    ],
    imageUrl: "/projects/Legacy-CI-CD-pipeline-in-DevOps.png",
    images: ["/projects/Legacy-CI-CD-pipeline-in-DevOps.png", "/projects/cicd-conception.png", "/projects/openstack_dashboard.png","/projects/Grafana_cluster.png"],
    repoUrl: "https://github.com/hamidbong/devops-project.git",
    featured: true
  },
{
    id: 2,
    title: { fr: "Mise en place d'une solution de Cloud privé dans un environnement sécurisé",
      en: "Implementation of a private Cloud solution in a secure environment" },
    description: { fr: "Conception et mise en œuvre d'une infrastructure de cloud privé sécurisée avec une défense en profondeur, incluant la détection d'intrusions hôtes et réseau, le filtrage des paquets, et la surveillance en temps réel.",
      en: "Design and implementation of a secure private cloud infrastructure with defense in depth, including host and network intrusion detection, packet filtering, and real-time monitoring." },
    techStack: ["Proxmox", "Linux", "Containerization(LXC)", "Wazuh", "Suricata", "Firewall(PFsense)", "Prometheus", "Grafana", "DNS(Bind9)", "Backup(Urbackup)", "WebServer(NGINX)", "MailServer(Postfix)"],
    imageUrl: "/projects/what-is-cloud-security.avif",
    images: ["/projects/what-is-cloud-security.avif", "/projects/proxmox_int.png", "/projects/pfsense.png", "/projects/grafana_prometheus.png"],
    repoUrl: "",
    featured: true
  },

  {
    id: 3,
    title: { fr: "Déploiement d'Application Web Hautement Disponible avec Ansible et NGINX",
      en: "Highly Available Web Application Deployment with Ansible and NGINX" },
    description: { fr: "Automatisation du déploiement d'une application web avec Ansible, NGINX et Bind9 pour une architecture hautement disponible",
      en: "Automated deployment of a web application with Ansible, NGINX, and Bind9 for a highly available architecture" },
    techStack: ["Ansible", "NGINX", "Bind9", "Linux"],
    imageUrl: "/projects/ansible_terraform.png",
    images: ["/projects/ansible_terraform.png"],
    repoUrl: "https://github.com/hamidbong/ansible-loadbalancer.git",
    featured: true
  },
  {
    id: 4,
    title: { 
      fr: "MySiteLOCATION – Application Web de Gestion de Locations",
      en: "MySiteLOCATION – Property Rental Management Web Application"
    },
    description: { 
      fr: "Application web développée en Java (Servlets & JSP) suivant l’architecture MVC avec DAO. Elle permet la gestion des utilisateurs, la consultation de biens immobiliers et la réservation en ligne avec gestion des statuts.",
      en: "Java-based web application built with Servlets and JSP following the MVC architecture with DAO pattern. It enables user management, property browsing, and online reservation handling with status management."
    },
    techStack: [
      "Java",
      "Servlets",
      "JSP",
      "JDBC",
      "MySQL",
      "Tomcat",
      "MVC",
      "DAO Pattern"
    ],
    imageUrl: "/projects/car-rentals.webp",
    images: ["/projects/car-rentals.webp", "/projects/Accueil_MySiteLocation.png", "/projects/Login_MySiteLocation.png", "/projects/CreateAccount_MySiteLocation.png", "/projects/Update_MySiteLocation.png"],
    repoUrl: "https://github.com/hamidbong/MySiteLOCATION.git",
    featured: true
  }

];

const MOCK_SKILLS: Skill[] = [
  {
    id: 1,
    name: "Kubernetes",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Conception de clusters Kubernetes sécurisés pour des applications en microservices avec NGINX Ingress, Helm et surveillance Prometheus.",
      en: "Kubernetes cluster design for secure microservices CI/CD with NGINX Ingress, Helm and Prometheus monitoring.",
    },
    projectCount: 1,
    icon: "Container",
    relatedProjectId: 1,
    projectLink: "https://github.com/hamidbong/devops-project",
  },
  {
    id: 2,
    name: "Docker",
    category: "DevOps & Cloud",
    level: { fr: "Avancé", en: "Advanced" },
    description: {
      fr: "Containerisation d'applications complexes, Docker Compose, optimisation des images et sécurité.",
      en: "Containerized complex applications, Docker Compose, and image optimization and security.",
    },
    projectCount: 5,
    icon: "Box",
    relatedProjectId: 1,
    projectLink: "https://github.com/hamidbong/devops-project"
  },
  {
    id: 3,
    name: "CI/CD (Jenkins)",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Conception de pipelines complexes, automatisation complète du build au déploiement et intégration de tests de sécurité.",
      en: "Design of complex pipelines, full automation from build to deployment and security testing integration.",
    },
    projectCount: 1,
    icon: "Workflow",
    relatedProjectId: 1,
    projectLink: "https://github.com/hamidbong/devops-project"
  },
  {
    id: 4,
    name: "Git",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Gestion de versions et stratégies de branching.",
      en: "Version control and branching strategies.",
    },
    projectCount: 12,
    icon: "GitBranch",
    relatedProjectId: 1,
  },
  {
    id: 5,
    name: "SonarQube",
    category: "DevSecOps",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Analyse statique de code (SAST) et intégration dans les pipelines CI/CD.",
      en: "Static Application Security Testing (SAST) and CI/CD integration.",
    },
    projectCount: 1,
    icon: "SearchCode",
    relatedProjectId: 1,
    projectLink: "https://github.com/hamidbong/devops-project"
  },
  {
    id: 7,
    name: "Penetration Testing",
    category: "Security & Networking",
    level: { fr: "Débutant", en: "Beginner" },
    description: {
      fr: "Exploration des vulnérabilités web courantes (OWASP Top 10).",
      en: "Exploration of common web vulnerabilities (OWASP Top 10).",
    },
    projectCount: 4,
    icon: "Shield",
    relatedProjectId: 2,
  },
  {
    id: 8,
    name: "Network Security",
    category: "Security & Networking",
    level: { fr: "Avancé", en: "Advanced" },
    description: {
      fr: "Configuration de pare-feux, IDS/IPS et segmentation réseau.",
      en: "Firewall configuration, IDS/IPS, and network segmentation.",
    },
    projectCount: 10,
    icon: "Lock",
    relatedProjectId: 2,
  },
  {
    id: 9,
    name: "Terraform",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Infrastructure as Code (IaC) pour cloud privé OpenStack",
      en: "Infrastructure as Code (IaC) for private cloud OpenStack.",
    },
    projectCount: 1,
    icon: "Cloud",
    relatedProjectId: 1,
  },
  {
    id: 10,
    name: "Ansible",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Gestion de configuration et automatisation de déploiement d'infrastructure.",
      en: "Configuration management and infrastructure deployment automation.",
    },
    projectCount: 2,
    icon: "Settings",
    relatedProjectId: 1,
  },
  {
    id: 11,
    name: "OpenStack",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Gestion de cloud privé et virtualisation réseau.",
      en: "Private cloud management and network virtualization.",
    },
    projectCount: 2,
    icon: "Cloud",
    relatedProjectId: 1,
  },
  {
    id: 12,
    name: "OWASP Dependency Check",
    category: "DevSecOps",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Analyses de dépendances et scans de vulnérabilités dynamiques.",
      en: "Dependency analysis and dynamic vulnerability scanning.",
    },
    projectCount: 2,
    icon: "ShieldCheck",
    relatedProjectId: 1,
  },
  {
    id: 13,
    name: "Trivy",
    category: "DevSecOps",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Scan de vulnérabilités pour les images de conteneurs et les systèmes de fichiers.",
      en: "Vulnerability scanning for container images and filesystems.",
    },
    projectCount: 1,
    icon: "Bug",
    relatedProjectId: 1,
  },
  {
    id: 14,
    name: "Python",
    category: "Backend",
    level: { fr: "Débutant", en: "Beginner" },
    description: {
      fr: "Python Essentials 1, certifié par Cisco, avec une expertise en scripting.",
      en: "Python Essentials 1, certified by Cisco, with expertise in scripting.",
    },
    projectCount: 3,
    icon: "Code",
  },
  {
    id: 15,
    name: "Linux",
    category: "DevOps & Cloud",
    level: { fr: "Avancé", en: "Advanced" },
    description: {
      fr: "Administration système avancée, durcissement OS et scripting shell.",
      en: "Advanced system administration, OS hardening, and shell scripting.",
    },
    projectCount: 20,
    icon: "Server",
    relatedProjectId: 1,
  },
  {
    id: 16,
    name: "Virtualization (KVM)",
    category: "DevOps & Cloud",
    level: { fr: "Avancé", en: "Advanced" },
    description: {
      fr: "Mise en place et gestion d'infrastructures virtualisées haute performance.",
      en: "Setup and management of high-performance virtualized infrastructure.",
    },
    projectCount: 8,
    icon: "Cpu",
  },
  {
    id: 17,
    name: "Java",
    category: "Backend",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Developpenment d'une application web de location de véhicules.",
      en: "Development of a vehicle rental web application.",
    },
    projectCount: 2,
    icon: "Coffee",
    relatedProjectId: 4,
    projectLink: "https://github.com/hamidbong/MySiteLOCATION.git"
  },
  {
    id: 18,
    name: "Wazuh & Suricata",
    category: "Security & Networking",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Mise en place de SIEM et détection d'intrusions réseau.",
      en: "SIEM implementation and network intrusion detection.",
    },
    projectCount: 1,
    icon: "Eye",
    relatedProjectId: 2,
  },
  {
    id: 19,
    name: "Grafana & Prometheus",
    category: "DevOps & Cloud",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Monitoring et visualisation de métriques système et applicatives.",
      en: "Monitoring and visualization of system and application metrics.",
    },
    projectCount: 2,
    icon: "Activity",
    relatedProjectId: 1,
  },
  {
    id: 20,
    name: "pfSense",
    category: "Security & Networking",
    level: { fr: "Avancé", en: "Advanced" },
    description: {
      fr: "Configuration avancée de pare-feu et routage sécurisé.",
      en: "Advanced firewall configuration and secure routing.",
    },
    projectCount: 4,
    icon: "Shield",
    relatedProjectId: 2,
  },
  {
    id: 21,
    name: "Snort",
    category: "Security & Networking",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Détection d'intrusions et analyse de signatures réseau.",
      en: "Intrusion detection and network signature analysis.",
    },
    projectCount: 1,
    icon: "ShieldAlert",
  },
  {
    id: 22,
    name: "Nagios",
    category: "Security & Networking",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Surveillance d'infrastructure et alertes système.",
      en: "Infrastructure monitoring and system alerting.",
    },
    projectCount: 1,
    icon: "Activity",
  },
  {
    id: 23,
    name: "NGINX",
    category: "DevOps & Cloud",
    level: { fr: "Avancé", en: "Advanced" },
    description: {
      fr: "Configuration de serveurs web, reverse proxy et load balancing.",
      en: "Web server configuration, reverse proxy, and load balancing.",
    },
    projectCount: 6,
    icon: "Server",
    relatedProjectId: 1,
  },
  {
    id: 24,
    name: "ELK Stack",
    category: "Security & Networking",
    level: { fr: "Intermédiaire", en: "Intermediate" },
    description: {
      fr: "Analyse centralisée des logs et visualisation de la sécurité.",
      en: "Centralized log analysis and security visualization.",
    },
    projectCount: 2,
    icon: "Database",
  },
];

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: { fr:"Stagiaire DevSecOps", en: "DevSecOps Intern" },
    company: "University Lab",
    duration: "2024 - 2025",
    description: { fr: "Projet de mémoire de mastère professionnel (Déploiement Automatisé et CI/CD Sécurisé pour une Application en Microservices) axé sur la conception et la mise en œuvre d'un pipeline CI/CD automatisé et sécurisé pour une application basée sur des microservices déployée sur une infrastructure cloud OpenStack. Mise en place de la containerisation avec Docker et de l'orchestration avec Kubernetes, ainsi que du provisioning et de la configuration de l'infrastructure à l'aide de Terraform et Ansible pour garantir la reproductibilité et la cohérence. Adoption d'une approche DevSecOps en intégrant l'analyse de sécurité et les tests automatisés dans le pipeline CI/CD pour détecter les vulnérabilités dans le code source, les dépendances et les images de conteneurs. Sécurisation de l'exposition des microservices à l'aide de NGINX avec SSL/TLS, WAF et limitation de débit, et mise en place de la surveillance avec Prometheus et Grafana pour assurer la santé du cluster et la disponibilité des services.",
      en: "Professional Master’s thesis project (Automated Deployment and Secure CI/CD for a Microservices Application) focused on the design and implementation of an automated and secure CI/CD pipeline for a microservices-based application deployed on an OpenStack cloud infrastructure. Implemented containerization with Docker and orchestration with Kubernetes, along with infrastructure provisioning and configuration using Terraform and Ansible to ensure reproducibility and consistency. Adopted a DevSecOps approach by integrating security scanning and automated testing into the CI/CD pipeline to detect vulnerabilities in source code, dependencies, and container images. Secured microservices exposure using NGINX with SSL/TLS, WAF, and rate-limiting, and implemented monitoring with Prometheus and Grafana to ensure cluster health and service availability." }
  },
  {
    id: 2,
    role: { fr:"Stagiaire en sécurité du cloud", en: "Cloud Security Intern" },
    company: "Solutec Nabeul",
    duration: "02/2022 - 05/2023",
    description: { fr: "Projet de fin d'études de licence (Mise en place d'une solution de Cloud privé dans un environnement sécurisé) axé sur la conception et la mise en œuvre d'une infrastructure de cloud privé sécurisée. Mise en place d'un système de défense en profondeur comprenant la détection d'intrusions hôtes et réseau avec Wazuh et Suricata, le filtrage des paquets via des règles de pare-feu, et la surveillance en temps réel avec Prometheus et Grafana. Implémentation de la détection, l'alerte et le blocage automatisés des attaques telles que les scans réseau, les tentatives de force brute, les injections SQL, et les attaques DDoS, validée par des tests d'attaques contrôlées. Ce projet a suivi une approche DevSecOps, garantissant la sécurité, la résilience, et la visibilité de l'environnement de cloud privé.",
      en: "Bachelor’s end-of-study project (Implementation of a private Cloud solution in a secure environment) focused on the design and implementation of a secure private cloud infrastructure. Built a multi-layered defense system including host and network intrusion detection using Wazuh and Suricata, packet filtering through firewall rules, and real-time monitoring with Prometheus and Grafana. Implemented automated detection, alerting, and blocking of attacks such as network scans, brute-force attempts, SQL injections, and DDoS attacks, validated through controlled attack testing. This project followed a DevSecOps approach, ensuring security, resilience, and visibility of the private cloud environment." }
  },
  {
    id: 3,
    role: { fr:"Stage de développement", en: "Development internship" },
    company: "Solutec Nabeul",
    duration: "01/2023 - 02/2023",
    description: { fr: "Mise en place d'une solution de gestion des logs (ELK Stack) pour l'entreprise",
      en: "Implementation of a log management solution (ELK Stack) for the company" }
  }
];

const MOCK_EDUCATION: Education[] = [
  {
    id: 1,
    degree: { fr: "Mastère professionnel en Sécurité des Systèmes Informatiques", en: "Professional Master's in Information Systems Security" },
    school: "Institut Supérieur d'Informatique et de Multimédia de Gabès",
    duration: "2023 - 2025",
    description: { fr: "Spécialisation en DevSecOps.", en: "Specialization in DevSecOps." }
  },
  {
    id: 2,
    degree: { fr: "Licence en Technologie d'Informatique", en: "Bachelor's Degree in Computer Technology" },
    school: "Institut Supérieur des Etudes Technologiques de Nabeul",
    duration: "2020 - 2023",
    description: { fr: "Specialisation en Reseaux et Services Informatiques.", en: "Specialization in Networks and IT Services." }
  },
  {
    id: 3,
    degree: { fr: "Baccalauréat scientifique", en: "Scientific Baccalaureate" },
    school: "LYCEE IQRA’A N'Djamena, Tchad",
    duration: "2018 - 2019",
    description: { fr: "Diplôme de fin d'études secondaires.", en: "High school diploma." }
  }
];

const MOCK_CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    name: { fr: "Python Essentials 1", en: "Python Essentials 1" },
    issuer: "Cisco",
    date: "2025",
    link: "https://www.credly.com/badges/3925e537-eea3-4e95-a17c-e61c4f6c25d2",
    credlyId: "3925e537-eea3-4e95-a17c-e61c4f6c25d2"
  },
  {
    id: 2,
    name: { fr: "JavaScript Essentials 1", en: "JavaScript Essentials 1" },
    issuer: "Cisco",
    date: "2024",
    link: "https://www.credly.com/badges/06a3f7c3-c292-4cf5-89d3-2fb85f21f7bf",
    credlyId: "06a3f7c3-c292-4cf5-89d3-2fb85f21f7bf"
  },
  {
    id: 3,
    name: { fr: "Introduction à la cybersécurité", en: "Introduction to Cybersecurity" },
    issuer: "Cisco",
    date: "2024",
    link: "https://www.credly.com/badges/dc274337-e883-4d2f-a21b-d6b5673dc630",
    credlyId: "dc274337-e883-4d2f-a21b-d6b5673dc630"
  }
];

const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: { fr: "L'importance du 'Shift Left' en DevSecOps", en: "The Importance of 'Shift Left' in DevSecOps" },
    date: "15 Mai 2025",
    excerpt: { fr: "Pourquoi intégrer la sécurité dès les premières étapes du développement est crucial pour les entreprises modernes.", en: "Why integrating security early in the development process is crucial for modern businesses." },
    content: { fr: "Le concept de 'Shift Left' consiste à déplacer les tests de sécurité plus tôt dans le cycle de développement logiciel (SDLC). En identifiant les vulnérabilités dès la phase de conception ou de codage, les équipes peuvent réduire considérablement les coûts et les risques associés aux cyberattaques.", en: "The 'Shift Left' concept involves moving security testing earlier in the software development lifecycle (SDLC). By identifying vulnerabilities during the design or coding phase, teams can significantly reduce costs and risks associated with cyberattacks." },
    tags: ["DevSecOps", "Sécurité", "SDLC"],
    githubUrl: "https://github.com/example/shift-left-devsecops"
  },
  {
    id: 2,
    title: { fr: "Sécurité des repositories Git : gérer les fuites de secrets", en: "Git Repository Security: Managing Secret Leaks" },
    date: "31 Décembre 2025",
    excerpt: { fr: "Guide pratique pour détecter, révoquer et sécuriser un repository après la fuite d’un secret (API key, token, mot de passe).",
      en: "Practical guide to detecting, revoking, and securing a repository after a secret leak (API key, token, password)." },
    content: { 
      fr:`
        Les repositories Git constituent l’un des premiers points d’attaque dans une chaîne DevSecOps.
        Une simple fuite de secret (clé API, token, mot de passe) peut compromettre une application,
        un pipeline CI/CD ou une infrastructure complète.

        Dans cette réalisation, je présente une approche DevSecOps basée sur un scénario réel :
        la détection d’un secret exposé dans un repository Git et la gestion complète de l’incident.

        🔐 Ce que couvre ce tutoriel :
        - Détection automatique des secrets (GitGuardian, Gitleaks)
        - Révocation et rotation immédiate des credentials compromis
        - Suppression des secrets de l’historique Git
        - Mise en place de protections préventives (pre-commit hooks, .gitignore)

        🎯 Objectif :
        Réduire les risques de compromission dès le niveau du repository.

        👉 Le tutoriel complet et les scripts sont disponibles sur GitHub.
        `,
      en:`
        Git repositories are one of the primary attack vectors in a DevSecOps pipeline.
        A simple secret leak (API key, token, password) can compromise an application,
        a CI/CD pipeline, or an entire infrastructure.

        In this project, I present a DevSecOps approach based on a real scenario:
        detecting an exposed secret in a Git repository and managing the entire incident.

        🔐 What this tutorial covers:
        - Automated secret detection (GitGuardian, Gitleaks)
        - Immediate revocation and rotation of compromised credentials
        - Removal of secrets from Git history
        - Implementation of preventive protections (pre-commit hooks, .gitignore)

        🎯 Objective:
        Reduce compromise risks at the repository level.

        👉 The complete tutorial and scripts are available on GitHub.`
    },
    tags: ["Git", "DevSecOps", "Secrets", "Security"],
    githubUrl: "https://github.com/hamidbong/git-secret-incident-response.git"
  }

];

export function useProjects() {
  return { data: MOCK_PROJECTS, isLoading: false };
}

export function useSkills() {
  return { data: MOCK_SKILLS, isLoading: false };
}

export function useExperience() {
  return { data: MOCK_EXPERIENCE, isLoading: false };
}

export function useEducation() {
  return { data: MOCK_EDUCATION, isLoading: false };
}

export function useCertifications() {
  return { data: MOCK_CERTIFICATIONS, isLoading: false };
}

export function usePublications() {
  return { data: MOCK_PUBLICATIONS, isLoading: false };
}

import { useState } from "react";

export function useSendMessage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutateAsync = async (data: any) => {
    setIsPending(true);
    setIsSuccess(false);

    try {
      const { default: emailjs } = await import('@emailjs/browser');
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          to_email: import.meta.env.VITE_RECIPIENT_EMAIL,
        }
      );

      setIsPending(false);
      setIsSuccess(true);
    } catch (error) {
      setIsPending(false);
      setIsSuccess(false);
      throw error;
    }
  };

  const mutate = (data: any, options: { onSuccess?: () => void; onError?: (error: any) => void }) => {
    mutateAsync(data)
      .then(() => {
        if (options.onSuccess) options.onSuccess();
      })
      .catch((error) => {
        if (options.onError) options.onError(error);
      });
  };

  return {
    mutate,
    mutateAsync,
    isPending,
    isSuccess
  };
}