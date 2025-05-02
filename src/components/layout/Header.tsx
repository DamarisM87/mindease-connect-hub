
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  LogOut,
  Menu,
  XIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  
  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="mindease-container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-mindease-accent">Mind</span>
            <span className="text-2xl font-bold text-mindease-primary">Ease</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {!user ? (
            // Navigation links for guests
            <>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            // Navigation links for authenticated users
            <>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/mental-tracker" className="text-muted-foreground hover:text-foreground transition-colors">
                Mood Tracker
              </Link>
              <Link to="/appointments" className="text-muted-foreground hover:text-foreground transition-colors">
                Appointments
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full cursor-pointer">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
        
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Menu</span>
            </div>
            <nav className="flex flex-col gap-4">
              {!user ? (
                <>
                  <Link to="/about" className="py-2 hover:text-mindease-accent transition-colors">
                    About Us
                  </Link>
                  <Link to="/contact" className="py-2 hover:text-mindease-accent transition-colors">
                    Contact
                  </Link>
                  <Link to="/blog" className="py-2 hover:text-mindease-accent transition-colors">
                    Blog
                  </Link>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard" className="py-2 hover:text-mindease-accent transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/mental-tracker" className="py-2 hover:text-mindease-accent transition-colors">
                    Mood Tracker
                  </Link>
                  <Link to="/appointments" className="py-2 hover:text-mindease-accent transition-colors">
                    Appointments
                  </Link>
                  <Link to="/blog" className="py-2 hover:text-mindease-accent transition-colors">
                    Blog
                  </Link>
                  <Link to="/community" className="py-2 hover:text-mindease-accent transition-colors">
                    Community
                  </Link>
                  <Link to="/profile" className="py-2 hover:text-mindease-accent transition-colors">
                    Profile
                  </Link>
                  {isAdmin() && (
                    <Link to="/admin" className="py-2 hover:text-mindease-accent transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="flex items-center justify-start px-2 mt-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
