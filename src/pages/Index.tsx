import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/effect-fade";
import HeroSection from "@/components/layout/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 px-4">
      <HeroSection />

      {/* Logo & Subtitle */}
      <div className="max-w-4xl w-full text-center mt-16 mb-8">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <span className="text-5xl font-extrabold text-mindease-accent drop-shadow-[1px_1px_0_#fff]">Mind</span>
          <span className="text-5xl font-extrabold text-mindease-primary drop-shadow-[1px_1px_0_#fff]">Ease</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Your journey to better mental wellbeing starts here 💫
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Track your mood, connect with therapists, and join a supportive community 💖
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
        {/* Mood Tracking Card */}
        <Card className="bg-white/70 border-2 border-pink-200 backdrop-blur-md shadow-lg rounded-2xl transition-transform hover:scale-105 hover:shadow-pink-200">
          <CardHeader>
            <div className="rounded-full bg-pink-100 p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <CardTitle className="text-xl font-semibold text-pink-600">Mood Tracking</CardTitle>
            <CardDescription className="text-gray-500">
              Track patterns in your mental health with intuitive tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Identify trends and triggers by recording your daily mood, anxiety levels, and sleep quality with our easy-to-use mood journal.
            </p>
          </CardContent>
        </Card>

        {/* Appointment Booking Card */}
        <Card className="bg-white/70 border-2 border-purple-200 backdrop-blur-md shadow-lg rounded-2xl transition-transform hover:scale-105 hover:shadow-purple-200">
          <CardHeader>
            <div className="rounded-full bg-purple-100 p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <CardTitle className="text-xl font-semibold text-purple-600">Appointment Booking</CardTitle>
            <CardDescription className="text-gray-500">
              Easily schedule sessions with licensed therapists.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Use our smart matching system to find therapists who meet your needs and availability.
            </p>
          </CardContent>
        </Card>

        {/* Guided Journaling Card */}
        <Card className="bg-white/70 border-2 border-blue-200 backdrop-blur-md shadow-lg rounded-2xl transition-transform hover:scale-105 hover:shadow-blue-200">
          <CardHeader>
            <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle className="text-xl font-semibold text-blue-600">Guided Journaling</CardTitle>
            <CardDescription className="text-gray-500">
              Reflect with thoughtful prompts and affirmations 🌱
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Take a gentle approach to self-reflection with guided prompts that help you explore thoughts and feelings safely.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
