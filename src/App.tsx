import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/layout/RequireAuth";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// User Pages
import Dashboard from "./pages/user/Dashboard";
import MentalTracker from "./pages/user/MentalTracker";
import Appointments from "./pages/user/Appointments";

// Blog Pages
import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blog/BlogPost";

// Community Pages
import Community from "./pages/community/Community";

// Static Pages
import About from "./pages/static/About";
import Contact from "./pages/static/Contact";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";

// Other Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Landing page redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* User Routes (Protected) */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/mental-tracker" element={
              <RequireAuth>
                <AppLayout>
                  <MentalTracker />
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/appointments" element={
              <RequireAuth>
                <AppLayout>
                  <Appointments />
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/community" element={
              <RequireAuth>
                <AppLayout>
                  <Community />
                </AppLayout>
              </RequireAuth>
            } />
            
            {/* Public Routes */}
            <Route path="/blog" element={
              <AppLayout>
                <Blog />
              </AppLayout>
            } />
            
            <Route path="/blog/:id" element={
              <AppLayout>
                <BlogPost />
              </AppLayout>
            } />
            
            <Route path="/about" element={
              <AppLayout>
                <About />
              </AppLayout>
            } />
            
            <Route path="/contact" element={
              <AppLayout>
                <Contact />
              </AppLayout>
            } />
            
            {/* Admin Routes (Protected + Admin Only) */}
            <Route path="/admin" element={
              <RequireAuth requireAdmin={true}>
                <AdminLayout />
              </RequireAuth>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              {/* Additional admin routes would be added here */}
            </Route>
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
