
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-mindease-primary/10 to-mindease-secondary/20 py-12 px-4">
      <div className="max-w-4xl w-full mx-auto text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <span className="text-5xl font-bold text-mindease-accent">Mind</span>
          <span className="text-5xl font-bold text-mindease-primary">Ease</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Your journey to better mental wellbeing starts here
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your mood, connect with therapists, and join a supportive community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-12">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="rounded-full bg-mindease-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <CardTitle>Mood Tracking</CardTitle>
            <CardDescription>
              Track patterns in your mental health with intuitive tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Identify trends and triggers by recording your daily mood, anxiety levels, and sleep quality with our easy-to-use mood journal.</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="rounded-full bg-mindease-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <CardTitle>Therapy Sessions</CardTitle>
            <CardDescription>
              Connect with qualified therapists virtually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Book and manage appointments with licensed mental health professionals who specialize in various therapeutic approaches.</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="rounded-full bg-mindease-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <CardTitle>Community Support</CardTitle>
            <CardDescription>
              Join a caring community for shared experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Participate in supportive discussions, share your journey, and connect with others navigating similar mental health experiences.</p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-md w-full">
        <Card className="border-2 border-mindease-primary/20">
          <CardHeader>
            <CardTitle>Get Started Today</CardTitle>
            <CardDescription>
              Begin your wellness journey with MindEase
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/login">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
