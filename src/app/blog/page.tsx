'use client';

import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { CreatePostModal } from "@/components/blog/create-post-modal";

type BlogPost = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { user } = useAuth();

  const fetchPosts = () => {
    fetch('http://localhost:5000/blogs')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PageContainer 
      title="IELTS Blog" 
      description="Latest articles, tips, and strategies to help you succeed in your IELTS exam"
    >
      <div className="flex justify-between items-center mb-6">
        <div></div>
        {user && <CreatePostModal onPostCreated={fetchPosts} />}
      </div>
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