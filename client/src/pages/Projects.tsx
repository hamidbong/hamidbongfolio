import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { Github, ExternalLink, Code2, Plus, X, Maximize2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedDesc, setExpandedDesc] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [location]);

  const toggleExpand = (id: number) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDesc = (id: number) => {
    setExpandedDesc(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              <img
                src={selectedImage}
                alt="Project Fullscreen"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div key={project.id} id={`project-${project.id}`} className="scroll-mt-24">
            <TerminalCard 
              title={`~/projects/${project.title[language].toLowerCase().replace(/\s+/g, '-')}`}
              delay={idx * 0.1}
              className="h-full flex flex-col group"
            >
              {(project.imageUrl || project.images) && (
                <div className="mb-6 space-y-4">
                  <div 
                    className="rounded-lg overflow-hidden border border-border/50 bg-muted/20 aspect-video relative cursor-zoom-in group/img"
                    onClick={() => setSelectedImage(project.imageUrl || (project.images?.[0] ?? null))}
                  >
                    <img 
                      src={project.imageUrl || (project.images?.[0])} 
                      alt={project.title[language]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white/70" />
                    </div>
                  </div>

                  {project.images && project.images.length > 1 && (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {expandedProjects[project.id] && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="grid grid-cols-2 gap-2 overflow-hidden"
                          >
                            {project.images.slice(1).map((img, i) => (
                              <div 
                                key={i} 
                                className="rounded-lg overflow-hidden border border-border/50 bg-muted/20 aspect-video relative cursor-zoom-in group/subimg"
                                onClick={() => setSelectedImage(img)}
                              >
                                <img 
                                  src={img} 
                                  alt={`${project.title[language]} ${i + 2}`}
                                  className="w-full h-full object-cover group-hover/subimg:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/subimg:opacity-100 transition-opacity flex items-center justify-center">
                                  <Maximize2 className="w-4 h-4 text-white/70" />
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full gap-2 font-mono text-xs hover:text-primary border border-dashed border-border/50"
                        onClick={() => toggleExpand(project.id)}
                      >
                        <Plus className={cn("w-3 h-3 transition-transform duration-300", expandedProjects[project.id] && "rotate-45")} />
                        {expandedProjects[project.id] ? (language === "fr" ? "Voir moins d'images" : "View less images") : (language === "fr" ? "Voir plus d'images" : "View more images")}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title[language]}
                </h3>
                <div className="relative">
                  <p 
                    id={`project-desc-${project.id}`}
                    className={cn(
                      "text-muted-foreground mb-2 text-sm leading-relaxed transition-all duration-300",
                      !expandedDesc[project.id] && "line-clamp-3"
                    )}
                  >
                    {project.description[language]}
                  </p>
                  {project.description[language].length > 130 && (
                    <button
                      onClick={() => toggleDesc(project.id)}
                      className="text-primary text-xs font-mono hover:underline flex items-center gap-1 mb-4"
                    >
                      {expandedDesc[project.id] ? (
                        <>
                          <ChevronUp className="w-3 h-3" />
                          {language === "fr" ? "Réduire" : "Show less"}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3" />
                          {language === "fr" ? "Lire la suite" : "Read more"}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 mt-auto">
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
          </div>
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
