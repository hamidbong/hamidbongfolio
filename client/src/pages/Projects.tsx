import { useProjects } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Code2 className="w-12 h-12 text-primary animate-spin" />
          <span className="font-mono text-muted-foreground animate-pulse">Loading modules...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-mono"
        >
          <span className="text-primary">&gt;</span> ./projects
        </motion.h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("projects.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project, idx) => (
          <TerminalCard 
            key={project.id} 
            title={`~/projects/${project.title[language].toLowerCase().replace(/\s+/g, '-')}`}
            delay={idx * 0.1}
            className="h-full flex flex-col"
          >
            {project.imageUrl && (
              <div className="mb-6 rounded-lg overflow-hidden border border-border/50 group">
                <img 
                  src={project.imageUrl} 
                  alt={project.title[language]}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {project.title[language]}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                {project.description[language]}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors ml-auto"
                  >
                    Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>

      {(!projects || projects.length === 0) && (
        <div className="text-center py-20 text-muted-foreground font-mono">
          // No projects found
        </div>
      )}
    </div>
  );
}
