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
      name: "Sherouk Hatem",
      role: "Chief Technology Officer",
      bio: "Sherouk leads our digital transformation with expertise in health tech solutions. She ensures our platform combines cutting-edge technology with compassionate care.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sherouk"
    },
    {
      name: "Lydia Refaat",
      role: "Founder & Clinical Director",
      bio: "With over 15 years in clinical psychology, Lydia specializes in trauma-informed care and innovative therapeutic approaches. She holds a PhD in Clinical Psychology from Cairo University.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lydia"
    },
    
    {
      name: "Miral Farghaly",
      role: "Lead Therapist",
      bio: "Miral brings expertise in cognitive behavioral therapy and mindfulness techniques. She's passionate about making mental health support accessible to all.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=miral"
    },
    {
      name: "Ganna Mokhtar",
      role: "Community Relations Manager",
      bio: "Ganna builds bridges between MindEase and the communities we serve, ensuring culturally sensitive care and outreach programs.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ganna"
    }
  ];

  const values = [
    {
      title: "Empathy First",
      description: "Every interaction begins with deep understanding and compassion for individual experiences.",
      icon: "💞"
    },
    {
      title: "Innovative Care",
      description: "Combining traditional therapies with innovative approaches for modern mental health challenges.",
      icon: "✨"
    },
    {
      title: "Cultural Sensitivity",
      description: "Providing care that respects and understands diverse cultural backgrounds.",
      icon: "🌍"
    },
    {
      title: "Holistic Wellness",
      description: "Addressing mind, body, and spirit in our therapeutic approaches.",
      icon: "🧘"
    }
  ];

  const approaches = [
    {
      title: "Integrative Therapy",
      description: "Tailoring combinations of evidence-based approaches to individual needs.",
      icon: "🔄"
    },
    {
      title: "Digital Wellness",
      description: "Leveraging technology to enhance therapeutic outcomes and accessibility.",
      icon: "📱"
    },
    {
      title: "Preventive Care",
      description: "Focusing on early intervention and mental health maintenance.",
      icon: "🛡"
    },
    {
      title: "Community Healing",
      description: "Creating spaces for shared experiences and collective growth.",
      icon: "🤝"
    }
  ];

  const mentalHealthResources = [
    {
      title: "Therapeutic Tools",
      description: "Curated resources to support your mental health journey",
      icon: "🧰",
      items: [
        "Interactive mood tracker",
        "Personalized meditation guides",
        "Cognitive restructuring worksheets",
        "Sleep optimization program"
      ]
    },
    {
      title: "Expert Guidance",
      description: "Professional insights for various mental health needs",
      icon: "👩‍⚕",
      items: [
        "Therapist-vetted articles",
        "Live Q&A sessions",
        "Condition-specific webinars",
        "Treatment roadmaps"
      ]
    },
    {
      title: "Community Wisdom",
      description: "Shared experiences and peer support",
      icon: "🗣",
      items: [
        "Anonymous support groups",
        "Success stories",
        "Coping strategy exchange",
        "Healing journey timelines"
      ]
    }
  ];

  const awarenessCampaigns = [
    {
      title: "Breaking Stigmas",
      description: "Educational initiatives challenging mental health misconceptions",
      icon: "🚫"
    },
    {
      title: "Workplace Wellbeing",
      description: "Corporate programs fostering psychologically safe environments",
      icon: "🏢"
    },
    {
      title: "Youth Empowerment",
      description: "Early intervention programs for young minds",
      icon: "🧒"
    },
    {
      title: "Cultural Bridges",
      description: "Culturally-specific mental health awareness",
      icon: "🌉"
    }
  ];

  return (
    <div className="min-h-screen pt-6 pb-16 bg-gradient-to-b from-white to-mindease-primary/5">
      <div className="mindease-container space-y-24">
        
        {/* Hero */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="text-center pt-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-mindease-primary">About MindEase</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where compassionate care meets innovative mental health solutions
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="pt-12"
        >
          <h2 className="section-heading text-center mb-12">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl aspect-video overflow-hidden shadow-xl"
            >
              <img 
                src="Assets/young.jpg"
                alt="MindEase team collaborating"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <p className="mb-4 text-lg">
                Founded in 2020 by our team, MindEase emerged from a vision to revolutionize mental healthcare accessibility in the Middle East and beyond.
              </p>
              <p className="mb-4 text-lg">
                What began as a small Cairo-based practice has blossomed into a pioneering digital platform, serving thousands across the Arab world with culturally-attuned mental health support.
              </p>
              <p className="text-lg">
                Today, our interdisciplinary team combines clinical excellence with technological innovation to break down barriers to mental wellness.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Approach */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-12"
        >
          <h2 className="section-heading text-center mb-12">Our Therapeutic Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approaches.map((approach, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="text-center rounded-2xl hover:shadow-lg transition h-full border-0 bg-gradient-to-b from-white to-mindease-primary/10">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-5xl mb-6">{approach.icon}</div>
                    <h3 className="font-semibold text-xl mb-4 text-mindease-primary">{approach.title}</h3>
                    <p className="text-muted-foreground mt-auto">{approach.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-12"
        >
          <h2 className="section-heading text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="text-center rounded-2xl hover:shadow-lg transition h-full border-0 bg-white/90">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-5xl mb-6 animate-float">{val.icon}</div>
                    <h3 className="font-semibold text-xl mb-4 text-mindease-primary">{val.title}</h3>
                    <p className="text-muted-foreground mt-auto">{val.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why It Matters */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="pt-12"
        >
          <div className="bg-gradient-to-r from-mindease-primary/10 to-mindease-secondary/10 rounded-2xl p-12 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-heading mb-6">The MindEase Difference</h2>
                <p className="mb-4 text-lg">
                  In a region where mental health stigma persists, we're creating safe spaces for healing and growth that honor cultural contexts while advancing therapeutic innovation.
                </p>
                <p className="mb-4 text-lg">
                  Our culturally-sensitive approach addresses unique challenges faced in our communities:
                </p>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start">
                    <span className="text-mindease-primary mr-2">•</span>
                    <span>Family and societal pressures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mindease-primary mr-2">•</span>
                    <span>Cultural identity challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mindease-primary mr-2">•</span>
                    <span>Intergenerational trauma</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mindease-primary mr-2">•</span>
                    <span>Modern life stressors in traditional contexts</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-mindease-primary/20">
                <h3 className="text-2xl font-semibold mb-6 text-mindease-primary text-center">By The Numbers</h3>
                <div className="space-y-6">
                  {[
                    "72% of Arab youth report mental health concerns (WHO, 2023)",
                    "Only 20% seek professional help due to stigma",
                    "Our users show 65% symptom reduction after 6 months",
                    "94% report improved quality of life"
                  ].map((fact, i) => (
                    <div key={i} className="flex items-start">
                      <div className="bg-mindease-primary/10 text-mindease-primary rounded-full p-2 mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Team */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-12"
        >
          <h2 className="section-heading text-center mb-12">The Minds Behind MindEase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="text-center rounded-3xl bg-white hover:shadow-xl transition h-full border-0 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <Avatar className="w-32 h-32 mx-auto absolute inset-0 m-auto z-20 border-4 border-white group-hover:scale-105 transition">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardContent className="p-6 h-full flex flex-col mt-16">
                    <h3 className="font-semibold text-xl text-mindease-primary">{member.name}</h3>
                    <p className="text-sm text-mindease-accent mb-4 font-medium">{member.role}</p>
                    <p className="text-muted-foreground mt-auto">{member.bio}</p>
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
          className="pt-12"
        >
          <div className="bg-gradient-to-r from-mindease-primary/20 to-mindease-secondary/20 rounded-2xl p-12 shadow-inner">
            <div className="text-center mb-12">
              <h2 className="section-heading">Transformative Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We measure success in lives changed and barriers broken
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Lives Touched", value: "50,000+", description: "Across the Middle East and North Africa" },
                { label: "Therapeutic Hours", value: "25,000+", description: "Of culturally-sensitive care delivered" },
                { label: "Community Growth", value: "300%", description: "Year-over-year increase in users seeking help" },
              ].map((stat, i) => (
                <motion.div key={i} custom={i} variants={fadeUp}>
                  <div className="bg-white/80 rounded-xl p-8 shadow-sm h-full border border-mindease-primary/10">
                    <div className="text-5xl font-bold text-mindease-accent mb-3">{stat.value}</div>
                    <h3 className="text-xl font-medium mb-2">{stat.label}</h3>
                    <p className="text-muted-foreground">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Mental Health Resources */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="pt-12"
        >
          <h2 className="section-heading text-center mb-12">Comprehensive Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentalHealthResources.map((resource, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="rounded-2xl hover:shadow-xl transition h-full border-0 overflow-hidden group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition">{resource.icon}</div>
                    <h3 className="font-semibold text-xl mb-4 text-mindease-primary">{resource.title}</h3>
                    <p className="text-muted-foreground mb-6">{resource.description}</p>
                    <ul className="space-y-3 mt-auto">
                      {resource.items.map((item, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-mindease-primary mr-2">•</span>
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Awareness Campaigns */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="pt-12"
        >
          <div className="bg-gradient-to-r from-mindease-primary/10 to-mindease-secondary/10 rounded-2xl p-12 shadow-inner">
            <h2 className="section-heading text-center mb-12">Cultural Change Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awarenessCampaigns.map((campaign, i) => (
                <motion.div key={i} custom={i} variants={fadeUp}>
                  <Card className="rounded-2xl bg-white/90 hover:shadow-lg transition h-full border-0">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="text-5xl mb-6">{campaign.icon}</div>
                      <h3 className="font-semibold text-xl mb-4 text-mindease-primary">{campaign.title}</h3>
                      <p className="text-muted-foreground mt-auto">{campaign.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div 
              variants={fadeUp}
              className="text-center mt-12 max-w-2xl mx-auto"
            >
              <p className="text-xl mb-8">
                We're not just providing services - we're cultivating a cultural shift in how mental health is perceived and addressed in our communities.
              </p>
              <button className="bg-mindease-primary hover:bg-mindease-primary/90 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl">
                Become an Advocate
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFade}
          className="pt-12"
        >
          <h2 className="section-heading text-center mb-12">Voices of Healing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "As an Arab woman, finding therapy that understood my cultural context was impossible—until MindEase. Finally, I felt truly seen and understood.",
                author: "Nour A.",
                role: "User since 2021"
              },
              {
                quote: "The Arabic-language resources helped my parents finally understand and support my mental health journey. This platform is changing generations.",
                author: "Karim S.",
                role: "User since 2022"
              },
              {
                quote: "From anxiety attacks to confident living—MindEase gave me tools no traditional therapist ever had. The cultural sensitivity makes all the difference.",
                author: "Layla M.",
                role: "User since 2020"
              }
            ].map((testimonial, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <Card className="rounded-2xl p-8 h-full bg-white/95 hover:shadow-lg transition border-0">
                  <CardContent className="p-0">
                    <div className="text-mindease-primary text-5xl mb-4 leading-none">"</div>
                    <p className="text-lg italic mb-8">{testimonial.quote}</p>
                    <div className="font-semibold text-lg">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="pt-12 text-center"
        >
          <div className="bg-gradient-to-br from-mindease-primary/10 to-mindease-secondary/10 rounded-2xl p-12 shadow-inner">
            <h2 className="section-heading mb-6">Join Our Movement</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're beginning your healing journey or want to support others in theirs, your story matters here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-mindease-primary hover:bg-mindease-primary/90 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl">
                Begin Your Journey
              </button>
              <button className="border-2 border-mindease-primary text-mindease-primary hover:bg-mindease-primary/10 px-8 py-3 rounded-lg font-medium transition hover:shadow-lg">
                Partner With Us
              </button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;