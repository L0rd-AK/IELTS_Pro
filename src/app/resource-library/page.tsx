'use client';

export default function ResourceLibrary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
      <p className="text-lg mb-8">Study materials and resources.</p>

      {/* Add study materials and resources */}
      <div className="w-full max-w-2xl">
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Vocabulary Lists</h2>
          <p className="mb-2">Expand your vocabulary with these essential IELTS vocabulary lists.</p>
          <ul>
            <li><a href="#" className="text-primary hover:underline">IELTS Vocabulary List 1 (General)</a></li>
            <li><a href="#" className="text-primary hover:underline">IELTS Vocabulary List 2 (Academic)</a></li>
            <li><a href="#" className="text-primary hover:underline">IELTS Vocabulary List 3 (Business)</a></li>
            {/* Add more vocabulary lists */}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Grammar Guides</h2>
          <p className="mb-2">Improve your grammar skills with these comprehensive grammar guides.</p>
          <ul>
            <li><a href="#" className="text-primary hover:underline">IELTS Grammar Guide 1 (Tenses)</a></li>
            <li><a href="#" className="text-primary hover:underline">IELTS Grammar Guide 2 (Sentence Structure)</a></li>
            <li><a href="#" className="text-primary hover:underline">IELTS Grammar Guide 3 (Complex Sentences)</a></li>
            {/* Add more grammar guides */}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Practice Tests</h2>
          <p className="mb-2">Test your skills with these practice tests for each section of the IELTS exam.</p>
          <ul>
            <li><a href="/reading-test" className="text-primary hover:underline">IELTS Reading Practice Test 1</a></li>
            <li><a href="/listening-test" className="text-primary hover:underline">IELTS Listening Practice Test 1</a></li>
            <li><a href="/writing-test" className="text-primary hover:underline">IELTS Writing Practice Test 1</a></li>
            <li><a href="/speaking-test" className="text-primary hover:underline">IELTS Speaking Practice Test 1</a></li>
            {/* Add more practice tests */}
          </ul>
        </section>
      </div>
    </div>
  );
}
