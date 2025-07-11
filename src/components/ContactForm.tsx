
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  school: z.string().min(2, "School name must be at least 2 characters").max(200, "School name is too long"),
  how_heard: z.string().min(2, "Please tell us how you heard about us").max(500, "Response is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  honeypot: z.string().max(0, "Please leave this field empty"), // Honeypot field
  mathAnswer: z.string().min(1, "Please solve the math problem"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mathProblem, setMathProblem] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  });
  const [submissionTime] = useState(Date.now());
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      school: "",
      how_heard: "",
      message: "",
      honeypot: "",
      mathAnswer: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Spam prevention checks
      const submissionDuration = Date.now() - submissionTime;
      
      // Check if form was filled too quickly (less than 3 seconds)
      if (submissionDuration < 3000) {
        toast({
          title: "Submission too fast",
          description: "Please take a moment to review your submission.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Check honeypot field
      if (data.honeypot) {
        toast({
          title: "Submission blocked",
          description: "Invalid submission detected.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Check math captcha
      if (parseInt(data.mathAnswer) !== mathProblem.answer) {
        toast({
          title: "Math verification failed",
          description: "Please solve the math problem correctly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Get user's IP and user agent for spam tracking
      const userAgent = navigator.userAgent;
      
      // Calculate basic spam score
      let spamScore = 0;
      if (data.message.includes('http') || data.message.includes('www.')) spamScore += 2;
      if (data.name.length < 3) spamScore += 1;
      if (data.message.split(' ').length < 5) spamScore += 1;

      // Submit to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name,
          email: data.email,
          school: data.school,
          how_heard: data.how_heard,
          message: data.message,
          user_agent: userAgent,
          spam_score: spamScore,
        });

      if (error) {
        throw error;
      }

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: {
            name: data.name,
            email: data.email,
            school: data.school,
            how_heard: data.how_heard,
            message: data.message,
          },
        });

        if (emailError) {
          console.warn('Email notification failed:', emailError);
          // Don't fail the form submission if email fails
        }
      } catch (emailError) {
        console.warn('Email notification error:', emailError);
        // Don't fail the form submission if email fails
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      form.reset();
      // Generate new math problem
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      setMathProblem({ a, b, answer: a + b });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-prep-white">
      <CardHeader>
        <CardTitle className="text-prep-burgundy font-lato text-prep-heading">GET IN TOUCH</CardTitle>
        <CardDescription className="text-prep-dark-gray font-eb-garamond text-prep-body-garamond">
          Fill out the form below and we'll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-prep-burgundy font-lato text-prep-subheading-gill">Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your full name" 
                      {...field}
                      className="border-warm-gray-light focus:border-prep-burgundy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-prep-burgundy font-lato text-prep-subheading-gill">Email *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com" 
                      {...field}
                      className="border-warm-gray-light focus:border-prep-burgundy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-prep-burgundy font-lato text-prep-subheading-gill">School *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your school name" 
                      {...field}
                      className="border-warm-gray-light focus:border-prep-burgundy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="how_heard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-prep-burgundy font-lato text-prep-subheading-gill">How did you hear about us? *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., friend, teacher, social media, etc." 
                      {...field}
                      className="border-warm-gray-light focus:border-prep-burgundy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-prep-burgundy font-lato text-prep-subheading-gill">Message *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your interest in our program, any questions you have, or how we can help..."
                      className="min-h-[120px] border-warm-gray-light focus:border-prep-burgundy resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Math Captcha */}
            <FormField
              control={form.control}
              name="mathAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-prep-burgundy font-lato text-prep-subheading-gill">
                    Please solve: {mathProblem.a} + {mathProblem.b} = ? *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="Enter the answer" 
                      {...field}
                      className="border-warm-gray-light focus:border-prep-burgundy w-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Honeypot field - hidden from users */}
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} tabIndex={-1} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
