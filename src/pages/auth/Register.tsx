import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 relative overflow-hidden">

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none animate-float">
        <div className="absolute w-16 h-16 bg-white/20 rounded-full top-10 left-10 blur-lg animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-white/20 rounded-full bottom-20 right-16 blur-xl animate-bounce"></div>
        <div className="absolute w-10 h-10 bg-white/20 rounded-full top-1/2 left-1/3 blur-md animate-ping"></div>
      </div>

      <div className="w-full max-w-md z-10 animate-fade-in-up">
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-md rounded-2xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <span className="text-4xl font-extrabold text-mindease-accent animate-bounce">Mind</span>
              <span className="text-4xl font-extrabold text-mindease-primary animate-bounce delay-200">Ease</span>
            </div>
            <CardTitle className="text-2xl text-center">Create a Cuddle-Soft Account</CardTitle>
            <CardDescription className="text-center">
              Sign up and start your cozy mental wellness journey 💖
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleRegister}>
              {error && (
                <div className="p-3 rounded bg-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating your happy space...
                  </>
                ) : (
                  'Sign up & start smiling 😊'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already part of the fam?{' '}
              <Link to="/login" className="text-mindease-accent hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
