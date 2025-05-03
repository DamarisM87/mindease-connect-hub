'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut'
    }
  }),
};

const sectionFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
};

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
      icon: "🌐"
    },
    {
      title: "Compassion",
      description: "Approaching every interaction with empathy, understanding, and genuine care for each individual's journey.",
      icon: "💖"
    },
    {
      title: "Evidence-Based",
      description: "Utilizing proven therapeutic approaches backed by research and clinical expertise.",
      icon: "📊"
    },
    {
      title: "Privacy",
      description: "Maintaining the highest standards of confidentiality and data protection for our users.",
      icon: "🔒"
    }
  ];

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container space-y-24">
        
        {/* Hero */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-mindease-primary">About MindEase</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our mission is to make mental healthcare accessible, approachable, and effective for everyone.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
        >
          <h2 className="section-heading text-center mb-8">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-mindease-primary/20 to-mindease-secondary/30 rounded-lg aspect-video flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-mindease-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <p className="mb-4">
                MindEase was founded in 2020 with a simple but powerful idea: mental healthcare should be accessible to everyone, anytime they need it.
              </p>
              <p className="mb-4">
                Dr. Sarah Johnson, our founder, saw firsthand how many people struggled to find quality mental health support due to geographic, financial, or social barriers.
              </p>
              <p>
                Today, MindEase serves thousands of users worldwide, providing tools for mental health tracking, access to licensed therapists, and a supportive community.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-heading text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="text-center rounded-2xl hover:shadow-lg transition">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4 animate-bounce-slow">{val.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{val.title}</h3>
                    <p className="text-muted-foreground">{val.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Team */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-heading text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="text-center rounded-3xl bg-white/70 backdrop-blur hover:shadow-md transition">
                  <CardContent className="pt-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-mindease-primary/30">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-mindease-primary">{member.name}</h3>
                    <p className="text-sm text-mindease-accent mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Impact */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="bg-gradient-to-r from-mindease-primary/20 to-mindease-secondary/20 rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="section-heading">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're proud of the difference we're making in people's lives every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { label: "Active Users", value: "10,000+" },
              { label: "Therapy Sessions", value: "5,000+" },
              { label: "Improved Well-being", value: "85%" },
            ].map((stat, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <div className="text-4xl font-bold text-mindease-accent mb-2">{stat.value}</div>
                <p className="text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="section-heading mb-6">Join Us On Our Mission</h2>
          <p className="text-lg mb-8">
            We believe that mental health is just as important as physical health. Whether you're looking for tools, support, or community—MindEase is here for you.
          </p>
          <div className="text-lg font-medium text-mindease-accent">
            Together, we can create a world where mental wellness is accessible to all.
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
