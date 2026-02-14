import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import Catalogs from "./pages/Catalogs";
import CatalogDetail from "./pages/CatalogDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import CourseGip from "./pages/CourseGip";
import Faq from "./pages/Faq";
import Contacts from "./pages/Contacts";
import Brief from "./pages/Brief";
import Privacy from "./pages/Privacy";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children, onOpenChat }: { children: React.ReactNode; onOpenChat: () => void }) => (
  <>
    <Header onOpenChat={onOpenChat} />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={
              <>
                <PublicLayout onOpenChat={() => setChatOpen(true)}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/process" element={<Process />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/catalogs" element={<Catalogs />} />
                    <Route path="/catalogs/:slug" element={<CatalogDetail />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:slug" element={<NewsDetail />} />
                    <Route path="/course-gip" element={<CourseGip />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/brief" element={<Brief />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PublicLayout>
                <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
