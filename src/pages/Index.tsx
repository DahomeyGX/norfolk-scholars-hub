import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar, MapPin, Clock, Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-prep-white font-gill-sans">
      {/* Header */}
      <header className="bg-prep-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img 
                src="/uploads/a3ae56ad-0489-450a-bea1-2f8cc7ecd47e.png" 
                alt="SAYC Logo" 
                className="h-8 w-8"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-prep-burgundy font-gill-sans tracking-tight">SAYC</span>
                <span className="text-xs text-prep-dark-gray font-gill-sans">Students Advocating for Young Children</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
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
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2">
                <svg className="h-6 w-6 text-prep-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-hero-pattern bg-cover bg-center py-32 text-center text-prep-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-gill-sans text-prep-heading">
            EMPOWERING YOUNG MINDS THROUGH EDUCATION
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-garamond text-prep-subheading-garamond">
            Join our free enrichment program for rising 5th grade public school students of color from low- to moderate-income families
          </p>
          <Button variant="default" size="lg" className="rounded-none bg-pumpkin text-prep-white hover:bg-prep-burgundy transition-colors text-lg py-3">
            LEARN MORE
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-prep-burgundy mb-8 font-gill-sans text-prep-heading">
            ABOUT US
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-prep-dark-gray mb-6 font-garamond text-prep-body-garamond">
                Students Advocating for Young Children (SAYC) is a free enrichment program for rising 5th grade public school students of color from low- to moderate-income families. Led by Prep for Prep high school volunteers, SAYC offers engaging learning in ELA and Math!
              </p>
              <p className="text-lg text-prep-dark-gray mb-6 font-garamond text-prep-body-garamond">
                Our mission is to provide high-quality educational support and mentorship to promising young students, helping them to achieve their full potential.
              </p>
            </div>
            <div>
              <Card className="border-none shadow-lg bg-light-tan">
                <CardHeader>
                  <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">PROGRAM HIGHLIGHTS</CardTitle>
                  <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                    What makes our program special
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-pumpkin" />
                    <div>
                      <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Engaging Curriculum</h3>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Hands-on activities and projects</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-pumpkin" />
                    <div>
                      <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Dedicated Mentors</h3>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Supportive high school volunteers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-pumpkin" />
                    <div>
                      <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Saturday Sessions</h3>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">October through March</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Details Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-prep-burgundy mb-8 font-gill-sans text-prep-heading">
            PROGRAM DETAILS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-light-tan">
              <CardHeader>
                <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">LOCATION</CardTitle>
                <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                  Where we meet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-pumpkin" />
                  <div>
                    <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Lower East Side, NYC</h3>
                    <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">111 Norfolk Street</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-prep-white">
              <CardHeader>
                <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">SCHEDULE</CardTitle>
                <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                  When we meet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-pumpkin" />
                  <div>
                    <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Saturdays</h3>
                    <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">11:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-light-tan">
              <CardHeader>
                <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">SUBJECTS</CardTitle>
                <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                  What we teach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calculator className="h-6 w-6 text-pumpkin" />
                  <div>
                    <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Math</h3>
                    <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Problem-solving and critical thinking</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-6 w-6 text-pumpkin" />
                  <div>
                    <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">ELA</h3>
                    <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Reading, writing, and communication</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-prep-burgundy mb-8 font-gill-sans text-prep-heading">
            READY TO GET STARTED?
          </h2>
          <p className="text-xl text-prep-dark-gray mb-12 font-garamond text-prep-body-garamond">
            Apply now to join our enriching program and unlock your child's potential
          </p>
          <Button variant="default" size="lg" className="rounded-none bg-pumpkin text-prep-white hover:bg-prep-burgundy transition-colors text-lg py-3">
            APPLY NOW
          </Button>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-prep-burgundy text-prep-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <img 
                src="/uploads/a3ae56ad-0489-450a-bea1-2f8cc7ecd47e.png" 
                alt="SAYC Logo" 
                className="h-8 w-8"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-gill-sans tracking-tight">SAYC</span>
                <span className="text-xs font-gill-sans opacity-90">Students Advocating for Young Children</span>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="text-sm opacity-80">
              <p>111 Norfolk Street, New York, NY 10002</p>
              <p>Email: info@saycprogram.org</p>
              <p>Phone: (212) 123-4567</p>
            </div>

            {/* Copyright */}
            <p className="text-xs opacity-70">
              &copy; 2024 Students Advocating for Young Children. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
