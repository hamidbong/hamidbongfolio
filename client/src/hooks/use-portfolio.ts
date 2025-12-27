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

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Secure Kubernetes Cluster",
    description: "Automated deployment of a hardened Kubernetes cluster using Ansible and Terraform. Implemented network policies and RBAC.",
    techStack: ["Kubernetes", "Terraform", "Ansible", "AWS"],
    repoUrl: "https://github.com/example/k8s-hardened",
    featured: true
  },
  {
    id: 2,
    title: "Vulnerability Scanner",
    description: "A Python-based automated vulnerability scanner for internal networks. Generates reports on open ports and outdated services.",
    techStack: ["Python", "Nmap", "Security"],
    repoUrl: "https://github.com/example/vuln-scanner",
    featured: true
  },
  {
    id: 3,
    title: "DevSecOps Pipeline Demo",
    description: "Complete CI/CD pipeline with integrated SAST/DAST security checks using SonarQube and OWASP ZAP.",
    techStack: ["GitHub Actions", "SonarQube", "OWASP ZAP", "Docker"],
    repoUrl: "https://github.com/example/devsecops-pipeline",
    featured: true
  }
];

const MOCK_SKILLS: Skill[] = [
  { id: 1, name: "Kubernetes", category: "DevOps", proficiency: 85, icon: "Container" },
  { id: 2, name: "Docker", category: "DevOps", proficiency: 90, icon: "Box" },
  { id: 3, name: "CI/CD (GitHub Actions)", category: "DevOps", proficiency: 90, icon: "Workflow" },
  { id: 4, name: "Penetration Testing", category: "Security", proficiency: 75, icon: "Shield" },
  { id: 5, name: "Network Security", category: "Security", proficiency: 80, icon: "Lock" },
  { id: 6, name: "Node.js", category: "Backend", proficiency: 70, icon: "Server" },
  { id: 7, name: "Python", category: "Backend", proficiency: 85, icon: "Code" },
  { id: 8, name: "Terraform", category: "DevOps", proficiency: 70, icon: "Cloud" },
];

const MOCK_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Security Intern",
    company: "CyberCorp Inc.",
    duration: "2024 - Present",
    description: "Assisting in penetration testing, monitoring SIEM logs, and automating threat detection scripts."
  },
  {
    id: 2,
    role: "DevOps Student",
    company: "University Lab",
    duration: "2022 - 2024",
    description: "Managed campus linux servers, set up automated backup solutions, and taught workshops on Git and Docker."
  }
];

const MOCK_EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Master en Sécurité Informatique",
    school: "École Supérieure d'Informatique",
    duration: "2024 - 2026",
    description: "Spécialisation en DevSecOps, cryptographie appliquée et sécurité des infrastructures cloud."
  },
  {
    id: 2,
    degree: "Licence en Informatique",
    school: "Université de Technologie",
    duration: "2021 - 2024",
    description: "Bases de l'informatique, administration systèmes Linux et réseaux."
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

export function useSendMessage() {
  return {
    mutateAsync: async (data: any) => {
      console.log("Mock message sent:", data);
      return { success: true };
    },
    isPending: false
  };
}