'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { type CarouselApi, Carousel, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookOpen, BarChart2, Library, CheckCircle, Award, Clock, ArrowRight, Sparkles, Globe, Users, Video, X, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import Marquee from "react-fast-marquee";
// ... rest of your imports
export default function Home() {
  const [isLiveSessionOpen, setIsLiveSessionOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showW3Popup, setShowW3Popup] = useState(false);
  
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenW3Popup');
    //if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowW3Popup(true);
        // Mark as seen for this session
        sessionStorage.setItem('hasSeenW3Popup', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    //}
  }, []);
  
  const closeW3Popup = () => {
    setShowW3Popup(false);
  };

  const startLiveSession = async () => {
    setIsLiveSessionOpen(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const endLiveSession = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
    setIsLiveSessionOpen(false);
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Booking Session Popup */}
      <Dialog open={showW3Popup} onOpenChange={setShowW3Popup}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Book a Session with Munzereen Shahid
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Expert IELTS Instructor with 10+ years of experience
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 space-y-4">
            <div className="flex justify-center">
              <img 
                src="https://i.ibb.co/nqCR8QNT/image.png" 
                alt="Munzereen Shahid" 
                className="w-full h-48 rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <p>Certified IELTS Trainer</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <p>5000+ Students Trained</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <p>Specializes in Speaking & Writing</p>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium text-center">
                Available for one-on-one sessions and small group classes
              </p>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeW3Popup} className="sm:mr-auto">
              Maybe Later
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              onClick={() => {
                window.open('https://calendly.com/munzereen-shahid', '_blank');
                closeW3Popup();
              }}
            >
              Book a Session <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4" variant="outline">Trusted by 10,000+ students</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Master IELTS with <span className="text-primary">AI-Powered</span> Preparation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Personalized practice, instant feedback, and proven strategies to achieve your target band score.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/test-selection">Start Practice Tests</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              {/* <div className="flex items-center mt-8 space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Joined by <span className="font-medium">2,000+</span> students this month
                </p>
              </div> */}
            </div>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://i.ibb.co/rKpvWpfb/image-2025-05-22-002133974.png" 
                  alt="Student preparing for IELTS" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Average Score Improvement</p>
                    <p className="text-2xl font-bold">+1.5 Bands</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose IELTS Pro?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines advanced technology with proven teaching methods to deliver the most effective IELTS preparation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-primary" />,
                title: "AI-Powered Feedback",
                description: "Receive instant, detailed feedback on your writing and speaking responses, mimicking the IELTS scoring criteria."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Personalized Learning",
                description: "Our system adapts to your strengths and weaknesses, creating a customized study plan just for you."
              },
              {
                icon: <BookOpen className="h-10 w-10 text-primary" />,
                title: "Comprehensive Practice",
                description: "Access thousands of practice questions and full-length tests covering all four IELTS sections."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">Live Practice</Badge>
              <h2 className="text-3xl font-bold mb-4">Join a Live IELTS Session</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Practice with expert tutors in real-time. Get immediate feedback and improve your skills through interactive sessions.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Live speaking practice with tutors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Group discussion sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Real-time writing feedback</span>
                </li>
              </ul>
              <Button size="lg" onClick={startLiveSession} className="gap-2">
                <Video className="h-5 w-5" />
                Join Live Session
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl border border-muted">
              <img 
                src="https://i.ibb.co/zVPhhZdT/image-2025-05-23-041134481.png" 
                alt="Live IELTS tutoring session" 
                className="w-full h-auto"
              />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                </span>
                Live Now
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Live Session Dialog */}
      <Dialog open={isLiveSessionOpen} onOpenChange={setIsLiveSessionOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Live IELTS Practice Session</DialogTitle>
            <DialogDescription>
              You are now in a live session. Your camera and microphone are active.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 relative">
            {cameraActive ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={(videoElement) => {
                    if (videoElement && stream) {
                      videoElement.srcObject = stream;
                      videoElement.play();
                    }
                  }}
                  autoPlay 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="rounded-full w-12 h-12 flex items-center justify-center"
                    onClick={endLiveSession}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Camera access required for live session</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Tip: Make sure you're in a quiet environment with good lighting for the best experience.
            </p>
          </div>
          <DialogClose asChild>
            <Button variant="outline" onClick={endLiveSession}>End Session</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      {/* Test Sections */}
      <section className="py-16 px-4 md:px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Master All IELTS Sections</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive preparation for all four components of the IELTS exam.
            </p>
          </div>
          
          <Tabs defaultValue="listening" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="listening">Listening</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listening" className="p-6 bg-card rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">IELTS Listening</h3>
                  <p className="mb-4">
                    Improve your ability to understand spoken English in various contexts, from everyday conversations to academic lectures.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Practice with authentic audio recordings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Learn to identify key information quickly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Master note-taking techniques</span>
                    </li>
                  </ul>
                  <Button className="mt-6" asChild>
                    <Link href="/test-selection?section=listening">
                      Practice Listening <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.ibb.co/yBK37CnL/image-2025-05-22-002641415.png" 
                    alt="IELTS Listening Practice" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reading" className="p-6 bg-card rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">IELTS Reading</h3>
                  <p className="mb-4">
                    Develop strategies to efficiently process complex texts and accurately answer different question types.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Practice with authentic academic texts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Learn skimming and scanning techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Master time management strategies</span>
                    </li>
                  </ul>
                  <Button className="mt-6" asChild>
                    <Link href="/test-selection?section=reading">
                      Practice Reading <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.ibb.co/spmd0X46/image-2025-05-22-002826586.png" 
                    alt="IELTS Reading Practice" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="writing" className="p-6 bg-card rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">IELTS Writing</h3>
                  <p className="mb-4">
                    Learn to write clear, well-structured responses for both Task 1 and Task 2 with our AI-powered feedback.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Get instant feedback on your essays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Learn effective essay structures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Expand your academic vocabulary</span>
                    </li>
                  </ul>
                  <Button className="mt-6" asChild>
                    <Link href="/test-selection?section=writing">
                      Practice Writing <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.ibb.co/SDkCkmHN/image-2025-05-22-002912579.png" 
                    alt="IELTS Writing Practice" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="speaking" className="p-6 bg-card rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">IELTS Speaking</h3>
                  <p className="mb-4">
                    Build confidence and fluency for your speaking test with our interactive practice sessions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Practice with AI-simulated interviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Receive pronunciation feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Learn strategies for all three parts</span>
                    </li>
                  </ul>
                  <Button className="mt-6" asChild>
                    <Link href="/test-selection?section=speaking">
                      Practice Speaking <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.ibb.co/23WhctDh/image-2025-05-22-003028166.png" 
                    alt="IELTS Speaking Practice" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from students who achieved their target band scores with IELTS Pro.
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselNext>
              {[
                {
                  name: "Raj Patel",
                  location: "India",
                  score: "Band 8.0",
                  quote: "IELTS Pro helped me achieve my dream score on the first attempt. The personalized feedback on my writing was invaluable.",
                  image: "/images/testimonial-1.jpg"
                },
                {
                  name: "Maria Gonzalez",
                  location: "Mexico",
                  score: "Band 7.5",
                  quote: "After struggling with the speaking section for months, the targeted practice exercises from IELTS Pro helped me improve by 1.5 bands!",
                  image: "/images/testimonial-2.jpg"
                },
                {
                  name: "Liu Wei",
                  location: "China",
                  score: "Band 7.0",
                  quote: "The reading strategies I learned through IELTS Pro completely changed my approach to the test. I finally got the score I needed for my university application.",
                  image: "/images/testimonial-3.jpg"
                },
                {
                  name: "Sophia Müller",
                  location: "Germany",
                  score: "Band 8.5",
                  quote: "The practice tests were so similar to the actual exam that I felt completely prepared on test day. Thank you IELTS Pro!",
                  image: "/images/testimonial-4.jpg"
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`;
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{testimonial.location}</span>
                            <span>•</span>
                            <span className="font-medium text-primary">{testimonial.score}</span>
                          </div>
                        </div>
                      </div>
                      <p className="italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselNext>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p>Students Helped</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p>Success Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p>Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7.5</div>
              <p>Average Band Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Global Reach</h2>
              <p className="mb-4 text-muted-foreground">
                IELTS Pro serves students from over 50 countries worldwide. Our platform is designed to accommodate different learning styles, cultural backgrounds, and English proficiency levels.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Globe className="h-8 w-8 text-primary" />
                <div className="text-xl font-bold">Students across 6 continents</div>
              </div>
              <Button className="mt-6" variant="outline" asChild>
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://i.ibb.co/JRGF55tR/image-2025-05-22-002341005.png" 
                alt="World map showing IELTS Pro's global reach" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Partner Companies Section */}
      <section className="py-12 px-4 md:px-6 bg-background border-y">
        <div className="container mx-auto max-w-6xl mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Our Trusted Partners</h2>
            <p className="text-muted-foreground">Collaborating with leading organizations to deliver excellence in IELTS preparation</p>
          </div>
        </div>
        
        {/* Import at the top of your file: import Marquee from "react-fast-marquee"; */}
        <Marquee 
          speed={40} 
          gradientWidth={50}
          pauseOnHover={true}
        >
          {[
            { name: "Mentor", logo: "https://placehold.co/200x80/e2e8f0/475569?text=Mentor" },
            { name: "BARC", logo: "https://placehold.co/200x80/e2e8f0/475569?text=BARC" },
            { name: "Shafin", logo: "https://placehold.co/200x80/e2e8f0/475569?text=Shafin" },
            { name: "Bangla-IELTS", logo: "https://placehold.co/200x80/e2e8f0/475569?text=Bangla-IELTS" },
          ].map((partner, index) => (
            <div key={index} className="mx-8 flex items-center justify-center">
              <div className="bg-card rounded-lg p-6 shadow-sm border h-24 w-48 flex items-center justify-center transition-transform hover:scale-105">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <Card className="border-none bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8 md:p-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Target IELTS Score?</h2>
                <p className="text-xl mb-8">
                  Join thousands of successful students who have improved their IELTS scores with our personalized preparation platform.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/test-selection">Start Practice Tests</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}