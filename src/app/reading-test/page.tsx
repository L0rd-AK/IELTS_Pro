'use client';

import {Button} from '@/components/ui/button';

export default function ReadingTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Reading Test</h1>
      <p className="text-lg mb-8">Multiple passages with varying difficulty.</p>

      {/* Add multiple passages with varying difficulty */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Passage 1</h2>
        <p className="mb-4">
          This is a sample passage for the reading test. Read the passage carefully and answer the questions below.
        </p>

        {/* Add question types: multiple choice, matching, fill-in-blanks, etc. */}
        <h3 className="text-xl font-semibold mb-2">Questions</h3>
        <ol>
          <li>
            <p>Question 1: What is the main idea of the passage?</p>
            <input type="text" className="border rounded p-2 w-full mb-2" placeholder="Your answer" />
          </li>
          <li>
            <p>Question 2: Fill in the blank: The author believes that _________.</p>
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
