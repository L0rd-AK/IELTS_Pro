'use server';
/**
 * @fileOverview Evaluates a student's speaking test responses and provides a band score and detailed feedback.
 *
 * - evaluateSpeakingTest - A function that handles the evaluation of the speaking test.
 * - EvaluateSpeakingTestInput - The input type for the evaluateSpeakingTest function.
 * - EvaluateSpeakingTestOutput - The return type for the evaluateSpeakingTest function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const EvaluateSpeakingTestInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A recording of the student's spoken response, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  transcription: z.string().describe('The transcription of the audio recording.'),
});
export type EvaluateSpeakingTestInput = z.infer<typeof EvaluateSpeakingTestInputSchema>;

const EvaluateSpeakingTestOutputSchema = z.object({
  bandScore: z.number().describe('The overall IELTS band score (0-9).'),
  feedback: z.object({
    pronunciation: z.string().describe('Feedback on pronunciation.'),
    fluency: z.string().describe('Feedback on fluency.'),
    vocabulary: z.string().describe('Feedback on vocabulary.'),
    grammar: z.string().describe('Feedback on grammar.'),
    overall: z.string().describe('Overall feedback and suggestions for improvement.'),
  }),
});
export type EvaluateSpeakingTestOutput = z.infer<typeof EvaluateSpeakingTestOutputSchema>;

export async function evaluateSpeakingTest(input: EvaluateSpeakingTestInput): Promise<EvaluateSpeakingTestOutput> {
  return evaluateSpeakingTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateSpeakingTestPrompt',
  input: {
    schema: z.object({
      audioDataUri: z
        .string()
        .describe(
          "A recording of the student's spoken response, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
      transcription: z.string().describe('The transcription of the audio recording.'),
    }),
  },
  output: {
    schema: z.object({
      bandScore: z.number().describe('The overall IELTS band score (0-9).'),
      feedback: z.object({
        pronunciation: z.string().describe('Feedback on pronunciation.'),
        fluency: z.string().describe('Feedback on fluency.'),
        vocabulary: z.string().describe('Feedback on vocabulary.'),
        grammar: z.string().describe('Feedback on grammar.'),
        overall: z.string().describe('Overall feedback and suggestions for improvement.'),
      }),
    }),
  },
  prompt: `You are an IELTS speaking test evaluator. Evaluate the following speaking test response based on the transcription and provide a band score (0-9) and detailed feedback on pronunciation, fluency, vocabulary, and grammar.\n\nTranscription: {{{transcription}}}\n\nAudio: {{media url=audioDataUri}}\n\nProvide the band score and feedback in the following format:\n{
  "bandScore": (0-9),
  "feedback": {
    "pronunciation": "...",
    "fluency": "...",
    "vocabulary": "...",
    "grammar": "...",
    "overall": "..."
  }
}`,
});

const evaluateSpeakingTestFlow = ai.defineFlow<
  typeof EvaluateSpeakingTestInputSchema,
  typeof EvaluateSpeakingTestOutputSchema
>(
  {
    name: 'evaluateSpeakingTestFlow',
    inputSchema: EvaluateSpeakingTestInputSchema,
    outputSchema: EvaluateSpeakingTestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
