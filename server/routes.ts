import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Experience
  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data function (Internal use or called on startup)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Skills
    const skillsList = [
      { name: "Kubernetes", category: "DevOps", proficiency: 85, icon: "Container" },
      { name: "Docker", category: "DevOps", proficiency: 90, icon: "Box" },
      { name: "CI/CD (GitHub Actions)", category: "DevOps", proficiency: 90, icon: "Workflow" },
      { name: "Penetration Testing", category: "Security", proficiency: 75, icon: "Shield" },
      { name: "Network Security", category: "Security", proficiency: 80, icon: "Lock" },
      { name: "Node.js", category: "Backend", proficiency: 70, icon: "Server" },
      { name: "Python", category: "Backend", proficiency: 85, icon: "Code" },
      { name: "Terraform", category: "DevOps", proficiency: 70, icon: "Cloud" },
    ];
    for (const s of skillsList) await storage.createSkill(s);

    // Projects
    await storage.createProject({
      title: "Secure Kubernetes Cluster",
      description: "Automated deployment of a hardened Kubernetes cluster using Ansible and Terraform. Implemented network policies and RBAC.",
      techStack: ["Kubernetes", "Terraform", "Ansible", "AWS"],
      repoUrl: "https://github.com/example/k8s-hardened",
      featured: true
    });
    
    await storage.createProject({
      title: "Vulnerability Scanner",
      description: "A Python-based automated vulnerability scanner for internal networks. Generates reports on open ports and outdated services.",
      techStack: ["Python", "Nmap", "Security"],
      repoUrl: "https://github.com/example/vuln-scanner",
      featured: true
    });
    
    await storage.createProject({
      title: "DevSecOps Pipeline Demo",
      description: "Complete CI/CD pipeline with integrated SAST/DAST security checks using SonarQube and OWASP ZAP.",
      techStack: ["GitHub Actions", "SonarQube", "OWASP ZAP", "Docker"],
      repoUrl: "https://github.com/example/devsecops-pipeline",
      featured: true
    });

    // Experience
    await storage.createExperience({
      role: "Security Intern",
      company: "CyberCorp Inc.",
      duration: "2024 - Present",
      description: "Assisting in penetration testing, monitoring SIEM logs, and automating threat detection scripts."
    });
    
    await storage.createExperience({
      role: "DevOps Student",
      company: "University Lab",
      duration: "2022 - 2024",
      description: "Managed campus linux servers, set up automated backup solutions, and taught workshops on Git and Docker."
    });
  }
}
