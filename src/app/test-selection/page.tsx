'use client';

import Link from 'next/link';

export default function TestSelection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Select a Test</h1>
      <p className="text-lg mb-8">Choose the test you want to take.</p>
      <div className="flex space-x-4">
        <Link href="/reading-test" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80">
          Reading
        </Link>
        <Link href="/writing-test" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
          Writing
        </Link>
        <Link href="/listening-test" className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80">
          Listening
        </Link>
        <Link href="/speaking-test" className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80">
          Speaking
        </Link>
      </div>
    </div>
  );
}
