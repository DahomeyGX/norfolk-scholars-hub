
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Calculator, BookOpen, Heart, Menu, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import MobileNavigation from "@/components/MobileNavigation";
import AuthButton from "@/components/AuthButton";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const heroSlides = [
    {
      image: "/uploads/sayc-tutoring-session-1.png",
      quote: "Tutoring isn't just about academics; it's about helping kids believe in themselves.",
      author: "Claire Huang (XLII), Math Leadership Team"
    },
    {
      image: "/uploads/sayc-tutoring-session-2.png",
      quote: "Every child learns differently. My job is to find the key that unlocks their potential.",
      author: "Jojo Valdez (XLIII), English Leadership Team"
    },
    {
      image: "/uploads/sayc-tutoring-session-3.png",
      quote: "Teaching kids reminds me that curiosity is the root of all learning.",
      author: "Eva Nelson-Torres (XLIII), English Leadership Team"
    },
    {
      image: "/uploads/sayc-tutoring-session-4.png",
      quote: "When a student says, 'Oh! I get it now!' That is the moment I live for.",
      author: "Habiba Mansour (XLIII), Math Leadership Team"
    },
    {
      image: "/uploads/sayc-tutoring-session-5.png",
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Jordan Gascoigne (XLII), English Leadership Team"
    }
  ];

  // Auto-advance slides with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>SAYC - Students Advocating for Young Children | Free Tutoring NYC</title>
        <meta name="description" content="SAYC offers free academic enrichment for rising 5th grade students from diverse backgrounds in NYC. Saturday tutoring program in Math and English at Lower East Side. Led by Prep for Prep volunteers." />
        <meta name="keywords" content="SAYC, Students Advocating for Young Children, free tutoring NYC, academic enrichment, 5th grade students, Lower East Side, Prep for Prep, Saturday tutoring, diverse students, underrepresented youth" />
        
        {/* Open Graph tags for social media */}
        <meta property="og:title" content="SAYC - Students Advocating for Young Children | Free Tutoring NYC" />
        <meta property="og:description" content="Free academic enrichment for rising 5th grade students from diverse backgrounds in NYC. Saturday tutoring program in Math and English at Lower East Side." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sayc-program.com" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SAYC - Students Advocating for Young Children | Free Tutoring NYC" />
        <meta name="twitter:description" content="Free academic enrichment for rising 5th grade students from diverse backgrounds in NYC. Saturday tutoring program in Math and English." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://sayc-program.com" />
      </Helmet>

      <div className="min-h-screen bg-prep-white font-gill-sans">
        {/* Sticky Navigation Header - matching Prep for Prep style */}
        <nav className="fixed top-0 left-0 right-0 bg-prep-white shadow-md z-50 border-b border-warm-gray-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section - No longer clickable */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/b2dd2e7f-8713-42d0-a780-8e8e8b9c6105.png" 
                  alt="SAYC Logo" 
                  className="h-10 w-10"
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-prep-burgundy font-gill-sans tracking-tight">SAYC</span>
                  <span className="text-xs text-prep-dark-gray font-gill-sans">Students Advocating for Young Children</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-prep-burgundy font-semibold text-prep-subheading-gill hover:text-pumpkin transition-colors border-b-2 border-prep-burgundy">
                  HOME
                </Link>
                <Link to="/schedule" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                  SCHEDULE
                </Link>
                <Link to="/apply" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                  APPLY NOW
                </Link>
                <Link to="/contact" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                  CONTACT
                </Link>
                <AuthButton />
              </div>

              {/* Mobile Navigation */}
              <MobileNavigation currentPath="/" />
            </div>
          </div>
        </nav>

        
        {/* Hero Section with Image Carousel */}
        <section className="pt-20 relative h-screen">
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={heroSlides[currentSlide].image}
                alt={`SAYC tutoring ${currentSlide + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <div className="absolute inset-0 bg-prep-burgundy bg-opacity-40"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
                <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 font-gill-sans leading-tight transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <span className="text-prep-white">SAYC</span><br />
                  <span className="text-pumpkin">SATURDAY ACADEMY</span>
                </h1>
                <div className={`bg-prep-white bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-lg mb-6 sm:mb-8 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-prep-burgundy mb-3 sm:mb-4 font-garamond italic leading-relaxed">
                    "{heroSlides[currentSlide].quote}"
                  </blockquote>
                  <cite className="text-prep-dark-gray font-gill-sans text-base sm:text-lg font-semibold">
                    {heroSlides[currentSlide].author}
                  </cite>
                </div>
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-500 delay-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <Button variant="outline" asChild className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-gill-sans text-prep-subheading-gill rounded-none bg-prep-white text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white transition-colors">
                    <Link to="/contact">GET STARTED</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-gill-sans text-prep-subheading-gill rounded-none bg-prep-white text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white transition-colors">
                    <Link to="/schedule">VIEW SCHEDULE</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-prep-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-prep-burgundy" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-prep-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-prep-burgundy" />
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-prep-white' : 'bg-prep-white bg-opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Key Info Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-prep-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-center bg-light-tan p-6 sm:p-8 rounded-lg shadow-sm border border-warm-gray-light">
              <div className="flex items-center text-prep-burgundy text-center md:text-left">
                <MapPin className="h-5 w-5 mr-3 text-pumpkin flex-shrink-0" />
                <div>
                  <div className="font-semibold text-prep-subheading-gill">LOCATION</div>
                  <div className="text-prep-dark-gray text-prep-body-gill">111 Norfolk Street, LES</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-warm-gray-light"></div>
              <div className="flex items-center text-prep-burgundy text-center md:text-left">
                <Calendar className="h-5 w-5 mr-3 text-pumpkin flex-shrink-0" />
                <div>
                  <div className="font-semibold text-prep-subheading-gill">SEASON</div>
                  <div className="text-prep-dark-gray text-prep-body-gill">October 4th - March</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-warm-gray-light"></div>
              <div className="flex items-center text-prep-burgundy text-center md:text-left">
                <Clock className="h-5 w-5 mr-3 text-pumpkin flex-shrink-0" />
                <div>
                  <div className="font-semibold text-prep-subheading-gill">HOURS</div>
                  <div className="text-prep-dark-gray text-prep-body-gill">11:00 AM - 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-light-tan">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-prep-burgundy mb-4 sm:mb-6 font-gill-sans text-prep-heading">
                WHAT WE DO
              </h2>
              <p className="text-lg sm:text-xl text-prep-dark-gray max-w-3xl mx-auto font-garamond text-prep-subheading-garamond px-4">
                Students Advocating for Young Children (SAYC) is a free enrichment program for rising 5th grade public school students from diverse backgrounds and low- to moderate-income families. Led by Prep for Prep high school volunteers, SAYC offers engaging learning in ELA and Math!
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="border-none shadow-lg bg-prep-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-prep-white" />
                  </div>
                  <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">MATH TUTORING</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                    Interactive math sessions from 11:30 AM to 1:00 PM, building confidence through personalized attention and engaging problem-solving activities.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg bg-prep-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-prep-white" />
                  </div>
                  <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">ENGLISH SESSIONS</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                    Comprehensive English learning from 1:30 PM to 3:00 PM, focusing on reading comprehension, writing skills, and vocabulary development.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg bg-prep-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-prep-white" />
                  </div>
                  <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">COMMUNITY</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                    Building lasting friendships through morning games and shared meals, creating a supportive learning environment for all students.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-prep-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-prep-burgundy mb-4 sm:mb-6 font-gill-sans text-prep-heading">
                OUR STORY
              </h2>
            </div>
            <div className="bg-light-tan p-6 sm:p-8 md:p-12 shadow-lg">
              <div className="prose prose-lg mx-auto text-prep-dark-gray">
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 font-garamond text-prep-subheading-garamond">
                  SAYC (Students Advocating for Young Children) was born from a simple belief: every child deserves access to quality education, regardless of their family's financial circumstances. Located in the heart of the Lower East Side at 111 Norfolk Street, our program has been serving students from diverse communities and low- to moderate-income families with free enrichment services.
                </p>
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 font-garamond text-prep-subheading-garamond">
                  Our dedicated volunteers, many of whom are students themselves, understand the challenges young learners face from underrepresented backgrounds. We've created a warm, welcoming environment where children can thrive academically while building lasting friendships and confidence.
                </p>
                <p className="text-base sm:text-lg leading-relaxed font-garamond text-prep-subheading-garamond">
                  Every Saturday starting October 4th through March, we open our doors to provide structured learning sessions that combine academic excellence with fun activities, ensuring that education is both effective and enjoyable for students from all walks of life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prep for Prep Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-light-tan">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-prep-burgundy mb-4 sm:mb-6 font-gill-sans text-prep-heading">
                PREP FOR PREP
              </h2>
            </div>
            
            <div className="bg-prep-white p-6 sm:p-8 md:p-12 shadow-lg rounded-lg">
              <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
                <div className="lg:w-1/3 flex justify-center">
                  <div className="bg-prep-burgundy p-6 sm:p-8 rounded-lg">
                    <img 
                      src="/uploads/prep-for-prep-logo.png" 
                      alt="Prep for Prep Logo"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="lg:w-2/3 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-prep-burgundy mb-3 sm:mb-4 font-gill-sans">About Prep for Prep</h3>
                    <p className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                      Prep for Prep is a leadership development and educational access program that supports high-achieving students from diverse backgrounds and low- to moderate-income families. Founded in 1978, it prepares students for placement at top independent day and boarding schools in the Northeast.
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">Academic Enrichment</h4>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond text-sm leading-relaxed">
                        Students begin with a rigorous 14-month Preparatory Component, including two intensive summer sessions and after-school/Saturday classes during the school year.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">School Placement & Scholarships</h4>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond text-sm leading-relaxed">
                        Graduates are placed at top-tier independent schools, which offer over $12 million in scholarships each year.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">College & Leadership Support</h4>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond text-sm leading-relaxed">
                        Students receive college counseling, career exploration opportunities, and access to internships and leadership programs.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">Alumni Network</h4>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond text-sm leading-relaxed">
                        Prep for Prep maintains a strong alumni community, with graduates thriving in fields such as law, medicine, education, and public service.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-gill-sans rounded-none bg-prep-white text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white transition-colors"
                    >
                      <a href="https://www.prepforprep.org" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start">
                        Learn More About Prep for Prep
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-prep-burgundy text-prep-white py-10 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
                <img 
                  src="/lovable-uploads/5917bd92-cfe0-49da-b736-b58d3e8a1d57.png" 
                  alt="SAYC Logo" 
                  className="h-8 w-8"
                />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold font-gill-sans">SAYC</span>
                  <span className="text-xs sm:text-sm text-pumpkin font-gill-sans">Students Advocating for Young Children</span>
                </div>
              </div>
              <div className="border-t border-purple pt-4 sm:pt-6 text-center">
                <p className="text-pumpkin font-gill-sans text-prep-subheading-gill mb-2">
                  Serving the Lower East Side Community
                </p>
                <p className="text-prep-white font-gill-sans text-prep-body-gill text-sm sm:text-base">
                  111 Norfolk Street, Lower East Side | Saturdays 11:00 AM - 3:00 PM
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
