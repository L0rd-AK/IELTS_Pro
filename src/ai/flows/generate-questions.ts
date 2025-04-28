'use server';
/**
 * @fileOverview Question generation AI agent.
 *
 * - generateQuestions - A function that handles the question generation process.
 * - GenerateQuestionsInput - The input type for the generateQuestions function.
 * - GenerateQuestionsOutput - The return type for the generateQuestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which questions need to be generated.'),
  context: z.string().describe('The context or background information for the topic.'),
  numQuestions: z.number().default(5).describe('The number of questions to generate.'),
});
export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

const GenerateQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('A list of generated questions.'),
});
export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;

export async function generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic for which questions need to be generated.'),
      context: z.string().describe('The context or background information for the topic.'),
      numQuestions: z.number().default(5).describe('The number of questions to generate.'),
    }),
  },
  output: {
    schema: z.object({
      questions: z.array(z.string()).describe('A list of generated questions.'),
    }),
  },
  prompt: `You are an expert question generator. Generate {{numQuestions}} questions based on the given topic and context.

Topic: {{{topic}}}
Context: {{{context}}}

Questions:`,
});

const generateQuestionsFlow = ai.defineFlow<
  typeof GenerateQuestionsInputSchema,
  typeof GenerateQuestionsOutputSchema
>(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
