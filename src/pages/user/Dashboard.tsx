import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  getMoodEntries, getUserAppointments, getBlogPosts,
} from '@/services/api';
import { format } from 'date-fns';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Calendar, Clock, BookOpen, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// ----------------------
// Types
// ----------------------

interface MoodEntry {
  date: string; // ISO string from API
  mood: number;
  anxiety: number;
  sleep: number;
}

interface MoodChartData {
  date: string;
  mood: number;
  anxiety: number;
  sleep: number;
  value: number;
}

interface Appointment {
  therapistName?: string;
  date: string;
  time: string;
}

interface BlogPost {
  id: string;
  title: string;
  body: string;
}

// ----------------------
// Component
// ----------------------

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState<MoodChartData[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user) {
          // Fetch and process mood entries
          const entries: MoodEntry[] = await getMoodEntries(user.id);
          const processedEntries: MoodChartData[] = entries
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-7)
            .map((entry) => ({
              date: format(new Date(entry.date), 'MMM dd'),
              mood: entry.mood,
              anxiety: entry.anxiety,
              sleep: entry.sleep,
              value: (entry.mood + entry.anxiety + entry.sleep) / 3,
            }));
          setMoodData(processedEntries);

          // Fetch appointments
          const userAppointments = await getUserAppointments(user.id);
          setAppointments(userAppointments);
        }

        // Fetch blog posts
        const posts = await getBlogPosts(3);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const mockMoodData: MoodChartData[] = [
    { date: 'Apr 26', value: 3.5, mood: 0, anxiety: 0, sleep: 0 },
    { date: 'Apr 27', value: 3.0, mood: 0, anxiety: 0, sleep: 0 },
    { date: 'Apr 28', value: 2.5, mood: 0, anxiety: 0, sleep: 0 },
    { date: 'Apr 29', value: 3.8, mood: 0, anxiety: 0, sleep: 0 },
    { date: 'Apr 30', value: 4.2, mood: 0, anxiety: 0, sleep: 0 },
    { date: 'May 01', value: 3.9, mood: 0, anxiety: 0, sleep: 0 },
    { date: 'May 02', value: 4.5, mood: 0, anxiety: 0, sleep: 0 },
  ];

  const chartData = moodData.length > 0 ? moodData : mockMoodData;

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">Welcome, {user?.name || 'Friend'}</h1>
          <p className="text-muted-foreground">
            Track your mental wellness journey, upcoming appointments, and resources all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Mood Chart */}
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

          {/* Appointments */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/appointments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appointment, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      <div className="rounded-md bg-mindease-primary/20 p-2 text-mindease-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.therapistName || 'Therapist'}</p>
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

          {/* Blog Posts */}
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-lg">Latest Articles</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/blog">View All</Link>
              </Button>
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

        {/* Quick Tools (No type changes needed) */}
        {/* ... your existing Quick Tools section goes here ... */}
      </div>
    </div>
  );
};

export default Dashboard;
