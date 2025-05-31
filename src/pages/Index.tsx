
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, BookOpen, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Navigation */}
      <nav className="bg-red-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-2xl font-bold">SAYC</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-amber-200 transition-colors">Home</Link>
              <Link to="/schedule" className="hover:text-amber-200 transition-colors">Schedule</Link>
              <Link to="/contact" className="hover:text-amber-200 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6">
            Students Advocating for Young Children
          </h1>
          <p className="text-xl text-amber-800 mb-8 max-w-3xl mx-auto">
            Free tutoring program serving the Lower East Side community with dedicated math and English sessions every Saturday
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center text-red-900">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="font-semibold">111 Norfolk Street, Lower East Side</span>
            </div>
            <div className="flex items-center text-red-900">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="font-semibold">Saturdays, October - April</span>
            </div>
            <div className="flex items-center text-red-900">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">11:00 AM - 3:00 PM</span>
            </div>
          </div>
          <Button asChild className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 text-lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-red-900 text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-red-900 mb-4" />
                <CardTitle className="text-red-900">Math Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-800">
                  Interactive math sessions from 11:30 AM to 1:00 PM, helping students build confidence and skills in mathematics through personalized attention and engaging activities.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-red-900 mb-4" />
                <CardTitle className="text-red-900">English Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-800">
                  Comprehensive English learning from 1:30 PM to 3:00 PM, focusing on reading comprehension, writing skills, and vocabulary development in a supportive environment.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-900 mb-4" />
                <CardTitle className="text-red-900">Community Building</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-800">
                  Morning games and lunch time create a welcoming community where students form friendships and feel supported in their educational journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-red-900 text-center mb-8">Our Story</h2>
          <div className="prose prose-lg mx-auto text-amber-800">
            <p className="text-lg leading-relaxed mb-6">
              SAYC (Students Advocating for Young Children) was born from a simple belief: every child deserves access to quality education, regardless of their family's financial circumstances. Located in the heart of the Lower East Side at 111 Norfolk Street, our program has been serving the community with free tutoring services.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our dedicated volunteers, many of whom are students themselves, understand the challenges young learners face. We've created a warm, welcoming environment where children can thrive academically while building lasting friendships and confidence.
            </p>
            <p className="text-lg leading-relaxed">
              Every Saturday from October to April, we open our doors to provide structured learning sessions that combine academic excellence with fun activities, ensuring that education is both effective and enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">SAYC</span>
          </div>
          <p className="text-amber-200">
            Students Advocating for Young Children - Serving the Lower East Side Community
          </p>
          <p className="text-amber-200 mt-2">
            111 Norfolk Street, Lower East Side | Saturdays 11:00 AM - 3:00 PM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
