import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 p-1 bg-muted/50 rounded-md border border-border/50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("fr")}
        className={`h-7 px-2 text-[10px] font-mono transition-all ${
          language === "fr" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-primary/10"
        }`}
      >
        FR
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`h-7 px-2 text-[10px] font-mono transition-all ${
          language === "en" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-primary/10"
        }`}
      >
        EN
      </Button>
    </div>
  );
}
