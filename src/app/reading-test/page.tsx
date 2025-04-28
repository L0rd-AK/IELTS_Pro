'use client';

import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {generateQuestions} from '@/ai/flows/generate-questions';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

export default function ReadingTest() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await generateQuestions({
          topic: 'IELTS Reading Test',
          context: 'Multiple passages with varying difficulty on academic topics.',
          numQuestions: 3,
        });
        setQuestions(result.questions);
      } catch (e: any) {
        setError(e.message || 'Failed to generate questions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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
        {isLoading && <p>Loading questions...</p>}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!isLoading && !error && questions.length > 0 && (
          <ol>
            {questions.map((question, index) => (
              <li key={index}>
                <p>{`Question ${index + 1}: ${question}`}</p>
                <input
                  type="text"
                  className="border rounded p-2 w-full mb-2"
                  placeholder="Your answer"
                />
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Add submit button */}
      <Button className="mt-4">Submit Answers</Button>
    </div>
  );
}
