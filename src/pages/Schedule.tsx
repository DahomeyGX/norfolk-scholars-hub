import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, BookOpen, Calculator } from "lucide-react";
import MobileNavigation from "@/components/MobileNavigation";

const Schedule = () => {
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState("Saturday");

  const scheduleData = {
    Saturday: [
      { time: "11:00 AM - 12:00 PM", activity: "ELA Session", description: "Reading comprehension and vocabulary building", icon: <BookOpen className="h-4 w-4 mr-2" /> },
      { time: "12:00 PM - 12:30 PM", activity: "Lunch Break", description: "Enjoy a nutritious meal and socialize", icon: <Users className="h-4 w-4 mr-2" /> },
      { time: "12:30 PM - 1:30 PM", activity: "Math Session", description: "Problem-solving and mathematical concepts", icon: <Calculator className="h-4 w-4 mr-2" /> },
      { time: "1:30 PM - 2:30 PM", activity: "Group Activity", description: "Collaborative projects and team-building exercises", icon: <Users className="h-4 w-4 mr-2" /> },
      { time: "2:30 PM - 3:00 PM", activity: "Wrap-up & Reflection", description: "Review of the day's lessons and personal reflection", icon: <Clock className="h-4 w-4 mr-2" /> },
    ],
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
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
                src="/uploads/a3ae56ad-0489-450a-bea1-2f8cc7ecd47e.png" 
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
            A detailed look at our weekly program activities and timings
          </p>
        </div>

        {/* Schedule Overview */}
        <Card className="border-none shadow-lg bg-light-tan">
          <CardHeader>
            <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">WEEKLY SCHEDULE</CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Our program runs every Saturday from October to March
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Day Toggle Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant={selectedDay === "Saturday" ? "default" : "outline"}
                className={`rounded-none ${selectedDay === "Saturday"
                  ? "bg-prep-burgundy text-prep-white hover:bg-pumpkin"
                  : "text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white"
                  } transition-colors`}
                onClick={() => handleDayChange("Saturday")}
              >
                Saturday
              </Button>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-warm-gray-light">
                <thead className="bg-prep-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-prep-burgundy uppercase tracking-wider font-gill-sans">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-prep-burgundy uppercase tracking-wider font-gill-sans">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-prep-burgundy uppercase tracking-wider font-gill-sans">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light-tan divide-y divide-warm-gray-light">
                  {scheduleData[selectedDay]?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap font-garamond text-prep-dark-gray text-prep-body-garamond">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-garamond text-prep-dark-gray text-prep-body-garamond">
                        <div className="flex items-center">
                          {item.icon}
                          {item.activity}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-garamond text-prep-dark-gray text-prep-body-garamond">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
