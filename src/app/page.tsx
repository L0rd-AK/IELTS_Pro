import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to IELTS Ace</h1>
      <p className="text-lg mb-8">Your path to IELTS success starts here.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Test Preparation</h2>
        <p className="mb-4">
          Get ready for your IELTS exam with our comprehensive preparation resources.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/test-selection"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Take a Test
          </Link>
          <Link
            href="/resource-library"
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80"
          >
            Resource Library
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skill Enhancement</h2>
        <p className="mb-4">
          Improve your English skills in reading, writing, listening, and speaking.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/reading-test"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Improve Reading
          </Link>
          <Link
            href="/writing-test"
            className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
          >
            Improve Writing
          </Link>
          <Link
            href="/listening-test"
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80"
          >
            Improve Listening
          </Link>
          <Link
            href="/speaking-test"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Improve Speaking
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
        <p className="mb-4">
          Monitor your progress and identify areas for improvement.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Dashboard
          </Link>
          <Link
            href="/progress-tracking"
            className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
          >
            Track Progress
          </Link>
        </div>
      </section>

      <footer className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} IELTS Ace. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
