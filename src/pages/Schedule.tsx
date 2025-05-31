
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
              <Link to="/schedule" className="hover:text-amber-200 transition-colors text-amber-200">Schedule</Link>
              <Link to="/contact" className="hover:text-amber-200 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-red-900 text-center mb-12">Program Schedule</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Schedule Display */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Daily Schedule (Saturdays)
              </CardTitle>
              <CardDescription className="text-amber-800">
                Our structured Saturday program runs from 11:00 AM to 3:00 PM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <GamepadIcon className="h-5 w-5 text-red-900 mr-3" />
                <span className="font-semibold text-red-900">11:00 AM - 11:30 AM:</span>
                <span className="ml-2 text-amber-800">Morning Games</span>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <Users className="h-5 w-5 text-red-900 mr-3" />
                <span className="font-semibold text-red-900">11:30 AM - 1:00 PM:</span>
                <span className="ml-2 text-amber-800">Math Session</span>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <Utensils className="h-5 w-5 text-red-900 mr-3" />
                <span className="font-semibold text-red-900">1:00 PM - 1:30 PM:</span>
                <span className="ml-2 text-amber-800">Lunch</span>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-red-900 mr-3" />
                <span className="font-semibold text-red-900">1:30 PM - 3:00 PM:</span>
                <span className="ml-2 text-amber-800">English Session</span>
              </div>
            </CardContent>
          </Card>

          {/* Edit Daily Schedule */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-900">Edit Daily Schedule</CardTitle>
              <CardDescription className="text-amber-800">
                Update the daily schedule information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="morningGames" className="text-red-900">Morning Games</Label>
                <Input
                  id="morningGames"
                  value={dailySchedule.morningGames}
                  onChange={(e) => setDailySchedule({...dailySchedule, morningGames: e.target.value})}
                  className="border-amber-200"
                />
              </div>
              <div>
                <Label htmlFor="mathSession" className="text-red-900">Math Session</Label>
                <Input
                  id="mathSession"
                  value={dailySchedule.mathSession}
                  onChange={(e) => setDailySchedule({...dailySchedule, mathSession: e.target.value})}
                  className="border-amber-200"
                />
              </div>
              <div>
                <Label htmlFor="lunch" className="text-red-900">Lunch</Label>
                <Input
                  id="lunch"
                  value={dailySchedule.lunch}
                  onChange={(e) => setDailySchedule({...dailySchedule, lunch: e.target.value})}
                  className="border-amber-200"
                />
              </div>
              <div>
                <Label htmlFor="englishSession" className="text-red-900">English Session</Label>
                <Input
                  id="englishSession"
                  value={dailySchedule.englishSession}
                  onChange={(e) => setDailySchedule({...dailySchedule, englishSession: e.target.value})}
                  className="border-amber-200"
                />
              </div>
              <Button className="w-full bg-red-900 hover:bg-red-800">
                Update Daily Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Yearly Schedule */}
        <Card className="border-amber-200 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              Yearly Schedule (October - April)
            </CardTitle>
            <CardDescription className="text-amber-800">
              Program runs every Saturday from October to April, excluding holidays
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="yearlySchedule" className="text-red-900 text-lg mb-3 block">
                  Program Calendar & Special Events
                </Label>
                <Textarea
                  id="yearlySchedule"
                  placeholder="Enter yearly schedule details, special events, holiday breaks, etc..."
                  value={yearlySchedule}
                  onChange={(e) => setYearlySchedule(e.target.value)}
                  className="border-amber-200 min-h-[200px]"
                />
                <Button className="w-full mt-4 bg-red-900 hover:bg-red-800">
                  Update Yearly Schedule
                </Button>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-red-900 font-semibold text-lg mb-4">Program Information</h3>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-red-900" />
                    Season: October to April
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-red-900" />
                    Time: 11:00 AM - 3:00 PM
                  </li>
                  <li className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-red-900" />
                    Every Saturday (excluding holidays)
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
