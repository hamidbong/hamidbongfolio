import { motion } from "framer-motion";
import { Shield, Lock, Server, Terminal as TerminalIcon, ChevronRight, Download, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { GlitchText } from "@/components/GlitchText";

import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-4 overflow-hidden grid-bg">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Intro */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for hire
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="text-foreground">Hello, I'm Hamid Bong</span>
              <br />
              <GlitchText text="CyberStudent" className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" />
            </h1>
            
            <div className="h-20 text-xl md:text-2xl text-muted-foreground font-mono">
              <span className="terminal-cursor">
                {t("home.title")}
              </span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            {t("home.subtitle")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/projects">
              <div className="cursor-pointer px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                {t("home.view_projects")} <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
            <Link href="/contact">
              <div className="cursor-pointer px-8 py-4 rounded-xl font-bold bg-muted hover:bg-muted/80 border border-border transition-all hover:scale-105 active:scale-95">
                {t("home.contact_me")}
              </div>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 pt-4 border-t border-border/50"
          >
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> CV / Resume
            </h3>
            <div className="flex gap-4">
              <a 
                href="/CVBrahimHamidBong_FR.pdf" 
                target="_blank"
                className="group flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                {t("cv.french")}
              </a>
              <span className="text-border">|</span>
              <a 
                href="/CVBrahimHamidBong_EN.pdf" 
                target="_blank"
                className="group flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-secondary transition-colors"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                {t("cv.english")}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual */}
        <div className="relative hidden lg:block">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10"
          />
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, label: "Network Security", color: "text-primary" },
              { icon: Lock, label: "Cryptography", color: "text-secondary" },
              { icon: Server, label: "Cloud Infra", color: "text-blue-500" },
              { icon: TerminalIcon, label: "DevOps", color: "text-purple-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * i + 0.5 }}
                className="bg-card/40 backdrop-blur-md border border-border/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 aspect-square hover:border-primary/50 transition-colors group"
              >
                <item.icon className={`w-12 h-12 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="font-mono font-bold text-center">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-50">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
