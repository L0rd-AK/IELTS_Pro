'use client';

import {Button} from '@/components/ui/button';

export default function ListeningTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Listening Test</h1>
      <p className="text-lg mb-8">Audio player with embedded recordings.</p>

      {/* Add audio player */}
      <audio controls className="w-full max-w-md">
        <source src="/audio/ielts-listening-sample.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Add question interface synchronized with audio segments */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Questions</h2>
        <ol>
          <li>
            <p>Question 1: What is the main topic of the recording?</p>
            <input type="text" className="border rounded p-2 w-full mb-2" placeholder="Your answer" />
          </li>
          <li>
            <p>Question 2: Who is the speaker?</p>
            <input type="text" className="border rounded p-2 w-full mb-2" placeholder="Your answer" />
          </li>
          {/* Add more questions */}
        </ol>
      </div>

      {/* Add submit button */}
      <Button className="mt-4">Submit Answers</Button>
    </div>
  );
}
