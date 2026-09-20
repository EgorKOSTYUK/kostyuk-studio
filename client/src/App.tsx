import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import VisheCase from "@/pages/VisheCase";
import { PersonalDataConsent, PrivacyPolicy } from "@/pages/LegalDocuments";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { LeadFormProvider } from "./contexts/LeadFormContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/cases/vishe.edu": "Vishe.edu — кейс образовательной платформы | Kostyuk.Studio",
      "/cases/vishe": "Vishe.edu — кейс образовательной платформы | Kostyuk.Studio",
      "/privacy": "Политика обработки персональных данных | Kostyuk.Studio",
      "/personal-data-consent": "Согласие на обработку персональных данных | Kostyuk.Studio",
    };
    document.title = titles[location] ?? "Kostyuk.Studio — сайты и веб-продукты для бизнеса";

    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior, block: "start" });
      });
    });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cases/vishe.edu" component={VisheCase} />
        <Route path="/cases/vishe" component={VisheCase} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/personal-data-consent" component={PersonalDataConsent} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" switchable>
        <TooltipProvider>
          <Toaster />
          <LeadFormProvider>
            <Router />
          </LeadFormProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
