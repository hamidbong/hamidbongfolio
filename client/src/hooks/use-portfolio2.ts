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
  proficiency: number;
  icon: string;
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
    title: { fr: "Cluster Kubernetes Sécurisé", en: "Secure Kubernetes Cluster" },
    description: { 
      fr: "Déploiement automatisé d'un cluster Kubernetes durci utilisant Ansible et Terraform. Implémentation de network policies et RBAC.",
      en: "Automated deployment of a hardened Kubernetes cluster using Ansible and Terraform. Implemented network policies and RBAC."
    },
    techStack: ["Kubernetes", "Terraform", "Ansible", "AWS"],
    repoUrl: "https://github.com/example/k8s-hardened",
    imageUrl: "/src/assets/images/project-sec-ops.jpg",
    images: ["/src/assets/images/project-sec-ops.jpg", "/src/assets/images/project-sec-server.jpg"],
    featured: true
  },
  {
    id: 2,
    title: { fr: "Scanner de Vulnérabilités", en: "Vulnerability Scanner" },
    description: {
      fr: "Un scanner de vulnérabilités automatisé basé sur Python pour les réseaux internes. Génère des rapports sur les ports ouverts et les services obsolètes.",
      en: "A Python-based automated vulnerability scanner for internal networks. Generates reports on open ports and outdated services."
    },
    techStack: ["Python", "Nmap", "Security"],
    repoUrl: "https://github.com/example/vuln-scanner",
    imageUrl: "/src/assets/images/project-sec-audit.jpg",
    images: ["/src/assets/images/project-sec-audit.jpg", "/src/assets/images/project-sec-code.jpg"],
    featured: true
  },
  {
    id: 3,
    title: { fr: "Démo de Pipeline DevSecOps", en: "DevSecOps Pipeline Demo" },
    description: {
      fr: "Pipeline CI/CD complet avec vérifications de sécurité SAST/DAST intégrées utilisant SonarQube et OWASP ZAP.",
      en: "Complete CI/CD pipeline with integrated SAST/DAST security checks using SonarQube and OWASP ZAP."
    },
    techStack: ["GitHub Actions", "SonarQube", "OWASP ZAP", "Docker"],
    repoUrl: "https://github.com/example/devsecops-pipeline",
    imageUrl: "/src/assets/images/project-devops.jpg",
    images: ["/src/assets/images/project-devops.jpg", "/src/assets/images/project-cloud.jpg"],
    featured: true
  }
];

const MOCK_SKILLS: Skill[] = [
  { id: 1, name: "Kubernetes", category: "DevOps", proficiency: 65, icon: "Container" },
  { id: 2, name: "Docker", category: "DevOps", proficiency: 80, icon: "Box" },
  { id: 3, name: "CI/CD (Jenkins)", category: "DevOps", proficiency: 90, icon: "Workflow" },
  { id: 4, name: "Penetration Testing", category: "Security", proficiency: 45, icon: "Shield" },
  { id: 5, name: "Network Security", category: "Security", proficiency: 80, icon: "Lock" },
  { id: 6, name: "SonarQube", category: "DevSecOps", proficiency: 70, icon: "SearchCode" },
  { id: 7, name: "OWASP Check", category: "DevSecOps", proficiency: 70, icon: "ShieldCheck" },
  { id: 8, name: "Trivy", category: "DevSecOps", proficiency: 70, icon: "Bug" },
  { id: 9, name: "Python", category: "Backend", proficiency: 45, icon: "Code" },
  { id: 10, name: "Terraform", category: "DevOps", proficiency: 70, icon: "Cloud" },
  { id: 11, name: "Ansible", category: "DevOps", proficiency: 85, icon: "Settings" },
  { id: 12, name: "Linux", category: "System", proficiency: 80, icon: "Server" },
  { id: 13, name: "Git", category: "DevOps", proficiency: 65, icon: "GitBranch" },
  { id: 14, name: "OpenStack", category: "Cloud", proficiency: 80, icon: "Cloud" },
  { id: 15, name: "Java", category: "Backend", proficiency: 75, icon: "Coffee" },
  { id: 16, name: "Azure", category: "Cloud", proficiency: 70, icon: "Cloud" },
  { id: 17, name: "Virtualization (ESXi/KVM)", category: "System", proficiency: 85, icon: "Cpu" },
  { id: 18, name: "Wazuh & Suricata", category: "Security", proficiency: 75, icon: "Eye" },
  { id: 19, name: "Grafana & Prometheus", category: "DevOps", proficiency: 80, icon: "Activity" },
  { id: 20, name: "pfSense", category: "Security", proficiency: 85, icon: "Shield" },
  { id: 21, name: "Snort", category: "Security", proficiency: 75, icon: "ShieldAlert" },
  { id: 22, name: "Nagios", category: "DevOps", proficiency: 70, icon: "Activity" }
];

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: { fr: "Stagiaire Sécurité", en: "Security Intern" },
    company: "CyberCorp Inc.",
    duration: "2024 - Present",
    description: {
      fr: "Assistance aux tests d'intrusion, surveillance des journaux SIEM et automatisation des scripts de détection de menaces.",
      en: "Assisting in penetration testing, monitoring SIEM logs, and automating threat detection scripts."
    }
  },
  {
    id: 2,
    role: { fr: "Étudiant DevOps", en: "DevOps Student" },
    company: "University Lab",
    duration: "2022 - 2024",
    description: {
      fr: "Gestion des serveurs Linux du campus, mise en place de solutions de sauvegarde automatisées et animation d'ateliers sur Git et Docker.",
      en: "Managed campus linux servers, set up automated backup solutions, and taught workshops on Git and Docker."
    }
  }
];

const MOCK_EDUCATION: Education[] = [
  {
    id: 1,
    degree: { fr: "Master en Sécurité Informatique", en: "Master in IT Security" },
    school: "École Supérieure d'Informatique",
    duration: "2024 - 2026",
    description: {
      fr: "Spécialisation en DevSecOps, cryptographie appliquée et sécurité des infrastructures cloud.",
      en: "Specialization in DevSecOps, applied cryptography and cloud infrastructure security."
    }
  },
  {
    id: 2,
    degree: { fr: "Licence en Informatique", en: "Bachelor of Computer Science" },
    school: "Université de Technologie",
    duration: "2021 - 2024",
    description: {
      fr: "Bases de l'informatique, administration systèmes Linux et réseaux.",
      en: "Fundamentals of computer science, Linux systems administration and networking."
    }
  }
];

const MOCK_CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    name: { fr: "ISC2 Candidate", en: "ISC2 Candidate" },
    issuer: "ISC2",
    date: "2025",
    link: "https://www.credly.com/badges/3925e537-eea3-4e95-a17c-e61c4f6c25d2",
    credlyId: "3925e537-eea3-4e95-a17c-e61c4f6c25d2"
  },
  {
    id: 2,
    name: { fr: "Introduction to Cybersecurity", en: "Introduction to Cybersecurity" },
    issuer: "Cisco",
    date: "2024",
    link: "https://www.credly.com/badges/06a3f7c3-c292-4cf5-89d3-2fb85f21f7bf",
    credlyId: "06a3f7c3-c292-4cf5-89d3-2fb85f21f7bf"
  },
  {
    id: 3,
    name: { fr: "Cybersecurity Essentials", en: "Cybersecurity Essentials" },
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
    excerpt: {
      fr: "Pourquoi intégrer la sécurité dès les premières étapes du développement est crucial pour les entreprises modernes.",
      en: "Why integrating security at the earliest stages of development is crucial for modern businesses."
    },
    content: {
      fr: "Le concept de 'Shift Left' consiste à déplacer les tests de sécurité plus tôt dans le cycle de développement logiciel (SDLC). En identifiant les vulnérabilités dès la phase de conception ou de codage, les équipes peuvent réduire considérablement les coûts et les risques associés aux cyberattaques.",
      en: "The 'Shift Left' concept involves moving security testing earlier in the software development life cycle (SDLC). By identifying vulnerabilities as early as the design or coding phase, teams can significantly reduce costs and risks associated with cyberattacks."
    },
    tags: ["DevSecOps", "Sécurité", "SDLC"],
    githubUrl: "https://github.com/example/shift-left-tutorial"
  },
  {
    id: 2,
    title: { fr: "Sécuriser ses clusters Kubernetes avec mTLS", en: "Securing Kubernetes Clusters with mTLS" },
    date: "2 Mars 2025",
    excerpt: {
      fr: "Comment utiliser Linkerd ou Istio pour implémenter une communication chiffrée entre vos services.",
      en: "How to use Linkerd or Istio to implement encrypted communication between your services."
    },
    content: {
      fr: "Le mTLS (Mutual TLS) assure que le trafic entre les microservices est non seulement chiffré, mais aussi que chaque service authentifie l'autre. C'est un pilier de l'architecture Zero Trust au sein d'un cluster Kubernetes.",
      en: "mTLS (Mutual TLS) ensures that traffic between microservices is not only encrypted, but also that each service authenticates the other. It's a pillar of Zero Trust architecture within a Kubernetes cluster."
    },
    tags: ["Kubernetes", "mTLS", "Zero Trust"],
    githubUrl: "https://github.com/example/k8s-mtls-guide"
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

export function useSendMessage() {
  return {
    mutateAsync: async (data: any) => {
      console.log("Mock message sent:", data);
      return { success: true };
    },
    isPending: false
  };
}
