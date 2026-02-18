import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { LanguageProvider } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/LanguageToggle";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Experience from "@/pages/Experience";
import Publications from "@/pages/Publications";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/skills" component={Skills} />
      <Route path="/experience" component={Experience} />
      <Route path="/publications" component={Publications} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">
          <div className="fixed top-6 right-6 z-[60]">
            <LanguageToggle />
          </div>
          <Router />
          <Navigation />
          <Toaster />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
