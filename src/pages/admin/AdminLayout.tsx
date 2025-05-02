
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BarChart, 
  Settings, 
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Blog Management', href: '/admin/blog', icon: FileText },
    { name: 'Community', href: '/admin/community', icon: MessageSquare },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 md:flex-shrink-0 bg-mindease-light border-r">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-mindease-accent">Mind</span>
              <span className="text-xl font-bold text-mindease-primary">Ease</span>
              <span className="ml-2 text-xs bg-mindease-primary/20 text-mindease-primary px-2 py-0.5 rounded">
                Admin
              </span>
            </Link>
          </div>
          
          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  Administrator
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                    isActive
                      ? 'bg-mindease-primary/10 text-mindease-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-mindease-accent' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t mt-auto">
            <div className="flex flex-col">
              <Link to="/" className="text-xs text-muted-foreground mb-3 hover:text-foreground">
                Return to User Dashboard
              </Link>
              
              <Button variant="ghost" className="justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
