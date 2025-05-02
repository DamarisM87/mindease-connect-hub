
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Lead Therapist",
      bio: "Dr. Johnson has over 15 years of experience in clinical psychology, specializing in cognitive behavioral therapy and trauma recovery.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Michael leads our technology initiatives, ensuring our platform is secure, user-friendly, and accessible to all who need support.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Clinical Director",
      bio: "With expertise in family therapy and cultural competence, Dr. Patel oversees our therapeutic approaches and training.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
    },
    {
      name: "James Wilson",
      role: "Community Manager",
      bio: "James facilitates our online community, ensuring it remains a safe, supportive space for all members to share and grow.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    }
  ];

  const values = [
    {
      title: "Accessibility",
      description: "Making mental health support available to everyone, regardless of location or circumstances.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Compassion",
      description: "Approaching every interaction with empathy, understanding, and genuine care for each individual's journey.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Evidence-Based",
      description: "Utilizing proven therapeutic approaches backed by research and clinical expertise.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Privacy",
      description: "Maintaining the highest standards of confidentiality and data protection for our users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-6">About MindEase</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our mission is to make mental healthcare accessible, approachable, and effective for everyone.
          </p>
        </div>
        
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="section-heading text-center mb-8">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-mindease-primary/20 to-mindease-secondary/30 rounded-lg aspect-video flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="mb-4">
                MindEase was founded in 2020 with a simple but powerful idea: mental healthcare should be accessible to everyone, anytime they need it.
              </p>
              <p className="mb-4">
                Dr. Sarah Johnson, our founder, saw firsthand how many people struggled to find quality mental health support due to geographic, financial, or social barriers. With a team of dedicated mental health professionals and technology experts, she set out to create a platform that would break down these barriers.
              </p>
              <p>
                Today, MindEase serves thousands of users worldwide, providing tools for mental health tracking, access to licensed therapists, and a supportive community for those navigating their mental wellness journey.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="mb-16">
          <h2 className="section-heading text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-mindease-primary/10 p-5 inline-block">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Our Team */}
        <section className="mb-16">
          <h2 className="section-heading text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-mindease-primary text-sm mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Impact */}
        <section className="bg-gradient-to-r from-mindease-primary/20 to-mindease-secondary/20 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="section-heading">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're proud of the difference we're making in people's lives every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-mindease-accent mb-2">10,000+</div>
              <p className="text-lg">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-mindease-accent mb-2">5,000+</div>
              <p className="text-lg">Therapy Sessions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-mindease-accent mb-2">85%</div>
              <p className="text-lg">Report Improved Well-being</p>
            </div>
          </div>
        </section>
        
        {/* Mission */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading mb-6">Join Us On Our Mission</h2>
          <p className="text-lg mb-8">
            We believe that mental health is just as important as physical health, and that everyone deserves access to quality care and support. Whether you're looking for tools to manage your own well-being, seeking professional help, or wanting to connect with others on similar journeys, MindEase is here for you.
          </p>
          <div className="text-lg font-medium text-mindease-accent">Together, we can create a world where mental wellness is accessible to all.</div>
        </section>
      </div>
    </div>
  );
};

export default About;
