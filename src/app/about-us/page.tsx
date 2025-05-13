'use client';

import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Users, BookOpen, Trophy, GraduationCap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <PageContainer
      title="About IELTS Pro"
      description="Learn more about our mission, team, and approach to IELTS preparation"
    >
      {/* Mission Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              At IELTS Pro, we're dedicated to helping students achieve their desired band scores through personalized, technology-driven preparation.
            </p>
            <p className="mb-4">
              Founded in 2020 by a team of experienced IELTS instructors and language specialists, we've helped thousands of students worldwide reach their academic and immigration goals.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-1" />
                <p>Personalized learning paths based on your strengths and weaknesses</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-1" />
                <p>AI-powered feedback and assessment for continuous improvement</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-1" />
                <p>Comprehensive practice materials covering all test sections</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/images/about-mission.jpg" 
              alt="Students studying together" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12 py-8 bg-muted rounded-lg">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Students Helped</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">7.5</div>
              <p className="text-muted-foreground">Average Band Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Approach</h2>
        <Tabs defaultValue="personalized" className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 mb-8">
            <TabsTrigger value="personalized">Personalized Learning</TabsTrigger>
            <TabsTrigger value="ai">AI-Powered Feedback</TabsTrigger>
            <TabsTrigger value="comprehensive">Comprehensive Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="personalized" className="p-6 bg-card rounded-lg border">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3 flex justify-center">
                <Users className="h-24 w-24 text-primary" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Personalized Learning Paths</h3>
                <p className="mb-4">
                  We understand that every student has unique strengths and weaknesses. Our platform analyzes your performance and creates a customized study plan that focuses on the areas where you need the most improvement.
                </p>
                <p>
                  Through regular assessments and progress tracking, we continuously refine your learning path to ensure you're always working on the skills that will have the biggest impact on your band score.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ai" className="p-6 bg-card rounded-lg border">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3 flex justify-center">
                <BookOpen className="h-24 w-24 text-primary" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">AI-Powered Feedback</h3>
                <p className="mb-4">
                  Our advanced AI technology provides instant, detailed feedback on your writing and speaking responses, mimicking the IELTS scoring criteria used by examiners.
                </p>
                <p>
                  This immediate feedback loop allows you to quickly identify patterns in your mistakes and make rapid improvements, rather than waiting days or weeks for instructor feedback.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="comprehensive" className="p-6 bg-card rounded-lg border">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3 flex justify-center">
                <Trophy className="h-24 w-24 text-primary" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Comprehensive Practice</h3>
                <p className="mb-4">
                  Our platform offers thousands of practice questions, full-length practice tests, and targeted exercises covering all four sections of the IELTS exam: Listening, Reading, Writing, and Speaking.
                </p>
                <p>
                  All our materials are designed to closely match the format, difficulty level, and topics of the actual IELTS test, ensuring you're fully prepared for exam day.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              name: "Dr. Sarah Johnson",
              role: "Founder & Lead Instructor",
              bio: "Former IELTS examiner with over 15 years of teaching experience. PhD in Applied Linguistics from Oxford University.",
              avatar: "/images/team-sarah.jpg",
              specialty: "Writing"
            },
            {
              name: "Michael Chen",
              role: "Senior Instructor",
              bio: "CELTA-certified English teacher with 10+ years of experience preparing students for IELTS. Specializes in speaking and pronunciation.",
              avatar: "/images/team-michael.jpg",
              specialty: "Speaking"
            },
            {
              name: "Emma Wilson",
              role: "Content Director",
              bio: "MA in TESOL from University of Edinburgh. Develops our curriculum and practice materials based on the latest IELTS trends.",
              avatar: "/images/team-emma.jpg",
              specialty: "Reading"
            },
            {
              name: "David Thompson",
              role: "Technology Lead",
              bio: "Computer Science graduate with expertise in educational technology. Leads the development of our AI-powered feedback systems.",
              avatar: "/images/team-david.jpg",
              specialty: "Technology"
            },
            {
              name: "Priya Patel",
              role: "Student Success Manager",
              bio: "Former IELTS student who achieved a band score of 8.5. Now helps other students navigate their IELTS journey.",
              avatar: "/images/team-priya.jpg",
              specialty: "Student Support"
            },
            {
              name: "James Rodriguez",
              role: "Listening Skills Specialist",
              bio: "Audio engineer turned IELTS instructor. Creates our listening practice materials and teaches accent recognition.",
              avatar: "/images/team-james.jpg",
              specialty: "Listening"
            }
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                  <AvatarFallback className="text-4xl rounded-none">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                  <Badge variant="outline">{member.specialty}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Student Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Raj Patel",
              location: "India",
              score: "Band 8.0",
              quote: "IELTS Pro helped me achieve my dream score on the first attempt. The personalized feedback on my writing was invaluable.",
              avatar: "/images/testimonial-1.jpg"
            },
            {
              name: "Maria Gonzalez",
              location: "Mexico",
              score: "Band 7.5",
              quote: "After struggling with the speaking section for months, the targeted practice exercises from IELTS Pro helped me improve by 1.5 bands!",
              avatar: "/images/testimonial-2.jpg"
            },
            {
              name: "Liu Wei",
              location: "China",
              score: "Band 7.0",
              quote: "The reading strategies I learned through IELTS Pro completely changed my approach to the test. I finally got the score I needed for my university application.",
              avatar: "/images/testimonial-3.jpg"
            },
            {
              name: "Sophia Müller",
              location: "Germany",
              score: "Band 8.5",
              quote: "The practice tests were so similar to the actual exam that I felt completely prepared on test day. Thank you IELTS Pro!",
              avatar: "/images/testimonial-4.jpg"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
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
          ))}
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="mb-12">
        <div className="bg-muted rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Global Reach</h2>
              <p className="mb-4">
                IELTS Pro serves students from over 50 countries worldwide. Our platform is designed to accommodate different learning styles, cultural backgrounds, and English proficiency levels.
              </p>
              <p>
                Whether you're preparing for academic studies, professional certification, or immigration purposes, our global team of instructors understands the specific challenges faced by test-takers from different regions.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Globe className="h-8 w-8 text-primary" />
                <div className="text-2xl font-bold">Students across 6 continents</div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/world-map.jpg" 
                alt="World map showing IELTS Pro's global reach" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to achieve your target IELTS score?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center mb-6 max-w-2xl">
              Join thousands of successful students who have improved their IELTS scores with our personalized preparation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/test-selection" className="bg-background text-foreground hover:bg-secondary px-6 py-2 rounded-md font-medium">
                Start Practice Tests
              </a>
              <a href="/contact" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-6 py-2 rounded-md font-medium">
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}