import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Plus, Trash2, BookOpen, Hourglass } from "lucide-react";
import MobileNavigation from "@/components/MobileNavigation";
import ContactForm from "@/components/ContactForm";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const location = useLocation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact SAYC - Students Advocating for Young Children",
    "description": "Get in touch with SAYC's tutoring program coordinators. Located in Lower East Side, NYC. Contact us for enrollment information and volunteer opportunities.",
    "url": "https://sayc-program.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "SAYC - Students Advocating for Young Children",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(555) 123-4567",
        "contactType": "customer service",
        "email": "info@sayc-program.org",
        "availableLanguage": ["English", "Spanish"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lower East Side",
        "addressRegion": "NY",
        "addressCountry": "US"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact SAYC | Free Tutoring Program NYC | Get In Touch</title>
        <meta name="description" content="Contact SAYC's free tutoring program in Lower East Side, NYC. Get enrollment information, volunteer opportunities, and connect with our program coordinators." />
        <meta name="keywords" content="SAYC contact, NYC tutoring program contact, free tutoring Lower East Side, contact SAYC program, tutoring enrollment NYC" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Contact SAYC | Free Tutoring Program NYC" />
        <meta property="og:description" content="Get in touch with SAYC's free tutoring program. Located in Lower East Side, NYC. Contact us for enrollment and volunteer opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sayc-program.com/contact" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact SAYC | Free Tutoring Program NYC" />
        <meta name="twitter:description" content="Get in touch with SAYC's free tutoring program in Lower East Side, NYC." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://sayc-program.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-prep-white font-lato">
        {/* Sticky Navigation Header - matching other pages */}
        <nav className="fixed top-0 left-0 right-0 bg-prep-white shadow-md z-50 border-b border-warm-gray-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/b2dd2e7f-8713-42d0-a780-8e8e8b9c6105.png" 
                  alt="SAYC Logo" 
                  className="h-10 w-10"
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-prep-burgundy font-lato tracking-tight">SAYC</span>
                  <span className="text-xs text-prep-dark-gray font-lato">Students Advocating for Young Children</span>
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
            <h1 className="text-4xl md:text-5xl font-bold text-prep-burgundy mb-6 font-lato text-prep-heading">
              CONTACT INFORMATION
            </h1>
            <p className="text-xl text-prep-dark-gray max-w-3xl mx-auto font-eb-garamond text-prep-subheading-garamond">
              Get in touch with our program coordinators and learn how to get involved
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Program Information */}
            <Card className="border-none shadow-lg bg-light-tan">
              <CardHeader>
                <CardTitle className="text-prep-burgundy font-lato text-prep-heading">PROGRAM LOCATION & HOURS</CardTitle>
                <CardDescription className="text-prep-dark-gray font-eb-garamond text-prep-body-garamond">
                  Visit us in the Lower East Side neighborhood
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-pumpkin mt-1" />
                  <div>
                    <h3 className="font-semibold text-prep-burgundy font-lato text-prep-subheading-gill">LOCATION</h3>
                    <p className="text-prep-dark-gray font-eb-garamond text-prep-body-garamond">Lower East Side<br />Walking distance from Delancey Street-Essex Street Station<br />New York, NY</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Hourglass className="h-6 w-6 text-pumpkin mt-1" />
                  <div>
                    <h3 className="font-semibold text-prep-burgundy font-lato text-prep-subheading-gill">PROGRAM HOURS</h3>
                    <p className="text-prep-dark-gray font-eb-garamond text-prep-body-garamond">Saturdays: 11:00 AM - 3:00 PM<br />October - March<br />Excluding Holidays</p>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-6">
                  <h3 className="font-semibold text-prep-burgundy font-lato text-prep-subheading-gill mb-4">LOCATION MAP</h3>
                  <div className="w-full h-64 bg-prep-white rounded-lg border border-warm-gray-light overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0867337!2d-73.98947508459467!3d40.72057037932939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25985139b6ba9%3A0x738bd0f68e1c28a5!2sDelancey%20St-Essex%20St!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SAYC Area Map - Lower East Side"
                    ></iframe>
                  </div>
                  <div className="mt-4 text-prep-dark-gray font-eb-garamond text-prep-body-garamond">
                    <p className="font-semibold text-prep-burgundy font-lato">PUBLIC TRANSPORTATION:</p>
                    <p><strong>Subway:</strong> Delancey Street-Essex Street (F, M, J, Z)</p>
                    <p><strong>Bus:</strong> M14A SBS, M9, B39, M15 SBS, M15, M21</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form - removed the wrapper card */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
