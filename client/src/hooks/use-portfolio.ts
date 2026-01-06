import { useMemo } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  duration: string;
  description: string;
}

export interface Publication {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  githubUrl?: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Secure DevSecOps CI/CD on Private OpenStack Cloud",
    description: "Design and implementation of a secure CI/CD pipeline for a microservices-based application deployed on a private OpenStack cloud (DevStack), integrating automated SAST, Dependency Scanning, container security scans, and Kubernetes deployment.",
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
    repoUrl: "https://github.com/hamidbong/devops-project.git",
    featured: true
  },
  {
    id: 2,
    title: "Déploiement d'Application Web Hautement Disponible avec Ansible et NGINX",
    description: "Automatisation du déploiement d'une application web avec Ansible, NGINX et Bind9 pour une architecture hautement disponible",
    techStack: ["Ansible", "NGINX", "Bind9", "Linux"],
    repoUrl: "https://github.com/hamidbong/ansible-loadbalancer.git",
    featured: true
  }

];

const MOCK_SKILLS: Skill[] = [
  { id: 1, name: "Kubernetes", category: "DevOps", proficiency: 65, icon: "Container" },
  { id: 2, name: "Docker", category: "DevOps", proficiency: 80, icon: "Box" },
  { id: 3, name: "CI/CD (Jenkins)", category: "DevOps", proficiency: 90, icon: "Workflow" },
  { id: 4, name: "Penetration Testing", category: "Security", proficiency: 45, icon: "Shield" },
  { id: 5, name: "Network Security", category: "Security", proficiency: 80, icon: "Lock" },
  { id: 6, name: "SonarQube", category: "DevSecOps", proficiency: 70, icon: "Lock" },
  { id: 7, name: "OWASP Check", category: "DevSecOps", proficiency: 70, icon: "Lock" },
  { id: 8, name: "Trivy", category: "DevSecOps", proficiency: 70, icon: "Lock" },
  { id: 9, name: "Python", category: "Backend", proficiency: 45, icon: "Code" },
  { id: 10, name: "Terraform", category: "DevOps", proficiency: 70, icon: "Cloud" },
  { id: 11, name: "Ansible", category: "DevOps", proficiency: 85, icon: "Settings" },
  { id: 12, name: "Linux", category: "System", proficiency: 80, icon: "Server" },
  { id: 13, name: "Git", category: "DevOps", proficiency: 65, icon: "GitBranch" },
  { id: 14, name: "OpenStack", category: "Cloud", proficiency: 80, icon: "Cloud" }

];

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "DevSecOps Intern",
    company: "University Lab",
    duration: "2024 - 2025",
    description: "Master’s thesis project (Automated Deployment and Secure CI/CD for a Microservices Application) focused on the design and implementation of an automated and secure CI/CD pipeline for a microservices-based application deployed on an OpenStack cloud infrastructure. Implemented containerization with Docker and orchestration with Kubernetes, along with infrastructure provisioning and configuration using Terraform and Ansible to ensure reproducibility and consistency. Adopted a DevSecOps approach by integrating security scanning and automated testing into the CI/CD pipeline to detect vulnerabilities in source code, dependencies, and container images. Secured microservices exposure using NGINX with SSL/TLS, WAF, and rate-limiting, and implemented monitoring with Prometheus and Grafana to ensure cluster health and service availability."
  },
  {
    id: 2,
    role: "Cloud Security Intern",
    company: "Solutec Nabeul",
    duration: "02/2022 - 05/2023",
    description: "Bachelor’s end-of-study project (Implementation of a private Cloud solution in a secure environment) focused on the design and implementation of a secure private cloud infrastructure. Built a multi-layered defense system including host and network intrusion detection using Wazuh and Suricata, packet filtering through firewall rules, and real-time monitoring with Prometheus and Grafana. Implemented automated detection, alerting, and blocking of attacks such as network scans, brute-force attempts, SQL injections, and DDoS attacks, validated through controlled attack testing. This project followed a DevSecOps approach, ensuring security, resilience, and visibility of the private cloud environment."
  },
  {
    id: 3,
    role: "Development internship",
    company: "Solutec Nabeul",
    duration: "01/2023 - 02/2023",
    description: "Implementation of a log management solution (ELK Stack) for the company"
  }
];

const MOCK_EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Mastère professionnel en Sécurité des Systèmes Informatiques",
    school: "Institut Supérieur d'Informatique et de Multimédia de Gabès",
    duration: "2023 - 2025",
    description: "Spécialisation en DevSecOps."
  },
  {
    id: 2,
    degree: "Licence en Technologie d'Informatique",
    school: "Institut Supérieur des Etudes Technologiques de Nabeul",
    duration: "2020 - 2023",
    description: "Specialisation en Reseaux et Services Informatiques."
  },
  {
    id: 3,
    degree: "Baccalauréat scientifique",
    school: "LYCEE IQRA’A N'Djamena, Tchad",
    duration: "2018 - 2019",
    description: "Diplôme de fin d'études secondaires."
  }
];

const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: "L'importance du 'Shift Left' en DevSecOps",
    date: "15 Mai 2025",
    excerpt: "Pourquoi intégrer la sécurité dès les premières étapes du développement est crucial pour les entreprises modernes.",
    content: "Le concept de 'Shift Left' consiste à déplacer les tests de sécurité plus tôt dans le cycle de développement logiciel (SDLC). En identifiant les vulnérabilités dès la phase de conception ou de codage, les équipes peuvent réduire considérablement les coûts et les risques associés aux cyberattaques.",
    tags: ["DevSecOps", "Sécurité", "SDLC"],
    githubUrl: "https://github.com/example/shift-left-devsecops"
  },
  {
    id: 2,
    title: "Sécurité des repositories Git : gérer les fuites de secrets",
    date: "31 Décembre 2025",
    excerpt: "Guide pratique pour détecter, révoquer et sécuriser un repository après la fuite d’un secret (API key, token, mot de passe).",
    content: `
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

export function usePublications() {
  return { data: MOCK_PUBLICATIONS, isLoading: false };
}

import { useState } from "react";

export function useSendMessage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = (data: any, options: { onSuccess?: () => void; onError?: (error: any) => void }) => {
    setIsPending(true);
    setIsSuccess(false);

    // Import EmailJS dynamically to avoid SSR issues
    import('@emailjs/browser').then(({ default: emailjs }) => {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      console.log("Sending email with data:", data);

      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          to_email: import.meta.env.VITE_RECIPIENT_EMAIL,
        }
      ).then(() => {
        setIsPending(false);
        setIsSuccess(true);
        if (options.onSuccess) options.onSuccess();
      }).catch((error) => {
        setIsPending(false);
        setIsSuccess(false);
        if (options.onError) options.onError(error);
      });
    }).catch((error) => {
      setIsPending(false);
      setIsSuccess(false);
      if (options.onError) options.onError(error);
    });
  };

  return {
    mutate,
    isPending,
    isSuccess
  };
}