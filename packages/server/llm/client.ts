import { Ollama } from 'ollama';

const ollamaClient = new Ollama();

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   instructions?: string;
   temperature?: number;
   maxTokens?: number;
};

type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'llama3.2:1b',
      prompt,
      instructions,
      temperature = 0.2,
      maxTokens = 300,
   }: GenerateTextOptions): Promise<GenerateTextResult> {
      const response = await ollamaClient.chat({
         model,
         messages: [
            ...(instructions
               ? [{ role: 'system' as const, content: instructions }]
               : []),
            {
               role: 'user',
               content: prompt,
            },
         ],
         options: {
            temperature,
            num_predict: maxTokens,
         },
      });

      return {
         id: crypto.randomUUID(),
         text: response.message.content,
      };
   },

};