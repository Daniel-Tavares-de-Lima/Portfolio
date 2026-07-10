import type { Locale } from '../config/eras';

export type ChatResponseKey = 'experience' | 'projects' | 'skills' | 'contact' | 'fallback';

const patterns: Record<Exclude<ChatResponseKey, 'fallback'>, RegExp> = {
  experience: /experi[eê]ncia|experience|trabalho|work|emprego|job/i,
  projects: /projeto|project|satre|github|app/i,
  skills: /skill|tecnologia|stack|ferramenta|tool/i,
  contact: /contato|contact|email|linkedin|falar/i,
};

export function matchChatResponse(input: string): ChatResponseKey {
  for (const [key, pattern] of Object.entries(patterns) as [Exclude<ChatResponseKey, 'fallback'>, RegExp][]) {
    if (pattern.test(input)) return key;
  }
  return 'fallback';
}

export type ChatResponses = Record<ChatResponseKey, Record<Locale, string>>;
