
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
              <Link to="/schedule" className="hover:text-pumpkin transition-colors text-prep-subheading-gill">Schedule</Link>
              <Link to="/contact" className="hover:text-pumpkin transition-colors text-pumpkin text-prep-subheading-gill">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-prep-burgundy text-center mb-12 font-gill-sans text-prep-heading">Contact Information</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Program Information */}
          <Card className="border-khaki shadow-lg bg-warm-gray-light">
            <CardHeader>
              <CardTitle className="text-prep-burgundy font-gill-sans">Program Location & Hours</CardTitle>
              <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                Visit us at our Lower East Side location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-prep-burgundy mt-1" />
                <div>
                  <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Address</h3>
                  <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">111 Norfolk Street<br />Lower East Side<br />New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-prep-burgundy mt-1" />
                <div>
                  <h3 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Program Hours</h3>
                  <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Saturdays: 11:00 AM - 3:00 PM<br />October - April<br />Excluding Holidays</p>
                </div>
              </div>

              <div className="bg-dark-tan p-4 rounded-lg">
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">About SAYC</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">
                  Students Advocating for Young Children (SAYC) is a free tutoring program dedicated to providing quality education support to children in our community.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact People Management */}
          <Card className="border-khaki shadow-lg bg-prep-white">
            <CardHeader>
              <CardTitle className="text-prep-burgundy flex items-center justify-between font-gill-sans">
                <span>Contact People</span>
                <Button 
                  onClick={addContact}
                  size="sm"
                  variant="outline"
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
                <div key={contact.id} className="border border-khaki p-4 rounded-lg space-y-4 bg-warm-gray-light">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-prep-burgundy font-gill-sans text-prep-subheading-gill">Contact {index + 1}</h4>
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
                      <Label htmlFor={`name-${contact.id}`} className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Name</Label>
                      <Input
                        id={`name-${contact.id}`}
                        value={contact.name}
                        onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                        placeholder="Full Name"
                        className="border-khaki"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`role-${contact.id}`} className="text-prep-burgundy font-gill-sans text-prep-subheading-gill">Role</Label>
                      <Input
                        id={`role-${contact.id}`}
                        value={contact.role}
                        onChange={(e) => updateContact(contact.id, 'role', e.target.value)}
                        placeholder="e.g., Program Coordinator"
                        className="border-khaki"
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
                        className="border-khaki"
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
                        className="border-khaki"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Save Contact Information
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* How to Reach Us */}
        <Card className="border-khaki shadow-lg mt-8 bg-prep-white">
          <CardHeader>
            <CardTitle className="text-prep-burgundy font-gill-sans">How to Reach Us</CardTitle>
            <CardDescription className="text-prep-dark-gray font-garamond text-prep-body-garamond">
              Multiple ways to get in touch with our program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-dark-tan rounded-lg">
                <Mail className="h-8 w-8 text-prep-burgundy mx-auto mb-4" />
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">Email Us</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Send us an email for general inquiries or to learn more about volunteering</p>
              </div>
              
              <div className="text-center p-6 bg-dark-tan rounded-lg">
                <Phone className="h-8 w-8 text-prep-burgundy mx-auto mb-4" />
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">Call Us</h3>
                <p className="text-prep-dark-gray font-garamond text-prep-body-garamond">Speak directly with our program coordinators about enrollment or questions</p>
              </div>
              
              <div className="text-center p-6 bg-dark-tan rounded-lg">
                <MapPin className="h-8 w-8 text-prep-burgundy mx-auto mb-4" />
                <h3 className="font-semibold text-prep-burgundy mb-2 font-gill-sans text-prep-subheading-gill">Visit Us</h3>
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
