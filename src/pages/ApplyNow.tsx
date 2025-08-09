
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import MobileNavigation from "@/components/MobileNavigation";

const ApplyNow = () => {
  const location = useLocation();
  
  const requirements = [
    {
      title: "Grade Level",
      description: "Must be a current 5th grade student during the 2025–2026 school year."
    },
    {
      title: "School Type", 
      description: "Must attend a public school."
    },
    {
      title: "Background",
      description: "Must be a student from a diverse background who would benefit from enrichment opportunities."
    },
    {
      title: "Family Income",
      description: "Must come from a low- to moderate-income family background."
    },
    {
      title: "Location",
      description: "Must be able to attend in-person sessions held in the Lower East Side, NYC."
    },
    {
      title: "Availability",
      description: "Must be available on Saturdays from 11:00 AM to 3:00 PM, September 2025 through March 2026."
    },
    {
      title: "Interest in Enrichment",
      description: "Should have a demonstrated interest or capability in gifted-level work, especially in ELA and Math."
    },
    {
      title: "Application Completion",
      description: "Must submit a complete application to be considered (incomplete applications will not be reviewed)."
    },
    {
      title: "Interview",
      description: "Must be available for a Zoom interview, scheduled on a rolling basis."
    },
    {
      title: "Contact Information",
      description: "Must provide a valid email address for communication and interview scheduling."
    }
  ];

  return (
    <div className="min-h-screen bg-prep-white font-gill-sans">
      {/* Sticky Navigation Header */}
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
              <Link to="/apply" className="text-prep-burgundy font-semibold text-prep-subheading-gill hover:text-pumpkin transition-colors border-b-2 border-prep-burgundy">
                APPLY NOW
              </Link>
              <Link to="/contact" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
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
            APPLY NOW
          </h1>
          <p className="text-xl text-prep-dark-gray max-w-3xl mx-auto font-garamond text-prep-subheading-garamond">
            Join our free enrichment program for rising 5th grade public school students from diverse backgrounds and low- to moderate-income families
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* QR Code Application Section */}
          <Card className="border-none shadow-lg bg-light-tan">
            <CardHeader className="text-center">
              <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">START YOUR APPLICATION</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Scan the QR code or click below to access the full application form
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="flex justify-center">
                <img 
                  src="/uploads/sayc-application-qr-code.png" 
                  alt="QR Code for SAYC Application"
                  className="w-64 h-64 border border-warm-gray-light rounded-lg shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                  Use your phone to scan the QR code above, or click the button below to access our application form.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full rounded-none bg-prep-white text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white transition-colors text-lg py-3"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdT5PI0AMyinzwJLPLqvLon7-zVpygKTDsxCaTT0T5FlGGnAw/viewform', '_blank')}
                >
                  OPEN APPLICATION FORM
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Program Overview */}
          <Card className="border-none shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">ABOUT SAYC</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                What makes our program special
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-light-tan p-6 rounded-lg">
                <h3 className="font-semibold text-prep-burgundy mb-3 font-gill-sans text-prep-subheading-gill">Our Mission</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                  Students Advocating for Young Children (SAYC) is a free enrichment program for rising 5th grade public school students from diverse communities and low- to moderate-income families. Led by Prep for Prep high school volunteers, SAYC offers engaging learning in ELA and Math!
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-light-tan rounded-lg">
                  <div className="text-2xl font-bold text-prep-burgundy font-gill-sans">FREE</div>
                  <div className="text-prep-dark-gray font-garamond text-prep-body-garamond">No cost to families</div>
                </div>
                <div className="text-center p-4 bg-light-tan rounded-lg">
                  <div className="text-2xl font-bold text-prep-burgundy font-gill-sans">6 MONTHS</div>
                  <div className="text-prep-dark-gray font-garamond text-prep-body-garamond">October - March</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Requirements */}
        <Card className="border-none shadow-lg bg-prep-white mb-8">
          <CardHeader>
            <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">APPLICATION REQUIREMENTS</CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Please review all requirements before applying
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-light-tan rounded-lg">
                  <CheckCircle className="h-5 w-5 text-pumpkin mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">
                      {requirement.title}
                    </h4>
                    <p className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-none shadow-lg bg-light-tan">
          <CardHeader>
            <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">NEXT STEPS</CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              What happens after you apply
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-prep-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4 text-prep-white font-bold text-xl">1</div>
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">APPLY</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Complete the application form using the QR code or link above</p>
              </div>
              
              <div className="text-center p-6 bg-prep-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4 text-prep-white font-bold text-xl">2</div>
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">INTERVIEW</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Participate in a Zoom interview scheduled on a rolling basis</p>
              </div>
              
              <div className="text-center p-6 bg-prep-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-prep-burgundy rounded-full flex items-center justify-center mx-auto mb-4 text-prep-white font-bold text-xl">3</div>
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">JOIN US</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Start your enrichment journey with SAYC this October</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyNow;
