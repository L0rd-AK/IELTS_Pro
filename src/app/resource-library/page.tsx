'use client';

export default function ResourceLibrary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
      <p className="text-lg mb-8">Study materials and resources.</p>

      {/* Add study materials and resources */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Vocabulary Lists</h2>
        <ul>
          <li><a href="#" className="text-primary hover:underline">IELTS Vocabulary List 1</a></li>
          <li><a href="#" className="text-primary hover:underline">IELTS Vocabulary List 2</a></li>
          {/* Add more vocabulary lists */}
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Grammar Guides</h2>
        <ul>
          <li><a href="#" className="text-primary hover:underline">IELTS Grammar Guide 1</a></li>
          <li><a href="#" className="text-primary hover:underline">IELTS Grammar Guide 2</a></li>
          {/* Add more grammar guides */}
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Practice Tests</h2>
        <ul>
          <li><a href="#" className="text-primary hover:underline">IELTS Reading Practice Test 1</a></li>
          <li><a href="#" className="text-primary hover:underline">IELTS Listening Practice Test 1</a></li>
          {/* Add more practice tests */}
        </ul>
      </div>
    </div>
  );
}
