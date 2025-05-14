import React from 'react';
import {
  Home,
  User,
  LogOut,
  Mail,
  BookOpen,
  Calendar,
  Heart,
  HeartPulse,
  ShieldCheck,
  Menu,
  Users
} from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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
      <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-mindease-accent drop-shadow-sm">Mind</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-mindease-primary drop-shadow-sm">Ease</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
          {!user ? (
            <>
              <Link to="/" className="px-2 py-1 hover:text-pink-600 transition-colors">Home</Link>
              <Link to="/about" className="px-2 py-1 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/contact" className="px-2 py-1 hover:text-blue-600 transition-colors">Contact</Link>
              <Link to="/blog" className="px-2 py-1 hover:text-pink-500 transition-colors">Blog</Link>
              <div className="flex gap-2 ml-2">
                <Link to="/login">
                  <Button variant="outline" className="rounded-full border-pink-300 hover:bg-pink-100 text-pink-700 px-4 py-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full bg-pink-400 hover:bg-pink-500 text-white px-4 py-2">
                    Register
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="px-2 py-1 hover:text-pink-600 transition-colors">Home</Link>
              <Link to="/dashboard" className="px-2 py-1 hover:text-purple-600 transition-colors">Dashboard</Link>
              <Link to="/mental-tracker" className="px-2 py-1 hover:text-blue-600 transition-colors">Mood Tracker</Link>
              <Link to="/appointments" className="px-2 py-1 hover:text-pink-500 transition-colors">Appointments</Link>
              <Link to="/blog" className="px-2 py-1 hover:text-purple-500 transition-colors">Blog</Link>
              <Link to="/community" className="px-2 py-1 hover:text-blue-500 transition-colors">Community</Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-1 hover:bg-pink-50">
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
                      <p className="text-xs text-muted-foreground break-words">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin() && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive hover:bg-red-50 focus:bg-red-50"
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
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </SheetTrigger>
         <SheetContent side="right" className="bg-white p-6 w-full max-w-xs min-h-screen flex flex-col">
  <nav className="flex flex-col gap-4 h-full">
    {!user ? (
      <>
        <div className="space-y-1">
          <p className="text-xs uppercase text-muted-foreground tracking-widest font-semibold">Navigation</p>
          <Link to="/" className="flex items-center gap-2 py-2 px-3 hover:bg-pink-50 rounded-lg">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link to="/about" className="flex items-center gap-2 py-2 px-3 hover:bg-purple-50 rounded-lg">
            <Heart className="w-4 h-4" />
            About
          </Link>
          <Link to="/contact" className="flex items-center gap-2 py-2 px-3 hover:bg-blue-50 rounded-lg">
            <Mail className="w-4 h-4" />
            Contact
          </Link>
          <Link to="/blog" className="flex items-center gap-2 py-2 px-3 hover:bg-pink-50 rounded-lg">
            <BookOpen className="w-4 h-4" />
            Blog
          </Link>
        </div>

        <hr className="my-4 border-pink-100" />

        <div className="space-y-2">
          <Link to="/login">
            <Button variant="outline" className="w-full rounded-full py-3">
              Sign In 🌸
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-full rounded-full bg-pink-400 hover:bg-pink-500 text-white py-3">
              Register ✨
            </Button>
          </Link>
        </div>
      </>
    ) : (
      <>
        {/* User Avatar Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-pink-50 rounded-xl shadow-sm">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground break-words">{user.email}</p>
          </div>
        </div>

        <p className="text-xs uppercase text-muted-foreground tracking-widest font-semibold">Quick Access</p>
        <Link to="/dashboard" className="flex items-center gap-2 py-2 px-3 hover:bg-purple-50 rounded-lg">
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
        <Link to="/mental-tracker" className="flex items-center gap-2 py-2 px-3 hover:bg-blue-50 rounded-lg">
          <HeartPulse className="w-4 h-4" />
          Mood Tracker
        </Link>
        <Link to="/appointments" className="flex items-center gap-2 py-2 px-3 hover:bg-pink-50 rounded-lg">
          <Calendar className="w-4 h-4" />
          Appointments
        </Link>
        <Link to="/blog" className="flex items-center gap-2 py-2 px-3 hover:bg-purple-50 rounded-lg">
          <BookOpen className="w-4 h-4" />
          Blog
        </Link>
        <Link to="/community" className="flex items-center gap-2 py-2 px-3 hover:bg-blue-50 rounded-lg">
          <Users className="w-4 h-4" />
          Community
        </Link>
        <Link to="/profile" className="flex items-center gap-2 py-2 px-3 hover:bg-pink-50 rounded-lg">
          <User className="w-4 h-4" />
          Profile
        </Link>

        {isAdmin() && (
          <Link to="/admin" className="flex items-center gap-2 py-2 px-3 hover:bg-red-50 text-red-600 rounded-lg">
            <ShieldCheck className="w-4 h-4" />
            Admin Dashboard
          </Link>
        )}

        <Button
          onClick={logout}
          className="mt-auto py-3 text-destructive hover:bg-red-50 justify-start w-full"
          variant="ghost"
        >
          <LogOut className="mr-2 h-5 w-5" />
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
