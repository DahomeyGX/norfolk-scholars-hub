
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Phone, Mail, MapPin, Plus, Trash2 } from "lucide-react";

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
              <Link to="/schedule" className="hover:text-amber-200 transition-colors">Schedule</Link>
              <Link to="/contact" className="hover:text-amber-200 transition-colors text-amber-200">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-red-900 text-center mb-12">Contact Information</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Program Information */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-900">Program Location & Hours</CardTitle>
              <CardDescription className="text-amber-800">
                Visit us at our Lower East Side location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-red-900 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900">Address</h3>
                  <p className="text-amber-800">111 Norfolk Street<br />Lower East Side<br />New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-red-900 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900">Program Hours</h3>
                  <p className="text-amber-800">Saturdays: 11:00 AM - 3:00 PM<br />October - April<br />Excluding Holidays</p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">About SAYC</h3>
                <p className="text-amber-800">
                  Students Advocating for Young Children (SAYC) is a free tutoring program dedicated to providing quality education support to children in our community.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact People Management */}
          <Card className="border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center justify-between">
                <span>Contact People</span>
                <Button 
                  onClick={addContact}
                  size="sm"
                  className="bg-red-900 hover:bg-red-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </CardTitle>
              <CardDescription className="text-amber-800">
                Manage contact information for program staff and volunteers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="border border-amber-200 p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-red-900">Contact {index + 1}</h4>
                    {contacts.length > 1 && (
                      <Button
                        onClick={() => removeContact(contact.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${contact.id}`} className="text-red-900">Name</Label>
                      <Input
                        id={`name-${contact.id}`}
                        value={contact.name}
                        onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="border-amber-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${contact.id}`} className="text-red-900">Role</Label>
                      <Input
                        id={`role-${contact.id}`}
                        value={contact.role}
                        onChange={(e) => updateContact(contact.id, 'role', e.target.value)}
                        placeholder="e.g., Program Coordinator"
                        className="border-amber-200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`email-${contact.id}`} className="text-red-900 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Label>
                      <Input
                        id={`email-${contact.id}`}
                        type="email"
                        value={contact.email}
                        onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                        placeholder="email@example.com"
                        className="border-amber-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`phone-${contact.id}`} className="text-red-900 flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Phone
                      </Label>
                      <Input
                        id={`phone-${contact.id}`}
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="border-amber-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button className="w-full bg-red-900 hover:bg-red-800">
                Save Contact Information
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How to Reach Us */}
        <Card className="border-amber-200 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-red-900">How to Reach Us</CardTitle>
            <CardDescription className="text-amber-800">
              Multiple ways to get in touch with our program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <Mail className="h-8 w-8 text-red-900 mx-auto mb-4" />
                <h3 className="font-semibold text-red-900 mb-2">Email Us</h3>
                <p className="text-amber-800">Send us an email for general inquiries or to learn more about volunteering</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <Phone className="h-8 w-8 text-red-900 mx-auto mb-4" />
                <h3 className="font-semibold text-red-900 mb-2">Call Us</h3>
                <p className="text-amber-800">Speak directly with our program coordinators about enrollment or questions</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <MapPin className="h-8 w-8 text-red-900 mx-auto mb-4" />
                <h3 className="font-semibold text-red-900 mb-2">Visit Us</h3>
                <p className="text-amber-800">Stop by during program hours to see our tutoring sessions in action</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
