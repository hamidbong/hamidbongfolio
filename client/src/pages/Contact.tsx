import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type InsertMessage = z.infer<typeof insertMessageSchema>;

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/hamidbong", color: "hover:text-white" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/hamid-bong-brahim", color: "hover:text-[#0A66C2]" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/HamidBong", color: "hover:text-[#1DA1F2]" },
];


export default function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const onSubmit = (data: InsertMessage) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Encrypted & Sent",
          description: "Thank you for reaching out. I'll get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Transmission Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"
        >
          <Mail className="w-8 h-8" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-mono"
        >
          <span className="text-primary">&gt;</span> ./initialize_comms
        </motion.h1>
        <p className="text-muted-foreground">
          Ready to discuss security or a new project? Choose your preferred communication channel.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <TerminalCard title="~/identity/socials">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">var_phone</p>
                  <p className="font-bold">+216 48 03 12 31</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50",
                      social.color
                    )}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </TerminalCard>

          <TerminalCard title="~/status">
            <div className="flex items-center gap-3 text-sm font-mono">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-500">SYSTEMS_ONLINE</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Accepting new security challenges and DevOps missions. Current availability: <span className="text-foreground">Currently available</span>.
            </p>
          </TerminalCard>
        </div>

        <div className="lg:col-span-2">
          <TerminalCard title="~/bin/send-mail.sh">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-muted-foreground">var_name</label>
                  <input
                    {...form.register("name")}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-muted-foreground/30"
                    placeholder='John Doe'
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-xs font-mono">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono text-muted-foreground">var_email</label>
                  <input
                    {...form.register("email")}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-muted-foreground/30"
                    placeholder='john@example.com'
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs font-mono">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-muted-foreground">var_message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono placeholder:text-muted-foreground/30 resize-none"
                  placeholder='echo "Hello World"'
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-xs font-mono">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={sendMessage.isPending}
                className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {sendMessage.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Encrypting...
                  </>
                ) : sendMessage.isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Sent Successfully
                  </>
                ) : (
                  <>
                    Execute Transmission
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </TerminalCard>
        </div>
      </div>
    </div>
  );
}