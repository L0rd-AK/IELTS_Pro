'use client';

import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "How to Improve Your IELTS Writing Score",
    description: "Learn effective strategies to enhance your writing skills and achieve a higher band score in the IELTS writing section.",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    category: "Writing",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Top 10 IELTS Speaking Tips from Examiners",
    description: "Insider tips from IELTS examiners on how to perform better in your speaking test and avoid common mistakes.",
    date: "June 2, 2023",
    author: "David Chen",
    category: "Speaking",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "IELTS Reading: Time Management Strategies",
    description: "Master the art of managing your time effectively during the IELTS reading test to maximize your score.",
    date: "June 18, 2023",
    author: "Emma Wilson",
    category: "Reading",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Understanding IELTS Listening Section Format",
    description: "A comprehensive guide to the IELTS listening test format and how to prepare for each section.",
    date: "July 5, 2023",
    author: "Michael Brown",
    category: "Listening",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Common Grammar Mistakes to Avoid in IELTS",
    description: "Identify and correct the most frequent grammar errors that can lower your IELTS score.",
    date: "July 22, 2023",
    author: "Lisa Zhang",
    category: "Grammar",
    readTime: "4 min read"
  },
  {
    id: 6,
    title: "IELTS Vocabulary Building: Essential Words for Band 7+",
    description: "Expand your vocabulary with these essential words and phrases that can help you achieve a band 7 or higher.",
    date: "August 10, 2023",
    author: "Robert Taylor",
    category: "Vocabulary",
    readTime: "9 min read"
  }
];

export default function Blog() {
  return (
    <PageContainer 
      title="IELTS Blog" 
      description="Latest articles, tips, and strategies to help you succeed in your IELTS exam"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <CardTitle className="mt-2">{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Content can be expanded with images or additional text */}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">{post.date}</div>
              <div className="text-sm font-medium">By {post.author}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}