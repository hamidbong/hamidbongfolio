import { useSkills, useExperience, useEducation, type Skill } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion } from "framer-motion";
import { 
  Shield, Server, Terminal, Database, Cloud, Lock, Code, Cpu, 
  GraduationCap, Download, Box, Workflow, Settings, GitBranch,
  SearchCode, ShieldCheck, Bug, Container, Coffee, Eye, Activity, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

const icons: Record<string, any> = {
  Shield, Server, Terminal, Database, Cloud, Lock, Code, Cpu,
  Box, Workflow, Settings, GitBranch, SearchCode, ShieldCheck, Bug, Container,
  Coffee, Eye, Activity, ShieldAlert
};

export default function Skills() {
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: expLoading } = useExperience();
  const { data: education, isLoading: eduLoading } = useEducation();
  const { t, language } = useLanguage();

  if (skillsLoading || expLoading || eduLoading) return null;

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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

      <div className="grid gap-8 mb-20">
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
              {categorySkills.map((skill) => {
                const Icon = skill.icon && icons[skill.icon] ? icons[skill.icon] : Code;
                return (
                  <motion.div 
                    key={skill.id} 
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group/skill"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted group-hover/skill:bg-primary/10 transition-colors">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover/skill:text-primary transition-colors" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{skill.name}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        <span>Proficiency</span>
                        <span className="text-primary">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/40 rounded-full relative z-10"
                        />
                        <div className="absolute inset-0 bg-primary/5 blur-sm" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TerminalCard>
        ))}
      </div>

      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-8 font-mono"
        >
          <span className="text-primary">&gt;</span> ./experience_log
        </motion.h2>
        
        <div className="relative border-l-2 border-muted pl-8 ml-4 space-y-12">
          {experience?.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-xl font-bold text-foreground">{exp.role[language]}</h3>
                <span className="hidden sm:block text-muted-foreground">•</span>
                <span className="text-lg text-primary">{exp.company}</span>
              </div>
              
              <div className="inline-block px-3 py-1 rounded bg-muted/50 text-xs font-mono text-muted-foreground mb-4 border border-border">
                {exp.duration}
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {exp.description[language]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-8 font-mono"
        >
          <span className="text-secondary">&gt;</span> ./education_history
        </motion.h2>
        
        <div className="grid gap-6">
          {education?.map((edu, idx) => (
            <TerminalCard 
              key={edu.id}
              title={`~/edu/${edu.degree[language].toLowerCase().replace(/\s+/g, '-')}`}
              delay={idx * 0.1}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{edu.degree[language]}</h3>
                  </div>
                  <p className="text-primary font-medium mb-1">{edu.school}</p>
                  <p className="text-sm text-muted-foreground font-mono mb-4">{edu.duration}</p>
                  <p className="text-muted-foreground text-sm max-w-2xl">{edu.description[language]}</p>
                </div>
              </div>
            </TerminalCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-12 bg-primary/5 rounded-2xl border border-primary/20 border-dashed">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4 font-mono">{t("education.title")}</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t("education.download_cv_desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" className="gap-2 group" asChild>
              <a href="/CVBrahimHamidBong_FR.pdf" target="_blank">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                {t("cv.french")}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 group" asChild>
              <a href="/CVBrahimHamidBong_EN.pdf" target="_blank">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                {t("cv.english")}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
