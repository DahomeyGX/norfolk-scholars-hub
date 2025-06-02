
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, Calendar, Users, Utensils, GamepadIcon } from "lucide-react";

const Schedule = () => {
  const [dailySchedule, setDailySchedule] = useState({
    morningGames: "11:00 AM - 11:30 AM: Morning Games",
    mathSession: "11:30 AM - 1:00 PM: Math Session",
    lunch: "1:00 PM - 1:30 PM: Lunch",
    englishSession: "1:30 PM - 3:00 PM: English Session"
  });

  const [yearlySchedule, setYearlySchedule] = useState("");

  return (
    <div className="min-h-screen bg-light-tan font-gill-sans">
      {/* Navigation */}
      <nav className="bg-prep-burgundy text-prep-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-2xl font-bold font-gill-sans">SAYC</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-pumpkin transition-colors text-prep-subheading-gill">Home</Link>
              <Link to="/schedule" className="hover:text-pumpkin transition-colors text-pumpkin text-prep-subheading-gill">Schedule</Link>
              <Link to="/contact" className="hover:text-pumpkin transition-colors text-prep-subheading-gill">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-prep-burgundy text-center mb-12 font-gill-sans text-prep-heading">Program Schedule</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Schedule Display */}
          <Card className="border-khaki shadow-lg bg-warm-gray-light">
            <CardHeader>
              <CardTitle className="text-prep-burgundy flex items-center font-gill-sans">
                <Clock className="h-6 w-6 mr-2" />
                Daily Schedule (Saturdays)
              </CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Our structured Saturday program runs from 11:00 AM to 3:00 PM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-3 bg-dark-tan rounded-lg">
                <GamepadIcon className="h-5 w-5 text-prep-burgundy mr-3" />
                <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">11:00 AM - 11:30 AM:</span>
                <span className="ml-2 text-prep-dark-gray font-garamond text-prep-body-garamond">Morning Games</span>
              </div>
              <div className="flex items-center p-3 bg-dark-tan rounded-lg">
                <Users className="h-5 w-5 text-prep-burgundy mr-3" />
                <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">11:30 AM - 1:00 PM:</span>
                <span className="ml-2 text-prep-dark-gray font-garamond text-prep-body-garamond">Math Session</span>
              </div>
              <div className="flex items-center p-3 bg-dark-tan rounded-lg">
                <Utensils className="h-5 w-5 text-prep-burgundy mr-3" />
                <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">1:00 PM - 1:30 PM:</span>
                <span className="ml-2 text-prep-dark-gray font-garamond text-prep-body-garamond">Lunch</span>
              </div>
              <div className="flex items-center p-3 bg-dark-tan rounded-lg">
                <BookOpen className="h-5 w-5 text-prep-burgundy mr-3" />
                <span className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">1:30 PM - 3:00 PM:</span>
                <span className="ml-2 text-prep-dark-gray font-garamond text-prep-body-garamond">English Session</span>
              </div>
            </CardContent>
          </Card>

          {/* Edit Daily Schedule */}
          <Card className="border-khaki shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans">Edit Daily Schedule</CardTitle>
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
                  className="border-khaki"
                />
              </div>
              <div>
                <Label htmlFor="mathSession" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Math Session</Label>
                <Input
                  id="mathSession"
                  value={dailySchedule.mathSession}
                  onChange={(e) => setDailySchedule({...dailySchedule, mathSession: e.target.value})}
                  className="border-khaki"
                />
              </div>
              <div>
                <Label htmlFor="lunch" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Lunch</Label>
                <Input
                  id="lunch"
                  value={dailySchedule.lunch}
                  onChange={(e) => setDailySchedule({...dailySchedule, lunch: e.target.value})}
                  className="border-khaki"
                />
              </div>
              <div>
                <Label htmlFor="englishSession" className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">English Session</Label>
                <Input
                  id="englishSession"
                  value={dailySchedule.englishSession}
                  onChange={(e) => setDailySchedule({...dailySchedule, englishSession: e.target.value})}
                  className="border-khaki"
                />
              </div>
              <Button className="w-full bg-prep-burgundy hover:bg-purple">
                Update Daily Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Yearly Schedule */}
        <Card className="border-khaki shadow-lg mt-8 bg-prep-white">
          <CardHeader>
            <CardTitle className="text-prep-burgundy flex items-center font-gill-sans">
              <Calendar className="h-6 w-6 mr-2" />
              Yearly Schedule (October - April)
            </CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Program runs every Saturday from October to April, excluding holidays
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="yearlySchedule" className="text-prep-burgundy text-lg mb-3 block font-gill-sans">
                  Program Calendar & Special Events
                </Label>
                <Textarea
                  id="yearlySchedule"
                  placeholder="Enter yearly schedule details, special events, holiday breaks, etc..."
                  value={yearlySchedule}
                  onChange={(e) => setYearlySchedule(e.target.value)}
                  className="border-khaki min-h-[200px]"
                />
                <Button className="w-full mt-4 bg-prep-burgundy hover:bg-purple">
                  Update Yearly Schedule
                </Button>
              </div>
              <div className="bg-dark-tan p-6 rounded-lg">
                <h3 className="text-prep-burgundy font-semibold text-lg mb-4 font-gill-sans">Program Information</h3>
                <ul className="space-y-2 text-prep-dark-gray">
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-prep-burgundy" />
                    <span className="font-garamond text-prep-body-garamond">Season: October to April</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-prep-burgundy" />
                    <span className="font-garamond text-prep-body-garamond">Time: 11:00 AM - 3:00 PM</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-prep-burgundy" />
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
