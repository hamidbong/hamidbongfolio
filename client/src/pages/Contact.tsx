import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-portfolio";
import { TerminalCard } from "@/components/TerminalCard";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type InsertMessage = z.infer<typeof insertMessageSchema>;

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
    <div className="min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
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
            Have a project in mind or want to discuss security? Send an encrypted transmission below.
          </p>
        </div>

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
  );
}
