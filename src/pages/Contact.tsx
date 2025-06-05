
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Phone, Mail, MapPin, Plus, Trash2, Menu } from "lucide-react";

interface ContactPerson {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const Contact = () => {
  const [contacts, setContacts] = useState<ContactPerson[]>([
    {
      id: "1",
      name: "",
      email: "",
      phone: "",
      role: "Program Coordinator"
    }
  ]);

  const addContact = () => {
    const newContact: ContactPerson = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      role: ""
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateContact = (id: string, field: keyof ContactPerson, value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  return (
    <div className="min-h-screen bg-prep-white font-gill-sans">
      {/* Sticky Navigation Header - matching other pages */}
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
              <Link to="/schedule" className="text-prep-dark-gray text-prep-subheading-gill hover:text-prep-burgundy transition-colors">
                SCHEDULE
              </Link>
              <Link to="/contact" className="text-prep-burgundy font-semibold text-prep-subheading-gill hover:text-pumpkin transition-colors border-b-2 border-prep-burgundy">
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

              <div className="bg-prep-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-prep-burgundy mb-3 font-gill-sans text-prep-subheading-gill">ABOUT SAYC</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond leading-relaxed">
                  Students Advocating for Young Children (SAYC) is a free tutoring program dedicated to providing quality education support to children in our community.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact People Management */}
          <Card className="border-none shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy flex items-center justify-between font-gill-sans text-prep-heading">
                <span>CONTACT PEOPLE</span>
                <Button 
                  onClick={addContact}
                  size="sm"
                  variant="outline"
                  className="rounded-none bg-prep-white text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Manage contact information for program staff and volunteers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="border border-warm-gray-light p-6 rounded-lg space-y-4 bg-light-tan">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Contact {index + 1}</h4>
                    {contacts.length > 1 && (
                      <Button
                        onClick={() => removeContact(contact.id)}
                        variant="destructive"
                        size="sm"
                        className="rounded-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${contact.id}`} className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Name</Label>
                      <Input
                        id={`name-${contact.id}`}
                        value={contact.name}
                        onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="border-warm-gray-light rounded-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${contact.id}`} className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Role</Label>
                      <Input
                        id={`role-${contact.id}`}
                        value={contact.role}
                        onChange={(e) => updateContact(contact.id, 'role', e.target.value)}
                        placeholder="e.g., Program Coordinator"
                        className="border-warm-gray-light rounded-none"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`email-${contact.id}`} className="text-prep-burgundy flex items-center font-gill-sans text-prep-subheading-gill">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Label>
                      <Input
                        id={`email-${contact.id}`}
                        type="email"
                        value={contact.email}
                        onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                        placeholder="email@example.com"
                        className="border-warm-gray-light rounded-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`phone-${contact.id}`} className="text-prep-burgundy flex items-center font-gill-sans text-prep-subheading-gill">
                        <Phone className="h-4 w-4 mr-1" />
                        Phone
                      </Label>
                      <Input
                        id={`phone-${contact.id}`}
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="border-warm-gray-light rounded-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full rounded-none bg-prep-white text-prep-burgundy border-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white transition-colors">
                SAVE CONTACT INFORMATION
              </Button>
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
