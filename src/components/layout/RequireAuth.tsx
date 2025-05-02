
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface RequireAuthProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to access this page");
    }
    
    if (!loading && requireAdmin && user && !isAdmin()) {
      toast.error("You need admin privileges to access this page");
    }
  }, [loading, user, requireAdmin, isAdmin]);

  if (loading) {
    // Return loading state while auth is being checked
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-mindease-primary mb-4"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin()) {
    // Redirect to dashboard if not admin
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If authenticated (and admin if required), render the children
  return <>{children}</>;
};

export default RequireAuth;
