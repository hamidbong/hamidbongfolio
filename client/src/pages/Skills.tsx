import { useSkills, useExperience, type Skill } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion } from "framer-motion";
import { Shield, Server, Terminal, Database, Cloud, Lock, Code, Cpu } from "lucide-react";

const icons: Record<string, any> = {
  Shield, Server, Terminal, Database, Cloud, Lock, Code, Cpu
};

export default function Skills() {
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: expLoading } = useExperience();

  if (skillsLoading || expLoading) return null;

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
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {categorySkills.map((skill) => {
                const Icon = skill.icon && icons[skill.icon] ? icons[skill.icon] : Code;
                return (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="font-mono text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                      />
                    </div>
                  </div>
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
                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                <span className="hidden sm:block text-muted-foreground">•</span>
                <span className="text-lg text-primary">{exp.company}</span>
              </div>
              
              <div className="inline-block px-3 py-1 rounded bg-muted/50 text-xs font-mono text-muted-foreground mb-4 border border-border">
                {exp.duration}
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
