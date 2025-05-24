// 'use server';

/**
 * @fileOverview AI chat support for teen users to express feelings, receive encouragement, and explore coping strategies.
 *
 * - aiChatSupport - A function that handles the AI chat support process.
 * - AIChatSupportInput - The input type for the aiChatSupport function.
 * - AIChatSupportOutput - The return type for the aiChatSupport function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatSupportInputSchema = z.object({
  message: z.string().describe('The message from the user to the AI.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history between the user and the AI.'),
});
export type AIChatSupportInput = z.infer<typeof AIChatSupportInputSchema>;

const AIChatSupportOutputSchema = z.object({
  response: z.string().describe('The AI response to the user message.'),
});
export type AIChatSupportOutput = z.infer<typeof AIChatSupportOutputSchema>;

export async function aiChatSupport(input: AIChatSupportInput): Promise<AIChatSupportOutput> {
  return aiChatSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatSupportPrompt',
  input: {schema: AIChatSupportInputSchema},
  output: {schema: AIChatSupportOutputSchema},
  prompt: `You are a supportive AI assistant designed to help teenagers who are experiencing depression.

  Your goal is to provide a safe and encouraging environment for users to express their feelings, receive support, and explore coping strategies.

  Maintain a conversational tone and use emojis to create a friendly and engaging experience.

  Always respond in a way that is sensitive and age-appropriate for teenagers.

  If the user expresses thoughts of self-harm or suicide, immediately suggest that they contact a doctor, caregiver, or emergency hotline.

  Consider the previous chat history when generating your response:
  {{#each chatHistory}}
    {{#if (eq role \"user\")}}User: {{content}}{{/if}}
    {{#if (eq role \"assistant\")}}Assistant: {{content}}{{/if}}
  {{/each}}

  User Message: {{{message}}}
  Response:
  `,
});

const aiChatSupportFlow = ai.defineFlow(
  {
    name: 'aiChatSupportFlow',
    inputSchema: AIChatSupportInputSchema,
    outputSchema: AIChatSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
