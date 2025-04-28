'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to IELTS Ace</h1>
      <p className="text-lg mb-8">Your path to IELTS success starts here.</p>
      <div className="flex space-x-4">
        <Link href="/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80">
          Dashboard
        </Link>
        <Link href="/test-selection" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
          Take a Test
        </Link>
        <Link href="/progress-tracking" className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80">
          Track Progress
        </Link>
        <Link href="/resource-library" className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80">
          Resource Library
        </Link>
      </div>
    </div>
  );
}
