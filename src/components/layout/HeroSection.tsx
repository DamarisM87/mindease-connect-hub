import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    src: "Assets/mental-health.png",
    alt: "Calm journal writing",
  },
  {
    src: "Assets/selfcare.png",
    alt: "Peaceful garden walk",
  },
  {
    src: "Assets/Retro Summer Journaling Aesthetic.jpg",
    alt: "Soft clouds and sky",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-pink-100 via-indigo-100 to-blue-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 space-y-10 md:space-y-0 md:space-x-10">
        {/* Text Section */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-mindease-primary drop-shadow-md">
            🌸 Begin Your Journey to Mental Wellness 🌈
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-mindease-muted/80">
            Track your mood, talk to therapists, and explore your feelings gently—one soft step at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/register">
              <Button size="lg" className="bg-pink-200 text-mindease-primary hover:bg-pink-300 rounded-full shadow-md">
                Get Started 💖
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-mindease-primary text-mindease-primary hover:bg-mindease-primary/10 rounded-full flex items-center gap-2"
              >
                Learn More
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Swiper Image Section */}
        <div className="md:w-1/2 w-full flex justify-center">
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            autoplay={{ delay: 4000 }}
            loop
            className="rounded-xl"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
