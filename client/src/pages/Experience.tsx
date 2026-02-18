import { useEffect } from "react";
import { useExperience, useEducation, useCertifications } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion } from "framer-motion";
import { 
  GraduationCap, Download, Award, ExternalLink, Briefcase, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export default function Experience() {
  const { data: experience, isLoading: expLoading } = useExperience();
  const { data: education, isLoading: eduLoading } = useEducation();
  const { data: certifications, isLoading: certsLoading } = useCertifications();
  const { t, language } = useLanguage();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (expLoading || eduLoading || certsLoading) return null;

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-5xl mx-auto">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-mono"
        >
          <span className="text-primary">&gt;</span> ./experience_and_certs
        </motion.h1>
      </div>

      <div className="mb-20">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-8 font-mono flex items-center gap-4"
        >
          <span className="text-primary">&gt;</span> ./experience_log
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
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
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-muted/50 text-xs font-mono text-muted-foreground mb-4 border border-border">
                <Calendar className="w-3 h-3" />
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
          className="text-3xl font-bold mb-8 font-mono flex items-center gap-4"
        >
          <span className="text-secondary">&gt;</span> ./education_history
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
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

      <div className="mb-20">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-12 font-mono flex items-center gap-4"
        >
          <span className="text-primary">&gt;</span> ./certifications
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </motion.h2>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications?.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group h-full w-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary/10 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition duration-700" />
              
              <div className="relative h-full flex flex-col bg-black/40 border border-white/5 rounded-2xl p-4 backdrop-blur-3xl transition-all duration-500 group-hover:border-primary/20 group-hover:bg-black/50 shadow-lg overflow-hidden">
                <div className="absolute top-4 left-5 font-mono text-[8px] text-muted-foreground/30 group-hover:text-primary/30 transition-colors">
                  ID_{cert.id.toString().padStart(3, '0')}
                </div>

                <div className="relative mt-2 mb-6 flex justify-center h-[180px] items-center">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  {cert.credlyId ? (
                    <div className="scale-[0.85] origin-center group-hover:scale-[0.95] transition-transform duration-700 drop-shadow-[0_0_20px_rgba(34,197,94,0.1)] filter contrast-110 brightness-105">
                      <div 
                        data-iframe-width="120" 
                        data-iframe-height="240" 
                        data-share-badge-id={cert.credlyId} 
                        data-share-badge-host="https://www.credly.com"
                      />
                    </div>
                  ) : (
                    <Award className="w-8 h-8 text-primary opacity-20" />
                  )}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="space-y-1.5 text-center">
                    <h3 className="text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {cert.name[language]}
                    </h3>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[10px] font-semibold text-primary/60 tracking-wider uppercase">{cert.issuer}</span>
                      <span className="text-[8px] font-mono text-muted-foreground/50 uppercase tracking-widest">{cert.date}</span>
                    </div>
                  </div>

                  {cert.link && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full rounded-lg bg-white/5 border border-white/5 hover:bg-primary hover:text-primary-foreground group/btn h-8 transition-all duration-300 relative overflow-hidden" 
                      asChild
                    >
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <span className="flex items-center gap-2 font-bold uppercase text-[8px] tracking-[0.2em] relative z-10">
                          {language === "fr" ? "Vérifier" : "Verify"}
                          <ExternalLink className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
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
              <a href="/CV_CyberStudent_FR.pdf" target="_blank">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                {t("cv.french")}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 group" asChild>
              <a href="/CV_CyberStudent_EN.pdf" target="_blank">
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
