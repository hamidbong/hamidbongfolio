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
    title: "Déploiement d'Application Web Hautement Disponible avec Ansible et Nginx",
    description: "Automatisation du déploiement d'une application web avec Ansible, NGINX et Bind9 pour une architecture hautement disponible.",
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
  { id: 7, name: "Python", category: "Backend", proficiency: 60, icon: "Code" },
  { id: 8, name: "Terraform", category: "DevOps", proficiency: 70, icon: "Cloud" },
  { id: 9, name: "Ansible", category: "DevOps", proficiency: 70, icon: "Cloud" }
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

export function useProjects() {
  return { data: MOCK_PROJECTS, isLoading: false };
}

export function useSkills() {
  return { data: MOCK_SKILLS, isLoading: false };
}

export function useExperience() {
  return { data: MOCK_EXPERIENCE, isLoading: false };
}

import { useMutation } from "@tanstack/react-query";
import emailjs from "@emailjs/browser";

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      try {
        // Check if environment variables are loaded
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

        console.log("EmailJS Config Check:", {
          publicKey: publicKey ? "✓ Set" : "✗ Missing",
          serviceId: serviceId ? "✓ Set" : "✗ Missing",
          templateId: templateId ? "✓ Set" : "✗ Missing",
          recipientEmail: import.meta.env.VITE_RECIPIENT_EMAIL ? "✓ Set" : "✗ Missing"
        });

        if (!publicKey || !serviceId || !templateId) {
          throw new Error("EmailJS configuration is missing. Please check your .env file.");
        }

        // Initialize EmailJS with your public key
        emailjs.init(publicKey);

        const templateParams = {
          name: data.name,
          email: data.email,
          message: data.message,
          to_email: import.meta.env.VITE_RECIPIENT_EMAIL,
        };

        const result = await emailjs.send(
          serviceId,
          templateId,
          templateParams
        );

        return result;
      } catch (error: any) {
        console.error("EmailJS Error:", error);

        // Provide more specific error messages
        if (error?.text?.includes("Invalid service id")) {
          throw new Error("Invalid EmailJS service configuration. Please check your service ID.");
        } else if (error?.text?.includes("Invalid template id")) {
          throw new Error("Invalid EmailJS template configuration. Please check your template ID.");
        } else if (error?.text?.includes("Invalid public key")) {
          throw new Error("Invalid EmailJS public key. Please check your public key.");
        } else if (error?.text?.includes("rate limit")) {
          throw new Error("Email sending rate limit exceeded. Please try again later.");
        } else {
          throw new Error(error?.text || error?.message || "Failed to send message. Please try again.");
        }
      }
    },
  });
}
