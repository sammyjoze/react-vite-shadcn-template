import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import AdminMenu from "@/components/AdminMenu";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Messages from "./pages/Messages";
import Files from "./pages/Files";
// import Pricing from "./pages/Pricing"; // Removed
import PricingNew from "./pages/PricingNew";
import NotFound from "./pages/NotFound";
import { PersistentLayout } from "./components/PersistentLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Sonner />
            <BrowserRouter>
              <AdminMenu />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<PricingNew />} />
                <Route path="/dashboard" element={
                  <PersistentLayout>
                    <Dashboard />
                  </PersistentLayout>
                } />
                <Route path="/admin" element={
                  <PersistentLayout>
                    <Admin />
                  </PersistentLayout>
                } />
                <Route path="/settings" element={
                  <PersistentLayout>
                    <Settings />
                  </PersistentLayout>
                } />
                <Route path="/projects" element={
                  <PersistentLayout>
                    <Projects />
                  </PersistentLayout>
                } />
                <Route path="/analytics" element={
                  <PersistentLayout>
                    <Analytics />
                  </PersistentLayout>
                } />
                <Route path="/team" element={
                  <PersistentLayout>
                    <Team />
                  </PersistentLayout>
                } />
                <Route path="/messages" element={
                  <PersistentLayout>
                    <Messages />
                  </PersistentLayout>
                } />
                <Route path="/files" element={
                  <PersistentLayout>
                    <Files />
                  </PersistentLayout>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
