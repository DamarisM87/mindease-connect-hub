
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSystemAnalytics } from '@/services/api';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Users, Calendar, BookOpen, MessageSquare, Activity, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  interface AnalyticsData {
    userCount: number;
    activeUsers: number;
    blogPosts: number;
    communityPosts: number;
    userGrowth: { month: string; users: number }[];
    moodDistribution: {
      name: string;
      excellent: number;
      good: number;
      neutral: number;
      poor: number;
      bad: number;
    }[];
    appointments: {
      completed: number;
      upcoming: number;
      cancelled: number;
      total: number;
    };
  }
  
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getSystemAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-mindease-primary" />
          <span className="text-lg font-medium">Loading dashboard data...</span>
        </div>
      </div>
    );
  }
  
  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-2">Error loading analytics data</p>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
  
  // Colors for charts
  const COLORS = [
    '#E29B8E', // mindease-primary
    '#DFA69E', // mindease-secondary
    '#978486', // mindease-dark
    '#BD6466', // mindease-accent
    '#FFB5A7', // lighter pink
  ];
  
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor system performance, user activity, and manage platform content.
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <div className="text-2xl font-bold mt-1">{analytics.userCount}</div>
                  <div className="text-xs text-green-500 mt-1">
                    +{analytics.userCount - analytics.activeUsers} new this month
                  </div>
                </div>
                <div className="rounded-md bg-blue-50 p-2 text-blue-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                  <div className="text-2xl font-bold mt-1">{analytics.appointments.upcoming}</div>
                  <div className="text-xs text-green-500 mt-1">
                    {analytics.appointments.total} total sessions
                  </div>
                </div>
                <div className="rounded-md bg-green-50 p-2 text-green-500">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blog Articles</p>
                  <div className="text-2xl font-bold mt-1">{analytics.blogPosts}</div>
                  <div className="text-xs text-green-500 mt-1">
                    8 published this month
                  </div>
                </div>
                <div className="rounded-md bg-purple-50 p-2 text-purple-500">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community Posts</p>
                  <div className="text-2xl font-bold mt-1">{analytics.communityPosts}</div>
                  <div className="text-xs text-green-500 mt-1">
                    +23 new this week
                  </div>
                </div>
                <div className="rounded-md bg-amber-50 p-2 text-amber-500">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly new user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analytics.userGrowth}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke={COLORS[0]}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Mood Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Distribution</CardTitle>
              <CardDescription>Aggregate user mood data by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.moodDistribution}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="excellent" stackId="a" fill={COLORS[0]} name="Excellent" />
                    <Bar dataKey="good" stackId="a" fill={COLORS[1]} name="Good" />
                    <Bar dataKey="neutral" stackId="a" fill={COLORS[2]} name="Neutral" />
                    <Bar dataKey="poor" stackId="a" fill={COLORS[3]} name="Poor" />
                    <Bar dataKey="bad" stackId="a" fill={COLORS[4]} name="Bad" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
              <CardDescription>Overview of therapy sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: analytics.appointments.completed },
                        { name: 'Upcoming', value: analytics.appointments.upcoming },
                        { name: 'Cancelled', value: analytics.appointments.cancelled },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[0, 1, 2].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span className="font-medium">{analytics.appointments.completed}</span>
                  </div>
                  <Progress value={
                    (analytics.appointments.completed / analytics.appointments.total) * 100
                  } className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Upcoming</span>
                    <span className="font-medium">{analytics.appointments.upcoming}</span>
                  </div>
                  <Progress value={
                    (analytics.appointments.upcoming / analytics.appointments.total) * 100
                  } className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Cancelled</span>
                    <span className="font-medium">{analytics.appointments.cancelled}</span>
                  </div>
                  <Progress value={
                    (analytics.appointments.cancelled / analytics.appointments.total) * 100
                  } className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 pb-4 border-b">
                  <div className="rounded-full bg-blue-100 p-2 h-10 w-10 shrink-0 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">New User Registration</div>
                    <div className="text-sm text-muted-foreground">Emily Johnson joined the platform</div>
                    <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-4 border-b">
                  <div className="rounded-full bg-green-100 p-2 h-10 w-10 shrink-0 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">New Appointment</div>
                    <div className="text-sm text-muted-foreground">Session booked with Dr. Michael Chen</div>
                    <div className="text-xs text-muted-foreground mt-1">15 minutes ago</div>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-4 border-b">
                  <div className="rounded-full bg-amber-100 p-2 h-10 w-10 shrink-0 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium">New Community Post</div>
                    <div className="text-sm text-muted-foreground">User shared an experience with anxiety</div>
                    <div className="text-xs text-muted-foreground mt-1">43 minutes ago</div>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-4 border-b">
                  <div className="rounded-full bg-red-100 p-2 h-10 w-10 shrink-0 flex items-center justify-center">
                    <Flag className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium">Post Flagged</div>
                    <div className="text-sm text-muted-foreground">A community post was reported for review</div>
                    <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="rounded-full bg-purple-100 p-2 h-10 w-10 shrink-0 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">New Blog Article</div>
                    <div className="text-sm text-muted-foreground">Admin published "Understanding Anxiety Triggers"</div>
                    <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
