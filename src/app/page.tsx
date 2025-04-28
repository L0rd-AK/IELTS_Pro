import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BarChart2, Library, Award, Clock, Target } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Practice Tests",
      description: "Access full-length IELTS practice tests for Reading, Writing, Listening, and Speaking sections."
    },
    {
      icon: BarChart2,
      title: "Performance Tracking",
      description: "Monitor your progress with detailed analytics and performance insights."
    },
    {
      icon: Library,
      title: "Resource Library",
      description: "Explore our extensive collection of study materials, vocabulary lists, and grammar guides."
    },
    {
      icon: Award,
      title: "Expert Feedback",
      description: "Receive detailed feedback on your writing and speaking responses from IELTS experts."
    },
    {
      icon: Clock,
      title: "Timed Practice",
      description: "Practice under exam conditions with our timed test sessions."
    },
    {
      icon: Target,
      title: "Personalized Study Plans",
      description: "Get customized study plans based on your strengths and weaknesses."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Ace Your <span className="text-primary">IELTS</span> Exam
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Comprehensive preparation platform with practice tests, performance tracking, and expert resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/test-selection">Start Practicing</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/resource-library">Explore Resources</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                <div className="bg-card border rounded-xl shadow-xl p-6 relative z-10">
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="font-semibold">Overall Band Score</h3>
                      <p className="text-3xl font-bold text-primary">7.5</p>
                    </div>
                    <Award className="h-12 w-12 text-accent" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Reading</p>
                      <p className="text-xl font-semibold">8.0</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Writing</p>
                      <p className="text-xl font-semibold">7.0</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Listening</p>
                      <p className="text-xl font-semibold">8.5</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Speaking</p>
                      <p className="text-xl font-semibold">7.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive IELTS Preparation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to prepare for your IELTS exam in one platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Improve Your IELTS Score?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start practicing today and track your progress towards your target score.
          </p>
          <Button asChild size="lg">
            <Link href="/test-selection">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}