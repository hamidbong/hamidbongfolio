import { usePublications } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Tag, ChevronDown, ChevronUp, Github } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export default function Publications() {
  const { data: publications, isLoading } = usePublications();
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) return null;

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-5xl mx-auto">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-mono"
        >
          <span className="text-primary">&gt;</span> ./publications
        </motion.h1>
        <p className="text-muted-foreground">
          {t("publications.subtitle")}
        </p>
      </div>

      <div className="grid gap-8">
        {publications?.map((pub, idx) => {
          const isExpanded = expandedId === pub.id;
          
          return (
            <TerminalCard 
              key={pub.id} 
              title={`~/blog/${pub.title[language].toLowerCase().replace(/\s+/g, '-')}.md`}
              delay={idx * 0.1}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {pub.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3 h-3" />
                    5 min read
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {pub.title[language]}
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {pub.excerpt[language]}
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-foreground/90 whitespace-pre-wrap font-sans border-t border-border/20 mt-4">
                        {pub.content[language]}
                      </div>
                      {pub.githubUrl && (
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                            asChild
                          >
                            <a href={pub.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                              {t("publications.github_tutorial")}
                            </a>
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4 flex items-center justify-between border-t border-border/40">
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                    className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        {t("publications.read_less")}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        {t("publications.read_more")}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TerminalCard>
          );
        })}
      </div>
    </div>
  );
}
