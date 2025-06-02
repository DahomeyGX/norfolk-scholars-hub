import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, BookOpen, Heart, Menu } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-prep-white font-gill-sans">
      {/* Sticky Navigation Header - matching Prep for Prep style */}
      <nav className="fixed top-0 left-0 right-0 bg-prep-white shadow-md z-50 border-b border-warm-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-prep-burgundy" />
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
              <Link to="/contact" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                CONTACT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-prep-burgundy" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - matching Prep for Prep layout */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-prep-white to-light-tan">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            {/* Main Hero Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-prep-burgundy mb-6 font-gill-sans leading-tight">
              FREE TUTORING<br />
              <span className="text-prep-dark-gray">FOR ALL</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-prep-dark-gray mb-8 max-w-4xl mx-auto font-garamond text-prep-subheading-garamond leading-relaxed">
              Empowering Lower East Side students through dedicated math and English sessions every Saturday
            </p>

            {/* Key Info Bar */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12 bg-prep-white p-6 rounded-lg shadow-sm border border-warm-gray-light">
              <div className="flex items-center text-prep-burgundy">
                <MapPin className="h-5 w-5 mr-3 text-pumpkin" />
                <div className="text-left">
                  <div className="font-semibold text-prep-subheading-gill">LOCATION</div>
                  <div className="text-prep-dark-gray text-prep-body-gill">111 Norfolk Street, LES</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-warm-gray-light"></div>
              <div className="flex items-center text-prep-burgundy">
                <Calendar className="h-5 w-5 mr-3 text-pumpkin" />
                <div className="text-left">
                  <div className="font-semibold text-prep-subheading-gill">SEASON</div>
                  <div className="text-prep-dark-gray text-prep-body-gill">October - April</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-warm-gray-light"></div>
              <div className="flex items-center text-prep-burgundy">
                <Clock className="h-5 w-5 mr-3 text-pumpkin" />
                <div className="text-left">
                  <div className="font-semibold text-prep-subheading-gill">HOURS</div>
                  <div className="text-prep-dark-gray text-prep-body-gill">11:00 AM - 3:00 PM</div>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild className="px-8 py-4 text-lg font-gill-sans text-prep-subheading-gill rounded-none">
                <Link to="/contact">GET STARTED</Link>
              </Button>
              <Button variant="outline" asChild className="px-8 py-4 text-lg font-gill-sans text-prep-subheading-gill rounded-none">
                <Link to="/schedule">VIEW SCHEDULE</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-prep-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-prep-burgundy mb-6 font-gill-sans text-prep-heading">
              WHAT WE DO
            </h2>
            <p className="text-xl text-prep-dark-gray max-w-3xl mx-auto font-garamond text-prep-subheading-garamond">
              Comprehensive academic support designed to help students excel in mathematics and English
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-light-tan hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-prep-white" />
                </div>
                <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">MATH TUTORING</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                  Interactive math sessions from 11:30 AM to 1:00 PM, building confidence through personalized attention and engaging problem-solving activities.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg bg-light-tan hover:shadow-xl transition-shadow">
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
            
            <Card className="border-none shadow-lg bg-light-tan hover:shadow-xl transition-shadow">
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
      <section className="py-20 px-6 bg-light-tan">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-prep-burgundy mb-6 font-gill-sans text-prep-heading">
              OUR STORY
            </h2>
          </div>
          <div className="bg-prep-white p-8 md:p-12 shadow-lg">
            <div className="prose prose-lg mx-auto text-prep-dark-gray">
              <p className="text-lg leading-relaxed mb-6 font-garamond text-prep-subheading-garamond">
                SAYC (Students Advocating for Young Children) was born from a simple belief: every child deserves access to quality education, regardless of their family's financial circumstances. Located in the heart of the Lower East Side at 111 Norfolk Street, our program has been serving the community with free tutoring services.
              </p>
              <p className="text-lg leading-relaxed mb-6 font-garamond text-prep-subheading-garamond">
                Our dedicated volunteers, many of whom are students themselves, understand the challenges young learners face. We've created a warm, welcoming environment where children can thrive academically while building lasting friendships and confidence.
              </p>
              <p className="text-lg leading-relaxed font-garamond text-prep-subheading-garamond">
                Every Saturday from October to April, we open our doors to provide structured learning sessions that combine academic excellence with fun activities, ensuring that education is both effective and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-prep-burgundy text-prep-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <BookOpen className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-gill-sans">SAYC</span>
                <span className="text-sm text-pumpkin font-gill-sans">Students Advocating for Young Children</span>
              </div>
            </div>
            <div className="border-t border-purple pt-6">
              <p className="text-pumpkin font-gill-sans text-prep-subheading-gill mb-2">
                Serving the Lower East Side Community
              </p>
              <p className="text-prep-white font-gill-sans text-prep-body-gill">
                111 Norfolk Street, Lower East Side | Saturdays 11:00 AM - 3:00 PM
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
