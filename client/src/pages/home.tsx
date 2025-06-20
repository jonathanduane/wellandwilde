import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/subscribe", { email });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome to Well & Wilde!",
        description: data.message,
      });
      setEmail("");
    },
    onError: (error: any) => {
      const errorMessage = error.message.includes("400:") 
        ? error.message.split("400:")[1].trim()
        : "An error occurred. Please try again.";
      
      toast({
        title: "Subscription Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    subscriptionMutation.mutate(email);
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHello = () => {
    document.getElementById('hello')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="logo-text text-xl font-semibold">
              Well + Wilde
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={scrollToServices} className="text-gray-600 hover:text-black transition-colors">
                Services
              </button>
              <button onClick={scrollToHello} className="text-gray-600 hover:text-black transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Well and Wilde homepage_1750407973175.jpg')"
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <div className="mb-8">
            <h1 className="logo-text text-5xl md:text-7xl lg:text-8xl font-light mb-4">
              Well + Wilde
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide opacity-90">
              Redefining Wellness
            </p>
          </div>
          
          <div className="coming-soon-badge bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-3 inline-block mb-8">
            <span className="text-white font-medium tracking-wide">Coming Soon</span>
          </div>
          
          <div className="animate-float cursor-pointer" onClick={scrollToServices}>
            <ChevronDown className="text-2xl opacity-70" size={32} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">What We Do</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Creating transformative experiences that inspire, connect, and elevate your wellness journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Corporate Craft Workshops */}
            <div className="service-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div 
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Well and Wilde .pptx (17)_1750407973174.jpg')"
                }}
              />
              <div className="p-8">
                <h3 className="font-serif text-2xl font-medium mb-4">Corporate Craft Workshops</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Spark creativity and teamwork with our customized in-house craft workshops. From hands-on art sessions to innovative wellness-focused team-building activities, we deliver unique experiences to your workplace, cultivating a culture of inspiration and collaboration.
                </p>
                <span className="inline-block text-sm font-medium text-black border-b border-black">
                  In-House
                </span>
              </div>
            </div>

            {/* Unique Wellness Retreats */}
            <div className="service-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div 
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Well and Wilde .pptx (6)_1750407973171.jpg')"
                }}
              />
              <div className="p-8">
                <h3 className="font-serif text-2xl font-medium mb-4">Unique Wellness Retreats</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Have a bold idea for a retreat? Whether it's a one-of-a-kind day retreat, curated well-being experiences for a venue or festival, or a meaningful team-bonding day, let's collaborate to bring your vision to life with creativity and intention.
                </p>
                <span className="inline-block text-sm font-medium text-black border-b border-black">
                  Custom Experiences
                </span>
              </div>
            </div>

            {/* Brand Events */}
            <div className="service-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div 
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Well and Wilde .pptx (16)_1750407973174.jpg')"
                }}
              />
              <div className="p-8">
                <h3 className="font-serif text-2xl font-medium mb-4">Brand Events</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your brand activation, product launch, in-store event, or press breakfast should captivate in an instant. We craft authentic, inclusive experiences that invite your audience into a meaningful community and conversation, leaving a lasting impact.
                </p>
                <span className="inline-block text-sm font-medium text-black border-b border-black">
                  Brand Activations
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">Our Experiences</h2>
            <p className="text-gray-600 text-lg">A glimpse into our curated wellness journeys</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="aspect-square bg-cover bg-center rounded-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: "url('/images/Well and Wilde .pptx (15)_1750407973173.jpg')"
              }}
            />
            <div 
              className="aspect-square bg-cover bg-center rounded-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: "url('/images/Well and Wilde .pptx (1)_1750407973169.jpg')"
              }}
            />
            <div 
              className="aspect-square bg-cover bg-center rounded-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: "url('/images/Well and Wilde .pptx (9)_1750407973172.jpg')"
              }}
            />
            <div 
              className="aspect-square bg-cover bg-center rounded-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: "url('/images/Well and Wilde .pptx (8)_1750407973171.jpg')"
              }}
            />
          </div>
        </div>
      </section>

      {/* Hello Section (Email Capture) */}
      <section id="hello" className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">Hello</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to redefine wellness together? Join our community and be the first to know when we launch.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                required
              />
              <Button
                type="submit"
                disabled={subscriptionMutation.isPending}
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {subscriptionMutation.isPending ? "Joining..." : "Join Us"}
              </Button>
            </div>
          </form>
          
          <div className="space-y-4 text-center">
            <p className="text-white/80">
              hello@wellandwilde.com
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="logo-text text-2xl font-medium mb-4">Well + Wilde</div>
            <p className="text-white/70 mb-6">Redefining Wellness</p>
            <p className="text-sm text-white/50">
              © 2024 Well & Wilde. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}