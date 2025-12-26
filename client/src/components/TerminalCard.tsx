import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TerminalCard({ title, children, className, delay = 0 }: TerminalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "cyber-card bg-black/40 border border-border/40",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/20 border-b border-border/40">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="ml-2 font-mono text-xs text-muted-foreground flex-1 text-center pr-12">
          {title}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}
