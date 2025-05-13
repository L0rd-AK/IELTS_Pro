'use client';

import { useState } from 'react';
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
    }, 1500);
  };

  return (
    <PageContainer
      title="Contact Us"
      description="Get in touch with our team for any inquiries about IELTS preparation"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isSubmitted ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <CheckCircle className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You for Contacting Us!</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    We've received your message and will get back to you within 24-48 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is your message about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Inquiry Type</Label>
                    <RadioGroup
                      defaultValue="general"
                      value={formData.inquiryType}
                      onValueChange={(value) => handleRadioChange('inquiryType', value)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General Inquiry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="technical" id="technical" />
                        <Label htmlFor="technical">Technical Support</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feedback" id="feedback" />
                        <Label htmlFor="feedback">Feedback</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partnership" id="partnership" />
                        <Label htmlFor="partnership">Partnership Opportunity</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred Contact Method</Label>
                    <Select 
                      value={formData.preferredContact}
                      onValueChange={(value) => handleSelectChange('preferredContact', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="either">Either</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">info@ieltspro.com</p>
                  <p className="text-sm text-muted-foreground">support@ieltspro.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9:00 AM - 5:00 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Education Street<br />
                    Suite 456<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                    Saturday: 10:00 AM - 2:00 PM EST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">How quickly will I receive a response?</h3>
                <p className="text-sm text-muted-foreground">
                  We aim to respond to all inquiries within 24-48 business hours.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Do you offer personalized tutoring?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer one-on-one tutoring sessions with experienced IELTS instructors.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">How can I get technical support?</h3>
                <p className="text-sm text-muted-foreground">
                  For technical issues, please email support@ieltspro.com or use the form with "Technical Support" selected.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12">
        <Tabs defaultValue="map">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">Location Map</TabsTrigger>
            <TabsTrigger value="social">Connect With Us</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="p-4 border rounded-md mt-2">
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
              {/* In a real implementation, you would embed a Google Map or similar here */}
            </div>
          </TabsContent>
          <TabsContent value="social" className="p-4 border rounded-md mt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span>Facebook</span>
              </a>
              <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mb-2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span>Twitter</span>
              </a>
              <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600 mb-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span>Instagram</span>
              </a>
              <a href="#" className="flex flex-col items-center p-4 border rounded-md hover:bg-muted transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700 mb-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}