import { motion } from "framer-motion";

export function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-primary opacity-50"
        animate={{
          x: [-2, 2, -2],
          y: [1, -1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
          repeatType: "mirror",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-secondary opacity-50"
        animate={{
          x: [2, -2, 2],
          y: [-1, 1, -1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          repeatType: "mirror",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
