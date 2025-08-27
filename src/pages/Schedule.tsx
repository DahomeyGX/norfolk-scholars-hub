

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Calculator, Utensils, GamepadIcon, BookOpen } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import MobileNavigation from "@/components/MobileNavigation";
import { format } from 'date-fns';

const Schedule = () => {
  const location = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Fetch sessions from database
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('session_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Convert sessions to calendar format - fix timezone issue by creating date from parts
  const sessionDates = sessions?.filter(session => session.is_active).map(session => {
    // Parse the date string manually to avoid timezone shifts
    const dateParts = session.session_date.split('-');
    return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  }) || [];

  const noSessionDates = sessions?.filter(session => !session.is_active).map(session => {
    // Parse the date string manually to avoid timezone shifts
    const dateParts = session.session_date.split('-');
    return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  }) || [];

  // Function to check if a date is a session date
  const isSessionDate = (date: Date) => {
    return sessionDates.some(sessionDate => 
      sessionDate.toDateString() === date.toDateString()
    );
  };

  // Function to check if a date is a no-session date
  const isNoSessionDate = (date: Date) => {
    return noSessionDates.some(noSessionDate => 
      noSessionDate.toDateString() === date.toDateString()
    );
  };

  const firstSession = sessions?.find(session => session.is_active);
  const lastSession = sessions?.filter(session => session.is_active).pop();

  // Helper function to create Date from session date string
  const createDateFromSessionString = (dateString: string) => {
    const parts = dateString.split('-').map(part => parseInt(part));
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

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
              <Link to="/schedule" className="text-prep-burgundy font-semibold text-prep-subheading-gill hover:text-pumpkin transition-colors border-b-2 border-prep-burgundy">
                SCHEDULE
              </Link>
              <Link to="/apply" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
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
            PROGRAM SCHEDULE
          </h1>
          <p className="text-xl text-prep-dark-gray max-w-3xl mx-auto font-garamond text-prep-subheading-garamond">
            Our structured Saturday program designed to maximize learning and fun
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Schedule Display */}
          <Card className="border-none shadow-lg bg-light-tan">
            <CardHeader>
              <CardTitle className="text-prep-burgundy flex items-center font-gill-sans text-prep-heading">
                <Clock className="h-6 w-6 mr-3" />
                DAILY SCHEDULE (SATURDAYS)
              </CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-subheading-garamond">
                Our structured Saturday program runs from 11:00 AM to 3:00 PM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 bg-prep-white rounded-lg border-l-4 border-pumpkin">
                <GamepadIcon className="h-5 w-5 text-prep-burgundy mr-4" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">11:00 AM - 11:30 AM</span>
                  <div className="text-prep-dark-gray font-garamond text-prep-body-garamond">Morning Games</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-prep-white rounded-lg border-l-4 border-khaki">
                <Calculator className="h-5 w-5 text-prep-burgundy mr-4" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">11:30 AM - 1:00 PM</span>
                  <div className="text-prep-dark-gray font-garamond text-prep-body-garamond">Math Session</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-prep-white rounded-lg border-l-4 border-slate-blue">
                <Utensils className="h-5 w-5 text-prep-burgundy mr-4" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">1:00 PM - 1:30 PM</span>
                  <div className="text-prep-dark-gray font-garamond text-prep-body-garamond">Lunch</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-prep-white rounded-lg border-l-4 border-purple">
                <BookOpen className="h-5 w-5 text-prep-burgundy mr-4" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">1:30 PM - 3:00 PM</span>
                  <div className="text-prep-dark-gray font-garamond text-prep-body-garamond">English Session</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Information */}
          <Card className="border-none shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">PROGRAM INFORMATION</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Essential details about our tutoring program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-pumpkin" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Season:</span>
                  <span className="text-prep-dark-gray font-garamond text-prep-body-garamond ml-2">October 4th - March</span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-pumpkin" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Time:</span>
                  <span className="text-prep-dark-gray font-garamond text-prep-body-garamond ml-2">11:00 AM - 3:00 PM</span>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-pumpkin" />
                <div>
                  <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Frequency:</span>
                  <span className="text-prep-dark-gray font-garamond text-prep-body-garamond ml-2">Every Saturday (excluding holidays)</span>
                </div>
              </div>
              <div className="bg-light-tan p-4 rounded-lg">
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">What to Expect</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond text-sm leading-relaxed">
                  Each Saturday begins with fun morning activities to help students connect and feel comfortable. 
                  We then move into focused learning sessions for math and English, with a shared lunch break 
                  that builds community among our students.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Section */}
        <Card className="border-none shadow-lg mt-8 bg-light-tan">
          <CardHeader>
            <CardTitle className="text-prep-burgundy flex items-center font-gill-sans text-prep-heading">
              <Calendar className="h-6 w-6 mr-3" />
              2025-2026 SESSION CALENDAR
            </CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Program runs every Saturday from October 4th to March, excluding winter break
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-warm-gray-light bg-prep-white"
                  modifiers={{
                    session: sessionDates,
                    noSession: noSessionDates,
                  }}
                  modifiersStyles={{
                    session: { 
                      backgroundColor: '#8B1538', 
                      color: 'white',
                      fontWeight: 'bold'
                    },
                    noSession: { 
                      backgroundColor: '#f87171', 
                      color: 'white',
                      fontWeight: 'bold',
                      textDecoration: 'line-through'
                    },
                  }}
                />
              </div>
              <div className="space-y-4">
                <div className="bg-prep-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-prep-burgundy font-semibold text-lg mb-4 font-gill-sans text-prep-subheading-gill">CALENDAR LEGEND</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-prep-burgundy rounded mr-3"></div>
                      <span className="font-garamond text-prep-body-garamond text-prep-dark-gray">Regular Session Days</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 rounded mr-3"></div>
                      <span className="font-garamond text-prep-body-garamond text-prep-dark-gray">No Session (Winter Break)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-prep-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-prep-burgundy font-semibold text-lg mb-4 font-gill-sans text-prep-subheading-gill">IMPORTANT DATES</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-garamond text-prep-body-garamond text-prep-dark-gray">First Session:</span>
                      <span className="font-semibold font-garamond text-prep-body-garamond text-prep-burgundy">
                        {firstSession ? format(createDateFromSessionString(firstSession.session_date), 'MMMM d, yyyy') : 'October 4, 2025'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-garamond text-prep-body-garamond text-prep-dark-gray">Winter Break:</span>
                      <span className="font-semibold font-garamond text-prep-body-garamond text-prep-burgundy">Dec 20 & 27</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-garamond text-prep-body-garamond text-prep-dark-gray">Last Session:</span>
                      <span className="font-semibold font-garamond text-prep-body-garamond text-prep-burgundy">
                        {lastSession ? format(createDateFromSessionString(lastSession.session_date), 'MMMM d, yyyy') : 'March 7, 2026'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;

