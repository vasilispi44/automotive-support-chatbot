import fs from 'fs';
import path from 'path';
import template from '../llm/prompts/technical_support_instructions.txt';
import { llmClient } from '../llm/client';

const SupportInfo = fs.readFileSync(
   path.join(__dirname, '..', 'llm', 'prompts', 'SupportKnowledge.md'),
   'utf-8'
);
const instructions = template.replace('{{SupportInfo}}', SupportInfo);

type ChatResponse = {
   id: string;
   message: string;
};

// Public interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await llmClient.generateText({
         model: 'llama3.2:1b',
         instructions,
         prompt,
         temperature: 0.2,
         maxTokens: 200,
      });

      return {
         id: response.id,
         message: response.text,
      };
   },
};