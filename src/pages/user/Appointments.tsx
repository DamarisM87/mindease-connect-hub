
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format, addDays } from 'date-fns';
import { CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getTherapists,
  getTherapistById,
  getAvailableSlots,
  bookAppointment,
  getUserAppointments,
  saveUserAppointment
} from '@/services/api';
import { toast } from '@/components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  interface Therapist {
    id: number;
    name: string;
    avatar: string;
    specialty: string;
    // Add other relevant fields if needed
  }
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  interface Appointment {
    id: number;
    therapistName: string;
    date: string;
    time: string;
    status: string;
    // Add other relevant fields if needed
  }
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Booking states
  const [selectedTherapistId, setSelectedTherapistId] = useState<number | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch therapists
        const fetchedTherapists = await getTherapists();
        setTherapists(fetchedTherapists);
        
        // Fetch user appointments if user is logged in
        if (user) {
          const userAppointments = await getUserAppointments(user.id);
          setAppointments(userAppointments);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast.error('Could not load appointments data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [user]);
  
  // Fetch therapist details when selected
  useEffect(() => {
    const fetchTherapistDetails = async () => {
      if (selectedTherapistId) {
        try {
          const therapist = await getTherapistById(selectedTherapistId);
          setSelectedTherapist(therapist);
        } catch (error) {
          console.error('Error fetching therapist details:', error);
        }
      }
    };
    
    fetchTherapistDetails();
  }, [selectedTherapistId]);
  
  // Fetch available slots when date is selected
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedTherapistId && selectedDate) {
        try {
          const slots = await getAvailableSlots(
            selectedTherapistId,
            format(selectedDate, 'yyyy-MM-dd')
          );
          setAvailableSlots(slots);
          setSelectedTime('');
        } catch (error) {
          console.error('Error fetching available slots:', error);
          setAvailableSlots([]);
        }
      }
    };
    
    fetchAvailableSlots();
  }, [selectedTherapistId, selectedDate]);
  
  const handleBookAppointment = async () => {
    if (!user || !selectedTherapistId || !selectedDate || !selectedTime) {
      toast.error('Please complete all required fields');
      return;
    }
    
    setIsBooking(true);
    
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Book appointment
      const newAppointment = await bookAppointment(
        selectedTherapistId,
        formattedDate,
        selectedTime,
        user.id,
        bookingNotes
      );
      
      // Add therapist name to appointment
      const appointmentWithDetails = {
        ...newAppointment,
        therapistName: selectedTherapist?.name || 'Unknown Therapist'
      };
      
      // Save to user's appointments in localStorage
      await saveUserAppointment(user.id, appointmentWithDetails);
      
      // Update appointments list
      const updatedAppointments = await getUserAppointments(user.id);
      setAppointments(updatedAppointments);
      
      toast.success('Appointment booked successfully');
      
      // Reset form
      setSelectedTherapistId(null);
      setSelectedTherapist(null);
      setSelectedDate(undefined);
      setAvailableSlots([]);
      setSelectedTime('');
      setBookingNotes('');
      setBookingStep(1);
      setActiveTab('upcoming');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Could not book appointment');
    } finally {
      setIsBooking(false);
    }
  };
  
  // Filter appointments by status
  const upcomingAppointments = appointments.filter(apt => apt.status !== 'cancelled');
  const pastAppointments = []; // We would implement this with actual data
  
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">Therapy Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage your therapy sessions with our licensed professionals.
          </p>
        </div>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="book">Book New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled therapy sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="py-20 flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-mindease-primary" />
                  </div>
                ) : upcomingAppointments.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <Avatar className="h-12 w-12 border">
                            <AvatarImage 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.therapistName || 'therapist'}`}
                              alt={appointment.therapistName || 'Therapist'} 
                            />
                            <AvatarFallback>
                              {appointment.therapistName?.charAt(0) || 'T'}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-medium">{appointment.therapistName || 'Dr. Sarah Johnson'}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{appointment.date || '2025-05-30'}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{appointment.time || '10:00 AM'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-muted-foreground mb-4">You have no upcoming appointments.</p>
                    <Button onClick={() => setActiveTab('book')}>Book a Session</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>
                  Your previous therapy sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-20 text-center">
                  <p className="text-muted-foreground mb-4">No past appointments.</p>
                  <Button onClick={() => setActiveTab('book')}>Book a Session</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="book" className="animate-in fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Book a Therapy Session</CardTitle>
                <CardDescription>
                  Schedule a new appointment with one of our licensed therapists.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="therapist" className="text-base">Select a Therapist</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        {therapists.map((therapist) => (
                          <div 
                            key={therapist.id}
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-colors",
                              selectedTherapistId === therapist.id
                                ? "border-mindease-primary bg-mindease-primary/5"
                                : "hover:border-mindease-primary/50"
                            )}
                            onClick={() => setSelectedTherapistId(therapist.id)}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={therapist.avatar} alt={therapist.name} />
                                <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{therapist.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                  {therapist.specialty}
                                </p>
                              </div>
                            </div>
                            <RadioGroup defaultValue={selectedTherapistId?.toString()} className="hidden">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem 
                                  value={therapist.id.toString()} 
                                  id={`therapist-${therapist.id}`}
                                  checked={selectedTherapistId === therapist.id}
                                />
                                <Label htmlFor={`therapist-${therapist.id}`}>{therapist.name}</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setBookingStep(2)} 
                      disabled={!selectedTherapistId}
                      className="w-full mt-4"
                    >
                      Continue
                    </Button>
                  </div>
                )}
                
                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <Button 
                        variant="ghost" 
                        className="mb-4 sm:mb-0 -ml-4 px-2"
                        onClick={() => setBookingStep(1)}
                      >
                        ← Back to therapists
                      </Button>
                      
                      {selectedTherapist && (
                        <div className="flex items-center border rounded-full pl-1 pr-4 py-1">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={selectedTherapist.avatar} alt={selectedTherapist.name} />
                            <AvatarFallback>{selectedTherapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{selectedTherapist.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base">Select a Date</Label>
                      <div className="border rounded-md p-4">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => 
                            date < new Date() || 
                            date > addDays(new Date(), 30)
                          }
                          className={cn("mx-auto rounded-md pointer-events-auto")}
                        />
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-base">Available Time Slots</Label>
                          {availableSlots.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                              {availableSlots.map((slot, index) => (
                                <button
                                  key={index}
                                  className={cn(
                                    "border rounded-md py-2 px-3 text-sm transition-colors",
                                    selectedTime === slot
                                      ? "bg-mindease-primary text-white border-mindease-primary"
                                      : "hover:border-mindease-primary"
                                  )}
                                  onClick={() => setSelectedTime(slot)}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="border rounded-md p-8 text-center text-muted-foreground">
                              No available slots for this date. Please select another date.
                            </div>
                          )}
                        </div>
                        
                        {selectedTime && (
                          <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes (optional)</Label>
                            <Textarea
                              id="notes"
                              placeholder="Please share any specific concerns or topics you'd like to discuss"
                              value={bookingNotes}
                              onChange={(e) => setBookingNotes(e.target.value)}
                            />
                          </div>
                        )}
                        
                        <Button 
                          className="w-full"
                          disabled={!selectedDate || !selectedTime || isBooking}
                          onClick={handleBookAppointment}
                        >
                          {isBooking ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            'Confirm Booking'
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Appointments;
