import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, Calendar, Users, Utensils, GamepadIcon, Menu } from "lucide-react";

const Schedule = () => {
  const [dailySchedule, setDailySchedule] = useState({
    morningGames: "11:00 AM - 11:30 AM: Morning Games",
    mathSession: "11:30 AM - 1:00 PM: Math Session",
    lunch: "1:00 PM - 1:30 PM: Lunch",
    englishSession: "1:30 PM - 3:00 PM: English Session"
  });

  const [yearlySchedule, setYearlySchedule] = useState("");

  return (
    <div className="min-h-screen bg-prep-white font-gill-sans">
      {/* Sticky Navigation Header */}
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
              <Link to="/" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                HOME
              </Link>
              <Link to="/schedule" className="text-prep-burgundy font-semibold text-prep-subheading-gill hover:text-pumpkin transition-colors border-b-2 border-prep-burgundy">
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
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
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
                <Users className="h-5 w-5 text-prep-burgundy mr-4" />
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

          {/* Edit Daily Schedule */}
          <Card className="border-none shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans text-prep-heading">EDIT DAILY SCHEDULE</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Update the daily schedule information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="morningGames" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Morning Games</Label>
                <Input
                  id="morningGames"
                  value={dailySchedule.morningGames}
                  onChange={(e) => setDailySchedule({...dailySchedule, morningGames: e.target.value})}
                  className="border-warm-gray-light rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="mathSession" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Math Session</Label>
                <Input
                  id="mathSession"
                  value={dailySchedule.mathSession}
                  onChange={(e) => setDailySchedule({...dailySchedule, mathSession: e.target.value})}
                  className="border-warm-gray-light rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="lunch" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Lunch</Label>
                <Input
                  id="lunch"
                  value={dailySchedule.lunch}
                  onChange={(e) => setDailySchedule({...dailySchedule, lunch: e.target.value})}
                  className="border-warm-gray-light rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="englishSession" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">English Session</Label>
                <Input
                  id="englishSession"
                  value={dailySchedule.englishSession}
                  onChange={(e) => setDailySchedule({...dailySchedule, englishSession: e.target.value})}
                  className="border-warm-gray-light rounded-none"
                />
              </div>
              <Button className="w-full rounded-none">
                UPDATE DAILY SCHEDULE
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Yearly Schedule */}
        <Card className="border-none shadow-lg mt-8 bg-light-tan">
          <CardHeader>
            <CardTitle className="text-prep-burgundy flex items-center font-gill-sans text-prep-heading">
              <Calendar className="h-6 w-6 mr-3" />
              YEARLY SCHEDULE (OCTOBER - APRIL)
            </CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Program runs every Saturday from October to April, excluding holidays
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="yearlySchedule" className="text-prep-burgundy text-lg mb-3 block font-gill-sans text-prep-subheading-gill">
                  Program Calendar & Special Events
                </Label>
                <Textarea
                  id="yearlySchedule"
                  placeholder="Enter yearly schedule details, special events, holiday breaks, etc..."
                  value={yearlySchedule}
                  onChange={(e) => setYearlySchedule(e.target.value)}
                  className="border-warm-gray-light min-h-[200px] rounded-none"
                />
                <Button className="w-full mt-4 rounded-none">
                  UPDATE YEARLY SCHEDULE
                </Button>
              </div>
              <div className="bg-prep-white p-6 shadow-sm">
                <h3 className="text-prep-burgundy font-semibold text-lg mb-4 font-gill-sans text-prep-subheading-gill">PROGRAM INFORMATION</h3>
                <ul className="space-y-3 text-prep-dark-gray">
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-pumpkin" />
                    <span className="font-garamond text-prep-body-garamond">Season: October to April</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-3 text-pumpkin" />
                    <span className="font-garamond text-prep-body-garamond">Time: 11:00 AM - 3:00 PM</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-3 text-pumpkin" />
                    <span className="font-garamond text-prep-body-garamond">Every Saturday (excluding holidays)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
