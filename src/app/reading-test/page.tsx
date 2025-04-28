'use client';

import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {generateQuestions} from '@/ai/flows/generate-questions';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {evaluateWritingTest} from '@/ai/flows/evaluate-writing-test';

export default function ReadingTest() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [passage, setPassage] = useState<string>('');

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      setFeedback(null);
      try {
        const result = await generateQuestions({
          topic: 'IELTS Reading Test',
          context: 'Multiple passages with varying difficulty on academic topics.',
          numQuestions: 3,
        });
        setQuestions(result.questions);
        setAnswers(Array(result.questions.length).fill(''));
      } catch (e: any) {
        setError(e.message || 'Failed to generate questions.');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch sample passage
    setPassage(
      'This is a sample passage for the reading test. Read the passage carefully and answer the questions below. The Industrial Revolution was a period of major industrialization and economic changes that began in Great Britain in the late 1700s. It transformed largely rural, agrarian societies into industrialized, urban ones.'
    );

    fetchQuestions();
  }, []);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      // Combine passage and answers for evaluation
      const combinedText = `Passage: ${passage}\nQuestions and Answers:\n${questions
        .map((q, i) => `Q: ${q}\nA: ${answers[i]}`)
        .join('\n')}`;

      // Use AI to evaluate reading comprehension
      const evaluationResult = await evaluateWritingTest({
        task1Response: combinedText,
        task2Response: 'Reading Comprehension Evaluation',
      });

      setFeedback(
        `Band Score: ${evaluationResult.bandScore}\nTask 1 Feedback: ${evaluationResult.task1Feedback}\nTask 2 Feedback: ${evaluationResult.task2Feedback}\nStrengths: ${evaluationResult.strengths}\nWeaknesses: ${evaluationResult.weaknesses}\nSuggestions: ${evaluationResult.suggestions}`
      );
    } catch (e: any) {
      setError(e.message || 'Failed to evaluate answers.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Reading Test</h1>
      <p className="text-lg mb-8">Multiple passages with varying difficulty.</p>

      {/* Add multiple passages with varying difficulty */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Passage 1</h2>
        <p className="mb-4">{passage}</p>

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
                  value={answers[index]}
                  onChange={e => handleAnswerChange(index, e.target.value)}
                />
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Add submit button */}
      <Button className="mt-4" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Evaluating...' : 'Submit Answers'}
      </Button>

      {feedback && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-2">Feedback</h2>
          <p className="whitespace-pre-line">{feedback}</p>
        </div>
      )}
    </div>
  );
}
