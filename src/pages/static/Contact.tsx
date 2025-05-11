import React, { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
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
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm(name, email, message);
      toast.success('Message sent with a sprinkle of kindness 💌');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-20 bg-[url('/kawaii-bg.svg')] bg-cover bg-no-repeat">
      <div className="mindease-container space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-cute font-bold text-mindease-primary">Let's Chat 💬</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
            Got a question? Feeling curious? Just want to say hi? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-lg border-pink-100/40 bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-cute text-xl text-mindease-accent">💖 Send a Message</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  We’ll respond as soon as we can (usually within a day or two!)
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name <span className="text-pink-500">*</span></Label>
                      <Input
                        id="name"
                        className="rounded-xl"
                        placeholder="e.g. Sakura Tanaka"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-pink-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        className="rounded-xl"
                        placeholder="e.g. sakura@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="subject" className="rounded-xl">
                        <SelectValue placeholder="Choose your topic 🎀" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">💌 General Inquiry</SelectItem>
                        <SelectItem value="support">🛠️ Technical Support</SelectItem>
                        <SelectItem value="billing">💳 Billing</SelectItem>
                        <SelectItem value="feedback">🌸 Feedback</SelectItem>
                        <SelectItem value="other">✨ Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-pink-500">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message with love 💗"
                      className="rounded-xl"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-mindease-primary hover:bg-mindease-accent text-white transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      '💌 Send Message'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="font-cute text-mindease-accent">📞 Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {[{
                  icon: <Mail className="h-5 w-5" />,
                  label: "Email",
                  value: "Miralfarghaly@gmail.com",
                  href: "mailto:miralfarghaly@gmail.com",
                }, {
                  icon: <Phone className="h-5 w-5" />,
                  label: "Phone",
                  value: "+20 01115109500",
                  href: "tel:+200111510",
                }, {
                  icon: <MapPin className="h-5 w-5" />,
                  label: "Address",
                  value: `431 El Horreya Rd, Roushdy, 21311`,
                  href: null,
                }, {
                  icon: <Clock className="h-5 w-5" />,
                  label: "Hours",
                  value: `Mon–Fri: 9am–5pm\nSat: 10am–2pm\nSun: Closed`,
                  href: null,
                }].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-mindease-primary/20 p-2 rounded-full text-mindease-primary mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <div className="font-medium">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="text-muted-foreground hover:text-mindease-accent">
                          {info.value}
                        </a>
                      ) : (
                        <pre className="whitespace-pre-wrap text-muted-foreground">{info.value}</pre>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-100 to-mindease-secondary/30 border-none rounded-2xl shadow-sm">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold text-mindease-primary mb-1">💖 Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Please reach out to a professional right away. Your well-being is important!
                </p>
                <p className="text-lg font-bold text-red-600">01115109500</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Embed the map directly above the footer */}
        <div className="space-y-6 mt-10">
          <Card className="bg-white/60 backdrop-blur rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="font-cute text-mindease-accent">📍 Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.7769743560243!2d29.953209025316617!3d31.226907761583934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c4eb818bb859%3A0xe4b28ff2fa922b23!2sSkills%20Dynamix!5e0!3m2!1sar!2seg!4v1745428493767!5m2!1sar!2seg"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
