import Link from 'next/link';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Headphones, Pen, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestSelection() {
  const tests = [
    {
      title: "Reading Test",
      description: "Test your reading comprehension skills with multiple passages and questions.",
      icon: BookOpen,
      href: "/reading-test",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-500 dark:text-blue-300",
    },
    {
      title: "Writing Test",
      description: "Practice your writing skills with Task 1 (data/graph description) and Task 2 (essay).",
      icon: Pen,
      href: "/writing-test",
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-500 dark:text-green-300",
    },
    {
      title: "Listening Test",
      description: "Evaluate your listening skills with audio recordings and questions.",
      icon: Headphones,
      href: "/listening-test",
      color: "bg-yellow-100 dark:bg-yellow-900",
      iconColor: "text-yellow-500 dark:text-yellow-300",
    },
    {
      title: "Speaking Test",
      description: "Record and evaluate your speaking skills for each part of the test.",
      icon: Mic,
      href: "/speaking-test",
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-500 dark:text-purple-300",
    },
  ];

  return (
    <PageContainer 
      title="Test Selection" 
      description="Choose the test you want to take to practice your IELTS skills."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tests.map((test, index) => (
          <Card key={index} className="card-hover">
            <CardHeader className={`${test.color} rounded-t-lg`}>
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-white dark:bg-gray-800">
                  <test.icon className={`h-8 w-8 ${test.iconColor}`} />
                </div>
              </div>
              <CardTitle className="text-center mt-4">{test.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CardDescription className="text-center">{test.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={test.href}>Start Test</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}