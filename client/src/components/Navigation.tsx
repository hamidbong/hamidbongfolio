import { Link, useLocation } from "wouter";
import { Shield, Terminal, User, Mail, Briefcase, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "./LanguageToggle";

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const links = [
    { href: "/", label: t("nav.home"), icon: Terminal },
    { href: "/projects", label: t("nav.projects"), icon: Briefcase },
    { href: "/skills", label: t("nav.skills"), icon: Shield },
    { href: "/publications", label: t("nav.blog"), icon: BookOpen },
    { href: "/contact", label: t("nav.contact"), icon: Mail },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      <div className="bg-background/80 backdrop-blur-lg border border-border/50 rounded-full px-4 py-3 shadow-2xl shadow-primary/5 flex items-center gap-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "relative px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 flex items-center gap-2 group",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span className="font-mono text-sm font-medium hidden sm:block">
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
