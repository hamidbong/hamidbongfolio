import { useSkills, type Skill } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion } from "framer-motion";
import { 
  Shield, Server, Terminal, Database, Cloud, Lock, Code, Cpu, 
  Box, Workflow, Settings, GitBranch, SearchCode, ShieldCheck, Bug, Container,
  Coffee, Eye, Activity, ShieldAlert, Award, Layers, ArrowRight, Github
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const icons: Record<string, any> = {
  Shield, Server, Terminal, Database, Cloud, Lock, Code, Cpu,
  Box, Workflow, Settings, GitBranch, SearchCode, ShieldCheck, Bug, Container,
  Coffee, Eye, Activity, ShieldAlert, Award
};

export default function Skills() {
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  if (skillsLoading) return null;

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleProjectLink = (projectId: number) => {
    setLocation("/projects");
    window.location.hash = `project-${projectId}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-5xl mx-auto">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-mono"
        >
          <span className="text-secondary">&gt;</span> ./capabilities
        </motion.h1>
      </div>

      <div className="grid gap-8">
        {Object.entries(groupedSkills || {}).map(([category, categorySkills], idx) => (
          <TerminalCard 
            key={category} 
            title={`~/skills/${category.toLowerCase()}`}
            delay={idx * 0.1}
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-secondary rounded-sm"/>
                {category}
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(categorySkills as Skill[]).map((skill) => {
                const Icon = skill.icon && icons[skill.icon] ? icons[skill.icon] : Code;
                return (
                  <motion.div 
                    key={skill.id} 
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group/skill flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-muted group-hover/skill:bg-primary/10 transition-colors">
                          <Icon className="w-6 h-6 text-muted-foreground group-hover/skill:text-primary transition-colors" />
                        </div>
                        <span className="font-bold text-sm tracking-tight">{skill.name}</span>
                      </div>
                      <span className={cn(
                        "text-[11px] px-2.5 py-1 rounded-full font-mono border transition-colors",
                        skill.level[language].toLowerCase().includes("advanced") || skill.level[language].toLowerCase().includes("avancé")
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : skill.level[language].toLowerCase().includes("intermediate") || skill.level[language].toLowerCase().includes("intermédiaire")
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                      )}>
                        {skill.level[language]}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {skill.description[language]}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                        <Layers className="w-3 h-3 text-secondary/60" />
                        <span>{skill.projectCount} {language === "fr" ? "projets" : "projects"}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {skill.relatedProjectId && (
                          <button 
                            onClick={() => handleProjectLink(skill.relatedProjectId!)}
                            className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-primary hover:underline group/link"
                          >
                            {language === "fr" ? "Projet" : "Project"}
                            <ArrowRight className="w-2.5 h-2.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                        {skill.projectLink && (
                          <a 
                            href={skill.projectLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github className="w-2.5 h-2.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TerminalCard>
        ))}
      </div>
    </div>
  );
}
