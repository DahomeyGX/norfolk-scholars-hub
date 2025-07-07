
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Plus, Trash2, BookOpen } from "lucide-react";
import MobileNavigation from "@/components/MobileNavigation";

const Contact = () => {
  const location = useLocation();

  const staffMembers = [
    {
      name: "Sarah Johnson",
      role: "Program Director",
      email: "sarah.johnson@prepforprep.org",
      phone: "(555) 123-4567"
    },
    {
      name: "Michael Chen",
      role: "Math Coordinator",
      email: "michael.chen@prepforprep.org", 
      phone: "(555) 234-5678"
    },
    {
      name: "Amanda Rodriguez",
      role: "English Coordinator",
      email: "amanda.rodriguez@prepforprep.org",
      phone: "(555) 345-6789"
    }
  ];

  return (
    <div className="min-h-screen bg-prep-white font-gill-sans">
      {/* Sticky Navigation Header - matching other pages */}
      <nav className="fixed top-0 left-0 right-0 bg-prep-white shadow-md z-50 border-b border-warm-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/a3ae56ad-0489-450a-bea1-2f8cc7ecd47e.png" 
                alt="SAYC Logo" 
                className="h-8 w-8"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-prep-burgundy font-gill-sans tracking-tight">SAYC</span>
                <span className="text-xs text-prep-dark-gray font-gill-sans">Students Advocating for Young Children</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                HOME
              </Link>
              <Link to="/schedule" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                SCHEDULE
              </Link>
              <Link to="/apply" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                APPLY NOW
              </Link>
              <Link to="/contact" className="text-prep-burgundy font-semibold text-prep-subheading-gill hover:text-pumpkin transition-colors border-b-2 border-prep-burgundy">
                CONTACT
              </Link>
            </div>

            <MobileNavigation currentPath={location.pathname} />
          </div>
        </div>
      </nav>

      <div className="pt-20 max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-prep-burgundy mb-6 font-gill-sans text-prep-heading">
            CONTACT INFORMATION
          </h1>
          <p className="text-xl text-prep-dark-gray max-w-3xl mx-auto font-garamond text-prep-subheading-garamond">
            Get in touch with our program coordinators and learn how to get involved
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Program Information */}
          <Card className="border-none shadow-lg bg-light-tan">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">PROGRAM LOCATION & HOURS</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Visit us at our Lower East Side location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-pumpkin mt-1" />
                <div>
                  <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">ADDRESS</h3>
                  <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">111 Norfolk Street<br />Lower East Side<br />New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-pumpkin mt-1" />
                <div>
                  <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">PROGRAM HOURS</h3>
                  <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Saturdays: 11:00 AM - 3:00 PM<br />October - March<br />Excluding Holidays</p>
                </div>
              </div>

              {/* Map */}
              <div className="mt-6">
                <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill mb-4">LOCATION MAP</h3>
                <div className="w-full h-64 bg-prep-white rounded-lg border border-warm-gray-light overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0867337!2d-73.98947508459467!3d40.72057037932939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598b0b6b0b0b%3A0x0!2s111%20Norfolk%20St%2C%20New%20York%2C%20NY%2010002!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SAYC Location Map"
                  ></iframe>
                </div>
                <div className="mt-4 text-prep-dark-gray font-garamond text-prep-body-garamond">
                  <p className="font-semibold text-prep-burgundy font-gill-sans">PUBLIC TRANSPORTATION:</p>
                  <p><strong>Subway:</strong> Delancey Street-Essex Street (F, M, J, Z)</p>
                  <p><strong>Bus:</strong> M14A SBS, M9, B39, M15 SBS</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Members */}
          <Card className="border-none shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">OUR TEAM</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Meet our dedicated program staff
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {staffMembers.map((staff, index) => (
                <div key={index} className="border border-warm-gray-light p-6 rounded-lg bg-light-tan">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full border-4 border-prep-burgundy bg-black flex items-center justify-center">
                      {/* Placeholder for future profile picture */}
                    </div>
                    <div>
                      <h4 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">{staff.name}</h4>
                      <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">{staff.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-pumpkin" />
                      <span className="text-prep-dark-gray font-garamond text-prep-body-garamond">{staff.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-pumpkin" />
                      <span className="text-prep-dark-gray font-garamond text-prep-body-garamond">{staff.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* How to Reach Us */}
        <Card className="border-none shadow-lg mt-8 bg-light-tan">
          <CardHeader>
            <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">HOW TO REACH US</CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Multiple ways to get in touch with our program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-prep-white rounded-lg shadow-sm">
                <Mail className="h-8 w-8 text-pumpkin mx-auto mb-4" />
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">EMAIL US</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Send us an email for general inquiries or to learn more about volunteering</p>
              </div>
              
              <div className="text-center p-6 bg-prep-white rounded-lg shadow-sm">
                <Phone className="h-8 w-8 text-pumpkin mx-auto mb-4" />
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">CALL US</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Speak directly with our program coordinators about enrollment or questions</p>
              </div>
              
              <div className="text-center p-6 bg-prep-white rounded-lg shadow-sm">
                <MapPin className="h-8 w-8 text-pumpkin mx-auto mb-4" />
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">VISIT US</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Stop by during program hours to see our tutoring sessions in action</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
