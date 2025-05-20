import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/layout/HeroSection";

// No need to import Swiper styles unless Swiper is used here

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 px-4">
      <HeroSection />

      {/* Logo & Subtitle */}
      <section className="w-full max-w-screen-sm text-center mt-10 sm:mt-16 mb-6 sm:mb-8 px-4 sm:px-0 mx-auto">
        <div className="flex justify-center items-center space-x-2 mb-3 sm:mb-4">
          <span className="text-4xl sm:text-5xl font-extrabold text-mindease-accent drop-shadow-[1px_1px_0_#fff]">Mind</span>
          <span className="text-4xl sm:text-5xl font-extrabold text-mindease-primary drop-shadow-[1px_1px_0_#fff]">Ease</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
          Your journey to better mental wellbeing starts here <span role="img" aria-label="sparkles">💫</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Track your mood, connect with therapists, and join a supportive community <span role="img" aria-label="heart">💖</span>
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full mb-12 sm:mb-16 px-2 sm:px-6">
        {/* Card Template */}
        {[
          {
            title: "Mood Tracking",
            desc: "Track patterns in your mental health with intuitive tools.",
            details: "Identify trends and triggers by recording your daily mood, anxiety levels, and sleep quality.",
            color: "pink",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            ),
          },
          {
            title: "Appointment Booking",
            desc: "Easily schedule sessions with licensed therapists.",
            details: "Use our smart matching system to find therapists who meet your needs and availability.",
            color: "purple",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            ),
          },
          {
            title: "Guided Journaling",
            desc: "Reflect with thoughtful prompts and affirmations 🌱",
            details: "Take a gentle approach to self-reflection with guided prompts that help you explore thoughts and feelings safely.",
            color: "blue",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            ),
          },
        ].map(({ title, desc, details, color, icon }, i) => (
          <Card key={i} className={`bg-white/70 border-2 border-${color}-200 backdrop-blur-md shadow-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[1.01] hover:shadow-${color}-200`}>
            <CardHeader className="pb-3">
              <div className={`rounded-full bg-${color}-100 p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 shadow-inner`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 text-${color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {icon}
                </svg>
              </div>
              <CardTitle className={`text-lg sm:text-xl font-semibold text-${color}-600`}>{title}</CardTitle>
              <CardDescription className="text-gray-500 text-sm sm:text-base">{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{details}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-xs sm:max-w-md text-center mx-auto mb-12 sm:mb-16 px-4">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
          Ready to start your wellness journey?
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link to="/register" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto py-3 px-6 rounded-full bg-pink-400 hover:bg-pink-500 text-white shadow-md hover:shadow-pink-300 text-sm sm:text-base">
              Get Started 💖
            </Button>
          </Link>
          <Link to="/about" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w- auto py-3 px-6 rounded-full border-pink-400 hover:border-pink-500 text-pink-500 shadow-md hover:shadow-pink-300 text-sm sm:text-base">
                Learn More
              </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
