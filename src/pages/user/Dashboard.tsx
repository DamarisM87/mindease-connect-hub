
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMoodEntries, getUserAppointments, getBlogPosts } from '@/services/api';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch mood entries
        if (user) {
          const entries = await getMoodEntries(user.id);
          
          // Process for chart display - last 7 days
          const processedEntries = entries
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-7)
            .map((entry: any) => ({
              date: format(new Date(entry.date), 'MMM dd'),
              mood: entry.mood,
              anxiety: entry.anxiety,
              sleep: entry.sleep,
              value: (entry.mood + entry.anxiety + entry.sleep) / 3
            }));
          
          setMoodData(processedEntries);
          
          // Fetch upcoming appointments
          const userAppointments = await getUserAppointments(user.id);
          setAppointments(userAppointments);
        }
        
        // Fetch latest blog posts
        const posts = await getBlogPosts(3);
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Mock data if no entries yet
  const mockMoodData = [
    { date: 'Apr 26', value: 3.5 },
    { date: 'Apr 27', value: 3.0 },
    { date: 'Apr 28', value: 2.5 },
    { date: 'Apr 29', value: 3.8 },
    { date: 'Apr 30', value: 4.2 },
    { date: 'May 01', value: 3.9 },
    { date: 'May 02', value: 4.5 },
  ];

  const chartData = moodData.length > 0 ? moodData : mockMoodData;

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">
            Welcome, {user?.name || 'Friend'}
          </h1>
          <p className="text-muted-foreground">
            Track your mental wellness journey, upcoming appointments, and resources all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Wellness Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Mood</CardTitle>
              <CardDescription>Your mood trend over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
                    <YAxis domain={[1, 5]} tick={{ fontSize: 12 }} tickMargin={10} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/mental-tracker" className="flex items-center">
                    Track mood <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/appointments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appointment, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      <div className="rounded-md bg-mindease-primary/20 p-2 text-mindease-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.therapistName || "Dr. Sarah Johnson"}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{appointment.date}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                  <Button asChild>
                    <Link to="/appointments">Book a session</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Blog Posts */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Latest Articles</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/blog">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                    <div className="rounded-md bg-mindease-secondary/20 p-2 text-mindease-secondary">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <Link to={`/blog/${post.id}`} className="font-medium line-clamp-1 hover:text-mindease-accent">
                        {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {post.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Quick Access Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Wellness Tools</CardTitle>
              <CardDescription>Quick access to resources and tools to support your mental wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/mental-tracker" className="block group">
                  <div className="border rounded-lg p-4 text-center hover:border-mindease-primary hover:bg-mindease-primary/5 transition-colors">
                    <div className="rounded-full bg-mindease-primary/10 p-3 inline-flex items-center justify-center mb-3 group-hover:bg-mindease-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Mood Journal</h3>
                    <p className="text-sm text-muted-foreground mt-1">Track your daily mood</p>
                  </div>
                </Link>
                
                <Link to="/appointments" className="block group">
                  <div className="border rounded-lg p-4 text-center hover:border-mindease-primary hover:bg-mindease-primary/5 transition-colors">
                    <div className="rounded-full bg-mindease-primary/10 p-3 inline-flex items-center justify-center mb-3 group-hover:bg-mindease-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Book Session</h3>
                    <p className="text-sm text-muted-foreground mt-1">Schedule therapy</p>
                  </div>
                </Link>
                
                <Link to="/community" className="block group">
                  <div className="border rounded-lg p-4 text-center hover:border-mindease-primary hover:bg-mindease-primary/5 transition-colors">
                    <div className="rounded-full bg-mindease-primary/10 p-3 inline-flex items-center justify-center mb-3 group-hover:bg-mindease-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Community</h3>
                    <p className="text-sm text-muted-foreground mt-1">Connect with others</p>
                  </div>
                </Link>
                
                <Link to="/blog" className="block group">
                  <div className="border rounded-lg p-4 text-center hover:border-mindease-primary hover:bg-mindease-primary/5 transition-colors">
                    <div className="rounded-full bg-mindease-primary/10 p-3 inline-flex items-center justify-center mb-3 group-hover:bg-mindease-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Resources</h3>
                    <p className="text-sm text-muted-foreground mt-1">Helpful articles</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
