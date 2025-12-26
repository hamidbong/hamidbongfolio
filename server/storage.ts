import { db } from "./db";
import {
  projects, skills, experience, messages,
  type InsertProject, type InsertSkill, type InsertExperience, type InsertMessage,
  type Project, type Skill, type Experience, type Message
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  getExperience(): Promise<Experience[]>;
  createExperience(exp: InsertExperience): Promise<Experience>;
  
  createMessage(msg: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.createdAt);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async createExperience(exp: InsertExperience): Promise<Experience> {
    const [newExp] = await db.insert(experience).values(exp).returning();
    return newExp;
  }

  async createMessage(msg: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(msg).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
