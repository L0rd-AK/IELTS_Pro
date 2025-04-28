'use server';
/**
 * @fileOverview An IELTS writing test evaluation AI agent.
 *
 * - evaluateWritingTest - A function that handles the writing test evaluation process.
 * - EvaluateWritingTestInput - The input type for the evaluateWritingTest function.
 * - EvaluateWritingTestOutput - The return type for the evaluateWritingTest function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const EvaluateWritingTestInputSchema = z.object({
  task1Response: z.string().describe('The response to IELTS Writing Task 1 (data/graph description)'),
  task2Response: z.string().describe('The response to IELTS Writing Task 2 (essay)'),
});
export type EvaluateWritingTestInput = z.infer<typeof EvaluateWritingTestInputSchema>;

const EvaluateWritingTestOutputSchema = z.object({
  bandScore: z.number().describe('The overall band score for the writing test (0-9)'),
  task1Feedback: z.string().describe('Detailed feedback on Task 1 response'),
  task2Feedback: z.string().describe('Detailed feedback on Task 2 response'),
  strengths: z.string().describe('Identified strengths in the writing'),
  weaknesses: z.string().describe('Identified weaknesses in the writing'),
  suggestions: z.string().describe('Suggestions for improvement'),
});
export type EvaluateWritingTestOutput = z.infer<typeof EvaluateWritingTestOutputSchema>;

export async function evaluateWritingTest(input: EvaluateWritingTestInput): Promise<EvaluateWritingTestOutput> {
  return evaluateWritingTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateWritingTestPrompt',
  input: {
    schema: z.object({
      task1Response: z.string().describe('The response to IELTS Writing Task 1 (data/graph description)'),
      task2Response: z.string().describe('The response to IELTS Writing Task 2 (essay)'),
    }),
  },
  output: {
    schema: z.object({
      bandScore: z.number().describe('The overall band score for the writing test (0-9)'),
      task1Feedback: z.string().describe('Detailed feedback on Task 1 response'),
      task2Feedback: z.string().describe('Detailed feedback on Task 2 response'),
      strengths: z.string().describe('Identified strengths in the writing'),
      weaknesses: z.string().describe('Identified weaknesses in the writing'),
      suggestions: z.string().describe('Suggestions for improvement'),
    }),
  },
  prompt: `You are an IELTS writing test evaluator. Evaluate the following writing test responses based on IELTS criteria (task achievement, coherence, vocabulary, grammar).

Task 1 Response: {{{task1Response}}}
Task 2 Response: {{{task2Response}}}

Provide a band score (0-9), detailed feedback for each task, identified strengths and weaknesses, and suggestions for improvement.

Please provide the band score in the 'bandScore' field. Provide the Task 1 feedback in the 'task1Feedback' field. Provide the Task 2 feedback in the 'task2Feedback' field. Provide the identified strengths in the 'strengths' field. Provide the identified weaknesses in the 'weaknesses' field. Provide suggestions for improvement in the 'suggestions' field.`,
});

const evaluateWritingTestFlow = ai.defineFlow<
  typeof EvaluateWritingTestInputSchema,
  typeof EvaluateWritingTestOutputSchema
>({
  name: 'evaluateWritingTestFlow',
  inputSchema: EvaluateWritingTestInputSchema,
  outputSchema: EvaluateWritingTestOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
