import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';

export interface ModelOptions {
  temperature?: number;
}

const SUPPORTED_PROVIDERS = ['openai', 'anthropic', 'google', 'google-genai'] as const;

type SupportedProvider = (typeof SUPPORTED_PROVIDERS)[number];

/**
 * Creates a chat model instance for the specified provider.
 * Uses static imports to avoid esbuild dynamic import issues.
 *
 * @param provider - The model provider (openai, anthropic, google, google-genai)
 * @param modelName - The model name (e.g., 'gpt-4o-mini', 'claude-sonnet-4-5-20250929')
 * @param options - Model options (temperature)
 * @returns A chat model instance
 */
export function createChatModel(
  provider: string,
  modelName: string,
  options: ModelOptions
): BaseChatModel {
  const temperature = options.temperature ?? 0;

  switch (provider as SupportedProvider) {
    case 'openai':
      return new ChatOpenAI({
        model: modelName,
        temperature,
      });

    case 'anthropic':
      return new ChatAnthropic({
        model: modelName,
        temperature,
      });

    case 'google':
    case 'google-genai':
      return new ChatGoogleGenerativeAI({
        model: modelName,
        temperature,
      });

    default:
      throw new Error(
        `Unsupported provider: ${provider}. Supported providers: ${SUPPORTED_PROVIDERS.join(', ')}`
      );
  }
}
