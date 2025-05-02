
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { forgotPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await forgotPassword(email);
      
      if (success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-mindease-light">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg animate-fade-in">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-3">
              <span className="text-3xl font-bold text-mindease-accent">Mind</span>
              <span className="text-3xl font-bold text-mindease-primary">Ease</span>
            </div>
            <CardTitle className="text-2xl text-center">Reset password</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Email sent!</h3>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>. 
                  Please check your inbox and spam folder.
                </p>
                <Button asChild className="w-full">
                  <Link to="/login">Return to sign in</Link>
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                
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
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          {!isSubmitted && (
            <CardFooter className="flex justify-center">
              <Link to="/login" className="text-sm flex items-center text-mindease-accent hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
