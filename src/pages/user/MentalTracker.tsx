
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { getMoodEntries, saveMoodEntry } from '@/services/api';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';

const getMoodLabel = (value: number) => {
  const labels = ['Very Poor', 'Poor', 'Neutral', 'Good', 'Excellent'];
  return labels[value - 1];
};

const getAnxietyLabel = (value: number) => {
  const labels = ['Severe', 'High', 'Moderate', 'Mild', 'Minimal'];
  return labels[value - 1];
};

const getSleepLabel = (value: number) => {
  const labels = ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'];
  return labels[value - 1];
};

const MentalTracker = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [mood, setMood] = useState(3);
  const [anxiety, setAnxiety] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  interface MoodEntry {
    date: string;
    mood: number;
    anxiety: number;
    sleep: number;
    notes?: string;
    timestamp?: string;
  }
  
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('entry');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (user) {
          const fetchedEntries = await getMoodEntries(user.id);
          setEntries(fetchedEntries);
        }
      } catch (error) {
        console.error('Error fetching mood entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSubmitting(true);
    
    const entry = {
      date: format(date, 'yyyy-MM-dd'),
      mood: mood.toString(),
      anxiety: anxiety.toString(),
      sleep: sleep.toString(),
      notes
    };
    
    try {
      await saveMoodEntry(user.id, entry);
      const updatedEntries = await getMoodEntries(user.id);
      setEntries(updatedEntries);
      toast.success('Your mood has been recorded');
      
      // Reset form
      setDate(new Date());
      setMood(3);
      setAnxiety(3);
      setSleep(3);
      setNotes('');
      
      // Switch to insights tab
      setActiveTab('insights');
    } catch (error) {
      console.error('Error saving mood entry:', error);
      toast.error('Failed to save your mood entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Process entries for charts
  const processedEntries = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14)
    .map(entry => ({
      date: format(new Date(entry.date), 'MMM dd'),
      mood: entry.mood,
      anxiety: entry.anxiety,
      sleep: entry.sleep
    }));
  
  // Mock data if no entries yet
  const mockEntries = [
    { date: 'Apr 19', mood: 3, anxiety: 4, sleep: 2 },
    { date: 'Apr 20', mood: 2, anxiety: 3, sleep: 2 },
    { date: 'Apr 21', mood: 2, anxiety: 3, sleep: 3 },
    { date: 'Apr 22', mood: 3, anxiety: 4, sleep: 3 },
    { date: 'Apr 23', mood: 3, anxiety: 3, sleep: 4 },
    { date: 'Apr 24', mood: 4, anxiety: 4, sleep: 4 },
    { date: 'Apr 25', mood: 4, anxiety: 5, sleep: 3 },
    { date: 'Apr 26', mood: 3, anxiety: 4, sleep: 3 },
    { date: 'Apr 27', mood: 3, anxiety: 3, sleep: 3 },
    { date: 'Apr 28', mood: 2, anxiety: 2, sleep: 2 },
    { date: 'Apr 29', mood: 3, anxiety: 3, sleep: 3 },
    { date: 'Apr 30', mood: 4, anxiety: 4, sleep: 4 },
    { date: 'May 01', mood: 4, anxiety: 4, sleep: 4 },
    { date: 'May 02', mood: 5, anxiety: 5, sleep: 5 },
  ];
  
  const chartData = processedEntries.length > 0 ? processedEntries : mockEntries;

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">Mental Health Tracker</h1>
          <p className="text-muted-foreground">
            Track your daily mood, anxiety, and sleep patterns to gain insights into your mental wellbeing.
          </p>
        </div>
        
        <div className="mb-6 flex space-x-4 border-b">
          <button
            className={`pb-2 font-medium ${
              activeTab === 'entry'
                ? 'border-b-2 border-mindease-primary text-foreground'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('entry')}
          >
            Log Today
          </button>
          <button
            className={`pb-2 font-medium ${
              activeTab === 'insights'
                ? 'border-b-2 border-mindease-primary text-foreground'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
          <button
            className={`pb-2 font-medium ${
              activeTab === 'history'
                ? 'border-b-2 border-mindease-primary text-foreground'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>
        
        {activeTab === 'entry' && (
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Log Your Mood</CardTitle>
                <CardDescription>
                  Record how you're feeling today to track patterns over time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Picker */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Mood Slider */}
                <div className="space-y-4">
                  <Label>
                    Overall Mood: <span className="font-medium text-mindease-primary">{getMoodLabel(mood)}</span>
                  </Label>
                  <div className="pl-3 pr-3">
                    <Slider
                      value={[mood]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={value => setMood(value[0])}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Very Poor</span>
                    <span>Poor</span>
                    <span>Neutral</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
                
                {/* Anxiety Slider */}
                <div className="space-y-4">
                  <Label>
                    Anxiety Level: <span className="font-medium text-mindease-primary">{getAnxietyLabel(anxiety)}</span>
                  </Label>
                  <div className="pl-3 pr-3">
                    <Slider
                      value={[anxiety]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={value => setAnxiety(value[0])}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Severe</span>
                    <span>High</span>
                    <span>Moderate</span>
                    <span>Mild</span>
                    <span>Minimal</span>
                  </div>
                </div>
                
                {/* Sleep Quality Slider */}
                <div className="space-y-4">
                  <Label>
                    Sleep Quality: <span className="font-medium text-mindease-primary">{getSleepLabel(sleep)}</span>
                  </Label>
                  <div className="pl-3 pr-3">
                    <Slider
                      value={[sleep]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={value => setSleep(value[0])}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Very Poor</span>
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea 
                    id="notes"
                    placeholder="How are you feeling? What happened today?" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Entry'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
                <CardDescription>
                  Your mental wellness patterns over the last 14 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        name="Mood" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anxiety" 
                        name="Anxiety (Higher is Better)" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sleep" 
                        name="Sleep Quality" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>
                    Summary of your mood patterns and potential insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Mood Summary</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-mindease-primary mb-1">
                            {entries.length > 0
                              ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1)
                              : "3.8"}
                          </div>
                          <div className="text-xs text-muted-foreground">Avg. Mood</div>
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-mindease-primary mb-1">
                            {entries.length > 0
                              ? (entries.reduce((sum, entry) => sum + entry.anxiety, 0) / entries.length).toFixed(1)
                              : "4.1"}
                          </div>
                          <div className="text-xs text-muted-foreground">Avg. Anxiety</div>
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-mindease-primary mb-1">
                            {entries.length > 0
                              ? (entries.reduce((sum, entry) => sum + entry.sleep, 0) / entries.length).toFixed(1)
                              : "3.5"}
                          </div>
                          <div className="text-xs text-muted-foreground">Avg. Sleep</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Insights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Badge variant="outline" className="mt-1">Trend</Badge>
                          <span>Your mood appears to be {entries.length > 0 ? "stable with some improvement" : "improving"} over the past week.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline" className="mt-1">Pattern</Badge>
                          <span>There seems to be a correlation between your sleep quality and mood the following day.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Badge variant="outline" className="mt-1">Suggestion</Badge>
                          <span>Consider focusing on improving your sleep habits to potentially boost your overall mood.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Distribution</CardTitle>
                  <CardDescription>
                    How your mood varies throughout the week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { day: 'Mon', mood: 3.5 },
                          { day: 'Tue', mood: 3.2 },
                          { day: 'Wed', mood: 3.8 },
                          { day: 'Thu', mood: 4.1 },
                          { day: 'Fri', mood: 4.5 },
                          { day: 'Sat', mood: 4.2 },
                          { day: 'Sun', mood: 3.7 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Bar dataKey="mood" name="Average Mood" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Entry History</CardTitle>
              <CardDescription>
                Your past mood tracking entries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-20 flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-mindease-primary" />
                </div>
              ) : entries.length > 0 ? (
                <div className="space-y-4">
                  {[...entries]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-center mb-4">
                          <div className="font-medium">{format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}</div>
                          <div className="text-xs text-muted-foreground">{entry.timestamp ? format(new Date(entry.timestamp), 'h:mm a') : ''}</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Mood</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-mindease-accent mr-2"></div>
                              <span className="text-sm">{getMoodLabel(entry.mood)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Anxiety</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-mindease-primary mr-2"></div>
                              <span className="text-sm">{getAnxietyLabel(entry.anxiety)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Sleep</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-mindease-secondary mr-2"></div>
                              <span className="text-sm">{getSleepLabel(entry.sleep)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {entry.notes && (
                          <div className="mt-4 bg-muted p-3 rounded text-sm">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground mb-4">No entries yet. Start tracking your mood to see your history.</p>
                  <Button onClick={() => setActiveTab('entry')}>Log Today's Mood</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MentalTracker;
