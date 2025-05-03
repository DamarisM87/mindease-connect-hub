import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Menu } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-b border-pink-200 shadow-sm backdrop-blur-md">
      <div className="mindease-container flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-1">
          <span className="text-2xl font-extrabold text-mindease-accent drop-shadow-sm">Mind</span>
          <span className="text-2xl font-extrabold text-mindease-primary drop-shadow-sm">Ease</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {!user ? (
            <>
              <Link to="/" className="hover:text-pink-600 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-purple-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
              <Link to="/blog" className="hover:text-pink-500 transition-colors">Blog</Link>
              <Link to="/login">
                <Button variant="outline" className="rounded-full border-pink-300 hover:bg-pink-100 text-pink-700">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full bg-pink-400 hover:bg-pink-500 text-white">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-pink-600 transition-colors">Home</Link>
              <Link to="/dashboard" className="hover:text-purple-600 transition-colors">Dashboard</Link>
              <Link to="/mental-tracker" className="hover:text-blue-600 transition-colors">Mood Tracker</Link>
              <Link to="/appointments" className="hover:text-pink-500 transition-colors">Appointments</Link>
              <Link to="/blog" className="hover:text-purple-500 transition-colors">Blog</Link>
              <Link to="/community" className="hover:text-blue-500 transition-colors">Community</Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl shadow-md" align="end">
                  <DropdownMenuLabel>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="text-muted-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-pink-50 p-6">
            <nav className="flex flex-col gap-4">
              {!user ? (
                <>
                  <Link to="/about" className="hover:text-pink-500">About Us</Link>
                  <Link to="/contact" className="hover:text-purple-500">Contact</Link>
                  <Link to="/blog" className="hover:text-blue-500">Blog</Link>
                  <Link to="/login">
                    <Button variant="outline" className="rounded-full w-full mt-2">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full w-full mt-2 bg-pink-400 hover:bg-pink-500 text-white">Register</Button>
                  </Link>
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
                  <Link to="/dashboard" className="hover:text-purple-500">Dashboard</Link>
                  <Link to="/mental-tracker" className="hover:text-blue-500">Mood Tracker</Link>
                  <Link to="/appointments" className="hover:text-pink-500">Appointments</Link>
                  <Link to="/blog" className="hover:text-purple-500">Blog</Link>
                  <Link to="/community" className="hover:text-blue-500">Community</Link>
                  <Link to="/profile" className="hover:text-pink-500">Profile</Link>
                  {isAdmin() && (
                    <Link to="/admin" className="hover:text-red-500">Admin Dashboard</Link>
                  )}
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="mt-4 text-destructive hover:bg-red-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
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
