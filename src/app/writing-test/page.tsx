'use client';

import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {evaluateWritingTest} from '@/ai/flows/evaluate-writing-test';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

export default function WritingTest() {
  const [task1Response, setTask1Response] = useState('');
  const [task2Response, setTask2Response] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluateWriting = async () => {
    setIsLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      const result = await evaluateWritingTest({task1Response, task2Response});
      setEvaluation(
        `Band Score: ${result.bandScore}\nTask 1 Feedback: ${result.task1Feedback}\nTask 2 Feedback: ${result.task2Feedback}\nStrengths: ${result.strengths}\nWeaknesses: ${result.weaknesses}\nSuggestions: ${result.suggestions}`
      );
    } catch (e: any) {
      setError(e.message || 'Failed to evaluate writing.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Writing Test</h1>
      <p className="text-lg mb-8">Task 1 (data/graph description) and Task 2 (essay).</p>
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Task 1</h2>
        <p className="mb-2">You should spend about 20 minutes on this task.</p>
        <p className="mb-2">
          You are given a graph/chart/table/diagram and asked to describe, summarise or explain the
          information in your own words.
        </p>
        <Textarea
          placeholder="Write your response for Task 1 here"
          className="mb-4"
          value={task1Response}
          onChange={e => setTask1Response(e.target.value)}
        />
        <h2 className="text-2xl font-semibold mb-2">Task 2</h2>
        <p className="mb-2">You should spend about 40 minutes on this task.</p>
        <p className="mb-2">
          You are asked to write an essay in response to a point of view, argument or problem.
        </p>
        <Textarea
          placeholder="Write your response for Task 2 here"
          className="mb-4"
          value={task2Response}
          onChange={e => setTask2Response(e.target.value)}
        />
        <Button onClick={handleEvaluateWriting} disabled={isLoading}>
          {isLoading ? 'Evaluating...' : 'Evaluate Writing'}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {evaluation && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Evaluation</h2>
            <p className="whitespace-pre-line">{evaluation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
