
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { submitContactForm } from '@/services/api';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitContactForm(name, email, message);
      
      toast.success('Message sent successfully! We\'ll get back to you shortly.');
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">Contact Us</h1>
          <p className="text-muted-foreground">
            Have questions or need support? We're here to help. Reach out to our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                      <Input 
                        id="name" 
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-mindease-primary/20 p-2 text-mindease-primary mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:support@mindease.example" className="text-muted-foreground hover:text-mindease-accent">
                      support@mindease.example
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-mindease-primary/20 p-2 text-mindease-primary mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+15551234567" className="text-muted-foreground hover:text-mindease-accent">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-mindease-primary/20 p-2 text-mindease-primary mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <address className="text-muted-foreground not-italic">
                      123 Wellness Street<br />
                      New York, NY 10001<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-mindease-primary/20 p-2 text-mindease-primary mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Hours</div>
                    <div className="text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">How quickly will I get a response?</h3>
                  <p className="text-sm text-muted-foreground">
                    We aim to respond to all inquiries within 24-48 business hours.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Is my information secure?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, all contact information and messages are kept confidential.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">What if I need immediate help?</h3>
                  <p className="text-sm text-muted-foreground">
                    For urgent matters, please call our support line directly at +1 (555) 123-4567.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-mindease-primary/20 to-mindease-secondary/20 border-0">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Need Immediate Support?</h3>
                  <p className="text-sm mb-4">
                    If you're experiencing a mental health crisis, please contact a crisis helpline immediately.
                  </p>
                  <div className="font-medium mb-2">National Crisis Hotline</div>
                  <p className="text-lg">1-800-273-8255</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
