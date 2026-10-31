import { useState, useEffect } from "react";
import slide1 from "../assets/images/slide 1.jpg";
import slide2 from "../assets/images/slide 2.jpg";
import slide3 from "../assets/images/slide 3.jpg";
import { Link } from "react-router-dom";
import {
  Clock,
  Brain,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  Heart,
} from "lucide-react";

import PageHeader from "../components/PageHeader.jsx";

export const meta = {
  title: "Home",
  path: "/",
  order: 1,
};

const features = [
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Complete a simple assessment in just a few minutes.",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Smart technology helps analyse your stress levels.",
  },
  {
    icon: Lightbulb,
    title: "Personalized Insights",
    description: "Get useful insights based on your assessment.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description: "Your information is treated with care and privacy.",
  },
];
const meditationImages = [
  {
    src: slide1,
    alt: "Person meditating peacefully",
  },
  {
    src: slide2,
    alt: "Yoga and relaxation",
  },
  {
    src: slide3,
    alt: "Peaceful wellbeing practice",
  },
];
export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % meditationImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <PageHeader
        title="Discover Your Stress Level"
        subtitle="Better Insights. Healthier You."
      />

      {/* Hero section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-2">
        <div>
          <p className="text-brand-600 font-semibold mb-3">
            Take charge of your wellbeing
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            Understand Your Stress.
            <span className="text-brand-600"> Improve Your Life.</span>
          </h2>

          <p className="mt-3 text-navy/70 leading-6">
            Discover how stress may be affecting you with our AI-powered
            stress prediction tool. Complete a simple assessment and receive
            insights to help you make informed decisions about your wellbeing.
          </p>

          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 mt-5 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-700"
          >
            Start Assessment
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Meditation slideshow */}
        <div className="flex items-center justify-center">
          <img
            src={meditationImages[currentImage].src}
            alt={meditationImages[currentImage].alt}
            className="w-full max-w-md h-64 object-cover rounded-3xl shadow-lg"
          />
        </div>
      </section>

      {/* Features section */}
      <section className="py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy">
            Why Choose StressPredict?
          </h2>

          <p className="mt-2 text-navy/60">
            Simple tools to help you understand your stress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand-50 p-3">
                  <Icon size={25} className="text-brand-600" />
                </div>

                <h3 className="font-bold text-navy">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-navy/65">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
