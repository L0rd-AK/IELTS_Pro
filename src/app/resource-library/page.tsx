'use client';

import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, Headphones, Mic, BookMarked } from 'lucide-react';
import Link from 'next/link';

export default function ResourceLibrary() {
  const vocabularyLists = [
    { title: "IELTS Vocabulary List 1 (General)", href: "#" },
    { title: "IELTS Vocabulary List 2 (Academic)", href: "#" },
    { title: "IELTS Vocabulary List 3 (Business)", href: "#" },
    { title: "IELTS Vocabulary List 4 (Environment)", href: "#" },
    { title: "IELTS Vocabulary List 5 (Technology)", href: "#" },
  ];

  const grammarGuides = [
    { title: "IELTS Grammar Guide 1 (Tenses)", href: "#" },
    { title: "IELTS Grammar Guide 2 (Sentence Structure)", href: "#" },
    { title: "IELTS Grammar Guide 3 (Complex Sentences)", href: "#" },
    { title: "IELTS Grammar Guide 4 (Conditionals)", href: "#" },
    { title: "IELTS Grammar Guide 5 (Passive Voice)", href: "#" },
  ];

  const practiceTests = [
    { title: "IELTS Reading Practice Test 1", href: "/reading-test", icon: BookOpen },
    { title: "IELTS Listening Practice Test 1", href: "/listening-test", icon: Headphones },
    { title: "IELTS Writing Practice Test 1", href: "/writing-test", icon: FileText },
    { title: "IELTS Speaking Practice Test 1", href: "/speaking-test", icon: Mic },
  ];

  return (
    <PageContainer title="Resource Library" description="Study materials and resources to help you prepare for the IELTS exam.">
      <Tabs defaultValue="vocabulary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabularyLists.map((item, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <BookMarked className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Essential vocabulary for IELTS success. Includes definitions, example sentences, and practice exercises.
                  </CardDescription>
                  <Link href={item.href} className="text-primary hover:underline mt-4 inline-block">
                    View Resource →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="grammar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grammarGuides.map((item, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive grammar guide with explanations, examples, and practice exercises.
                  </CardDescription>
                  <Link href={item.href} className="text-primary hover:underline mt-4 inline-block">
                    View Resource →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {practiceTests.map((item, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Full-length practice test with authentic IELTS-style questions and detailed answer explanations.
                  </CardDescription>
                  <Link href={item.href} className="text-primary hover:underline mt-4 inline-block">
                    Start Test →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}