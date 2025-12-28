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
  },
  {
    id: 4,
    title: "Déploiement d'Application Web Hautement Disponible avec Ansible et NGINX",
    description: "Automatisation du déploiement d'une application web avec Ansible, NGINX et Bind9 pour une architecture hautement disponible",
    techStack: ["Ansible", "NGINX", "Bind9", "Linux"],
    repoUrl: "https://github.com/hamidbong/ansible-loadbalancer.git",
    featured: true
  }

];

const MOCK_SKILLS: Skill[] = [
  { id: 1, name: "Kubernetes", category: "DevOps", proficiency: 85, icon: "Container" },
  { id: 2, name: "Docker", category: "DevOps", proficiency: 90, icon: "Box" },
  { id: 3, name: "CI/CD (Jenkins)", category: "DevOps", proficiency: 90, icon: "Workflow" },
  { id: 4, name: "Penetration Testing", category: "Security", proficiency: 75, icon: "Shield" },
  { id: 5, name: "Network Security", category: "Security", proficiency: 80, icon: "Lock" },
  { id: 6, name: "SonarQube", category: "DevSecOps", proficiency: 70, icon: "Lock" },
  { id: 7, name: "OWASP Check", category: "DevSecOps", proficiency: 70, icon: "Lock" },
  { id: 8, name: "Trivy", category: "DevSecOps", proficiency: 70, icon: "Lock" },
  { id: 9, name: "Python", category: "Backend", proficiency: 85, icon: "Code" },
  { id: 10, name: "Terraform", category: "DevOps", proficiency: 70, icon: "Cloud" },
  { id: 11, name: "Ansible", category: "DevOps", proficiency: 75, icon: "Settings" },
  { id: 12, name: "Linux", category: "System", proficiency: 85, icon: "Server" },
  { id: 13, name: "Git", category: "DevOps", proficiency: 90, icon: "GitBranch" },
  { id: 14, name: "OpenStack", category: "Cloud", proficiency: 70, icon: "Cloud" }

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
    role: "DevSecOps Intern",
    company: "University Lab",
    duration: "2024 - 2025",
    description: "This thesis focuses on the implementation of an automated deployment and a secure CI/CD pipeline for an application based on a microservices architecture, deployed on a cloud infrastructure built on OpenStack. The proposed solution relies on containerization using Docker and orchestration through Kubernetes to enable efficient and scalable service management. Infrastructure provisioning and configuration are automated using Terraform and Ansible, ensuring reproducibility and consistency across environments. A DevSecOps approach is adopted, integrating security analysis tools and automated testing into the CI/CD pipeline in order to identify vulnerabilities in source code, dependencies, and container images. Secure exposure of the microservices is provided through an NGINX reverse proxy, configured with SSL/TLS encryption, a Web Application Firewall (WAF), and traffic rate-limiting mechanisms. Finally, infrastructure monitoring is ensured through Prometheus and Grafana, offering visibility into the health of the Kubernetes cluster and the availability of deployed services."
  },
  {
    id: 3,
    role: "Cloud Security Intern",
    company: "Solutec Nabeul",
    duration: "02/2022 - 05/2023",
    description: "Bachelor's degree end-of-study project, focused on deploying and Setting up a defense system for a private cloud (securing cloud infrastructure). Design and implementation of a multi-layered defense system for a private cloud, including host and network intrusion detection with Wazuh and Suricata, packet filtering via firewall, as well as real-time monitoring using Prometheus and Grafana. The system helps automatically detect, alert and block attacks such as network scans, brute force, SQL injections and DDoS attacks, validated by controlled attack tests. This project is part of a DevSecOps approach, guaranteeing the security, resilience and visibility of private cloud infrastructures."
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