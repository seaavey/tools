/**
 * Siputzx API Client
 *
 * A TypeScript client for interacting with the Siputzx API, providing access to AI models,
 * anime/manga data, news, APKs, and social media downloads.
 *
 * Base URL:
 * - https://api.siputzx.my.id
 *
 * Features:
 * - Seamless integration with JavaScript/TypeScript projects
 * - Modular and extensible architecture
 * - Robust error handling with retry logic and timeouts
 *
 * @author
 * - Muhammad Adriansyah <https://github.com/seaavey>
 *
 * @license
 * MIT License
 *
 * Copyright (c) 2025
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 */

import { IAI, IAnichinDetail, IAnichinDownload, IAnichinEpisode, IAnichinLatest, IAnichinPopular, IAnichinSearch, IApkAn1, IApkAppstore, IApkHappymod, IAuratailDetail, IAuratailLatest, IAuratailPopular, IAuratailSearch, IDLAppleMusic, IDLCapcut, IDLDouyin, IDLFacebook, IDLGDrive, IDLInstagram, IDLMediaFire, IDLPinterest, IDLSnackVideo, IDLSoundCloud, IDLSpotify, IDLStickerLy, IDLTikTok, IDLTwitter, IKiryuuSearch, IKomikindoDetail, IKomikindoDownload, IKomikindoSearch, INewsAntara, INewsCnbcIND, INewsCnnIND, INewsJKT48, INewsLiputan6, IQuotes, ISamehadakuLatest, ISamehadakuRelease, ISamehadakuSearch, METHOD } from '../Types';

/**
 * Sends a JSON request to the Siputzx API and returns the response data.
 *
 * @template T - The expected response data type.
 * @template B - The request body type (defaults to unknown).
 * @param endpoint - The API endpoint path (e.g., "ai/llama33").
 * @param parameters - URL query parameters as a key-value object.
 * @param method - HTTP method to use (e.g., "GET", "POST").
 * @param body - Request body data, serialized to JSON if provided.
 * @param retryCount - Number of retry attempts for failed requests (default: 3).
 * @param timeoutMs - Request timeout in milliseconds (default: 10000).
 * @returns A promise resolving to the response data of type T.
 * @throws Error if the request fails after all retries or times out.
 */
export const request = async <T, B = unknown>(endpoint: string, parameters: Record<string, string> = {}, method: METHOD = 'GET', body?: B, retryCount: number = 3, timeoutMs: number = 10000): Promise<T> => {
  const url = new URL(`https://api.siputzx.my.id/api/${endpoint}`);
  Object.entries(parameters).forEach(([key, value]) => url.searchParams.append(key, value));

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status >= 500 && response.status < 600 && attempt < retryCount) {
          console.warn(`Retrying (${attempt}/${retryCount})...`);
          continue;
        }

        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }

      const data: T = await response.json();
      return data;
    } catch (error: any) {
      clearTimeout(timeout);

      const isAbort = error.name === 'AbortError';
      const isLastAttempt = attempt === retryCount;

      if (isAbort) {
        console.warn(`Request timeout on attempt ${attempt}.`);
      } else {
        console.warn(`Request failed on attempt ${attempt}:`, error);
      }

      if (isLastAttempt) {
        console.error(`API request to ${endpoint} failed after ${retryCount} attempts.`);
        throw error;
      }
    }
  }

  throw new Error(`API request to ${endpoint} failed after ${retryCount} attempts.`);
};

/**
 * Sends a request to the Siputzx API and returns binary data as a Buffer.
 *
 * @param endpoint - The API endpoint path (e.g., "ai/dreamshaper").
 * @param parameters - URL query parameters as a key-value object.
 * @param method - HTTP method to use (e.g., "GET", "POST").
 * @param body - Request body as a Buffer, if applicable.
 * @param retryCount - Number of retry attempts for failed requests (default: 3).
 * @param timeoutMs - Request timeout in milliseconds (default: 10000).
 * @returns A promise resolving to the response data as a Buffer.
 * @throws Error if the request fails or the response is not binary.
 */
export const requestBuffer = async (endpoint: string, parameters: Record<string, string> = {}, method: METHOD = 'GET', body?: Buffer, retryCount: number = 3, timeoutMs: number = 10000): Promise<Buffer> => {
  const url = new URL(`https://api.siputzx.my.id/api/${endpoint}`);
  Object.entries(parameters).forEach(([key, value]) => url.searchParams.append(key, value));

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status >= 500 && response.status < 600 && attempt < retryCount) {
          console.warn(`Retrying (${attempt}/${retryCount})...`);
          continue;
        }

        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }

      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/octet-stream') || contentType.includes('image/')) {
        const buffer = await response.arrayBuffer();
        return Buffer.from(buffer);
      } else {
        throw new Error('Expected binary data but received non-binary response.');
      }
    } catch (error: any) {
      clearTimeout(timeout);

      const isAbort = error.name === 'AbortError';
      const isLastAttempt = attempt === retryCount;

      if (isAbort) {
        console.warn(`Request timeout on attempt ${attempt}.`);
      } else {
        console.warn(`Request failed on attempt ${attempt}:`, error);
      }

      if (isLastAttempt) {
        console.error(`API request to ${endpoint} failed after ${retryCount} attempts.`);
        throw error;
      }
    }
  }

  throw new Error('Unknown error occurred in request retry logic.');
};

/**
 * AI-related API endpoints for interacting with various AI models provided by the Siputzx API.
 *
 * These functions enable querying AI models for tasks such as text generation, image analysis,
 * image generation, and specialized queries (e.g., religious or cultural contexts).
 */

/**
 * Queries the Llama33 AI model with a prompt and text input.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param text - The input text to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Llama33 = async (prompt: string, text: string): Promise<IAI> => {
  return await request<IAI>('ai/llama33', { prompt, text });
};

/**
 * Queries the Meta Llama 33-70B Instruct Turbo AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_META = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/meta-llama-33-70B-instruct-turbo', { content });
};

/**
 * Queries the Nous Hermes AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_NousHermes = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/nous-hermes', { content });
};

/**
 * Queries the Joko AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Joko = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/joko', { content });
};

/**
 * Queries the Aoyo AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Aoyo = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/aoyo', { content });
};

/**
 * Queries the Bard AI model with an image URL and query for image-based analysis.
 *
 * @param imageUrl - The URL of the image to analyze.
 * @param query - The query or instruction related to the image.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_BardIMG = async (imageUrl: string, query: string): Promise<IAI> => {
  return await request<IAI>('ai/bard-img', { imageUrl, query });
};

/**
 * Queries the Bard AI model with a text query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Bard = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/bard-thinking', { query });
};

/**
 * Queries the Bible AI model with a question for religious or biblical insights.
 *
 * @param question - The question related to biblical topics.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Bible = async (question: string): Promise<IAI> => {
  return await request<IAI>('ai/bible', { question });
};

/**
 * Queries the Copilot AI model with text input.
 *
 * @param text - The input text for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Copilot = async (text: string): Promise<IAI> => {
  return await request<IAI>('ai/copilot', { text });
};

/**
 * Queries the Blackbox Pro AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_BlackboxPro = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/blackboxai-pro', { content });
};

/**
 * Queries the Blackbox AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Blackbox = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/blackboxai', { content });
};

/**
 * Queries the Claude Sonnet 3.7 AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_ClaudeSonnet = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/claude-sonnet-37', { content });
};

/**
 * Queries the DBRX Instruct AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_DBRX = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/dbrx-instruct', { content });
};

/**
 * Queries the DeepSeek LLM 67B Chat AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_DeepSeek = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/deepseek-llm-67b-chat', { content });
};

/**
 * Queries the DeepSeek AI model with a custom prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_DeepSeekCustom = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>('ai/deepseek', { prompt, message });
};

/**
 * Queries the DeepSeek R1 AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_DeepSeekR1 = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/deepseek-r1', { content });
};

/**
 * Generates an image using the DreamShaper AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const AI_DreamShaper = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer('ai/dreamshaper', { prompt });
};

/**
 * Queries the DuckAI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_DuckAI = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/duckai', { query });
};

/**
 * Queries the ESIA AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_ESIA = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/esia', { content });
};

/**
 * Performs face swapping using source and target images.
 *
 * @param source - The URL of the source image (face to swap).
 * @param target - The URL of the target image (body or scene).
 * @returns A promise resolving to the swapped image as a Buffer.
 */
export const AI_FaceSwap = async (source: string, target: string): Promise<Buffer> => {
  return await requestBuffer('ai/faceswap', { source, target });
};

/**
 * Queries the Felo AI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Felo = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/felo', { query });
};

/**
 * Queries the FlatAI model with a prompt, returning either a Buffer or IAI response.
 *
 * @param prompt - The input prompt for the AI model.
 * @returns A promise resolving to either a Buffer (for images) or IAI (for text).
 */
export const AI_FlatAI = async (prompt: string): Promise<Buffer | IAI> => {
  return await requestBuffer('ai/flatai', { prompt });
};

/**
 * Generates an image using the Flux AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const AI_Flux = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer('ai/flux', { prompt });
};

/**
 * Queries the Gandalf AI model with a prompt.
 *
 * @param prompt - The input prompt for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Gandalf = async (prompt: string): Promise<IAI> => {
  return await request<IAI>('ai/gandalf', { prompt });
};

/**
 * Queries the Gemini Pro AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_GeminiPro = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/gemini-pro', { content });
};

/**
 * Queries the Gemma AI model with a prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Gemma = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>('ai/gemma', { prompt, message });
};

/**
 * Queries the Gita AI model with a query for insights from the Bhagavad Gita.
 *
 * @param query - The question related to the Bhagavad Gita or spiritual topics.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Gita = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/gita', { q: query });
};

/**
 * Queries the GPT-3 AI model with a prompt and content.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param content - The input content to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_GPT3 = async (prompt: string, content: string): Promise<IAI> => {
  return await request<IAI>('ai/gpt3', { prompt, content });
};

/**
 * Queries the HikaChat AI model with a keyword.
 *
 * @param keyword - The keyword or topic for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_HikaChat = async (keyword: string): Promise<IAI> => {
  return await request<IAI>('ai/hikachat', { keyword });
};

/**
 * Queries the IAsk AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_IAsk = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/iask', { content });
};

/**
 * Converts an image to text using the ImageToText AI model.
 *
 * @param url - The URL of the image to convert to text.
 * @returns A promise resolving to the AI response data of type IAI containing the extracted text.
 */
export const AI_ImageToText = async (url: string): Promise<IAI> => {
  return await request<IAI>('ai/image2text', { url });
};

/**
 * Queries the Dukun AI model with content for culturally specific or mystical insights.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Dukun = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/dukun', { content });
};

/**
 * Queries the Latukam AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Latukam = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/latukam', { content });
};

/**
 * Queries the Lepton AI model with text input.
 *
 * @param text - The input text for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Lepton = async (text: string): Promise<IAI> => {
  return await request<IAI>('ai/lepton', { text });
};

/**
 * Queries the Llama AI model with a custom prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_LlamaCustom = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>('ai/llama', { prompt, message });
};

/**
 * Queries the LuminAI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_LuminAI = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/luminai', { content });
};

/**
 * Generates an image using the MagicStudio AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const AI_MagicStudio = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer('ai/magicstudio', { prompt });
};

/**
 * Queries the Meta AI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_MetaAI = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/metaai', { query });
};

/**
 * Queries the Mistral 7B Instruct v0.2 AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Mistral7BInstruct = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/mistral-7b-instruct-v0.2', { content });
};

/**
 * Queries the Mistral AI model with a prompt and message.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param message - The input message to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Mistral = async (prompt: string, message: string): Promise<IAI> => {
  return await request<IAI>('ai/mistral', { prompt, message });
};

/**
 * Queries the Moshiai AI model with input content.
 *
 * @param input - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Moshiai = async (input: string): Promise<IAI> => {
  return await request<IAI>('ai/moshiai', { input });
};

/**
 * Queries the MuslimAI model with a query for Islamic-related insights.
 *
 * @param query - The question related to Islamic topics.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_MuslimAI = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/muslimai', { query });
};

/**
 * Queries the PowerBrainAI model with a query.
 *
 * @param query - The text query for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_PowerBrainAI = async (query: string): Promise<IAI> => {
  return await request<IAI>('ai/powerbrainai', { query });
};

/**
 * Queries the Qwen 257B AI model with a prompt and text.
 *
 * @param prompt - The instruction or context for the AI model.
 * @param text - The input text to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Qwen257B = async (prompt: string, text: string): Promise<IAI> => {
  return await request<IAI>('ai/qwen257b', { prompt, text });
};

/**
 * Queries the QWQ 32B Preview AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_QWQ32BPreview = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/qwq-32b-preview', { content });
};

/**
 * Generates an image using the Stability AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const AI_StabilityAI = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer('ai/stabilityai', { prompt });
};

/**
 * Generates an image using the Stable Diffusion AI model with a prompt.
 *
 * @param prompt - The description of the image to generate.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const AI_StableDiffusion = async (prompt: string): Promise<Buffer> => {
  return await requestBuffer('ai/stable-diffusion', { prompt });
};

/**
 * Queries the TeachAnything AI model with content for educational purposes.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_TeachAnything = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/teachanything', { content });
};

/**
 * Queries the Uncovr AI model with content.
 *
 * @param content - The input content for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Uncovr = async (content: string): Promise<IAI> => {
  return await request<IAI>('ai/uncovr', { content });
};

/**
 * Queries the Venice AI model with a prompt.
 *
 * @param prompt - The input prompt for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Venice = async (prompt: string): Promise<IAI> => {
  return await request<IAI>('ai/venice', { prompt });
};

/**
 * Queries the YanzGPT AI model with a query, prompt, and model type.
 *
 * @param query - The main question or query for the AI model.
 * @param prompt - The instruction or context for the AI model.
 * @param modelType - The specific model type to use.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_YanzGPT = async (query: string, prompt: string, modelType: string): Promise<IAI> => {
  return await request<IAI>('ai/yanzgpt', { query, prompt, modelType });
};

/**
 * Queries the Yousearch AI model with text input.
 *
 * @param text - The input text for the AI model to process.
 * @returns A promise resolving to the AI response data of type IAI.
 */
export const AI_Yousearch = async (text: string): Promise<IAI> => {
  return await request<IAI>('ai/yousearch', { text });
};

/**
 * Anime-related API endpoints for interacting with anime and manga data sources provided by the Siputzx API.
 *
 * These functions retrieve anime/manga details, episodes, downloads, latest releases, popular titles, and search results
 * from platforms like Anichin, Auratail, Kiryuu, Komikindo, and Samehadaku.
 */

/**
 * Retrieves detailed information about an anime from the Anichin platform.
 *
 * @param url - The URL of the anime page on Anichin.
 * @returns A promise resolving to the anime details of type IAnichinDetail.
 */
export const ANIME_Anichin_Detail = async (url: string): Promise<IAnichinDetail> => {
  return await request<IAnichinDetail>('anime/anichin-detail', { url });
};

/**
 * Retrieves download links for an anime from the Anichin platform.
 *
 * @param url - The URL of the anime episode or page on Anichin.
 * @returns A promise resolving to the download information of type IAnichinDownload.
 */
export const ANIME_Anichin_Download = async (url: string): Promise<IAnichinDownload> => {
  return await request<IAnichinDownload>('anime/anichin-download', { url });
};

/**
 * Retrieves episode information for an anime from the Anichin platform.
 *
 * @param url - The URL of the anime episode page on Anichin.
 * @returns A promise resolving to the episode details of type IAnichinEpisode.
 */
export const ANIME_Anichin_Episode = async (url: string): Promise<IAnichinEpisode> => {
  return await request<IAnichinEpisode>('anime/anichin-episode', { url });
};

/**
 * Retrieves the latest anime releases from the Anichin platform.
 *
 * @returns A promise resolving to the latest anime releases of type IAnichinLatest.
 */
export const ANIME_Anichin_Latest = async (): Promise<IAnichinLatest> => {
  return await request<IAnichinLatest>('anime/latest');
};

/**
 * Retrieves popular anime titles from the Anichin platform.
 *
 * @returns A promise resolving to the popular anime titles of type IAnichinPopular.
 */
export const ANIME_Anichin_Popular = async (): Promise<IAnichinPopular> => {
  return await request<IAnichinPopular>('anime/anichin-popular');
};

/**
 * Searches for anime titles on the Anichin platform.
 *
 * @param query - The search query for finding anime titles.
 * @returns A promise resolving to the search results of type IAnichinSearch.
 */
export const ANIME_Anichin_Search = async (query: string): Promise<IAnichinSearch> => {
  return await request<IAnichinSearch>('anime/anichin-search', { query });
};

/**
 * Retrieves detailed information about an anime or manga from the Auratail platform.
 *
 * @param url - The URL of the anime or manga page on Auratail.
 * @returns A promise resolving to the details of type IAuratailDetail.
 */
export const ANIME_Auratail_Detail = async (url: string): Promise<IAuratailDetail> => {
  return await request<IAuratailDetail>('anime/auratail-detail', { url });
};

/**
 * Retrieves the latest anime or manga releases from the Auratail platform.
 *
 * @returns A promise resolving to the latest releases of type IAuratailLatest.
 */
export const ANIME_Auratail_Latest = async (): Promise<IAuratailLatest> => {
  return await request<IAuratailLatest>('anime/auratail-latest');
};

/**
 * Retrieves popular anime or manga titles from the Auratail platform.
 *
 * @returns A promise resolving to the popular titles of type IAuratailPopular.
 */
export const ANIME_Auratail_Popular = async (): Promise<IAuratailPopular> => {
  return await request<IAuratailPopular>('anime/auratail-popular');
};

/**
 * Searches for anime or manga titles on the Auratail platform.
 *
 * @param query - The search query for finding anime or manga titles.
 * @returns A promise resolving to the search results of type IAuratailSearch.
 */
export const ANIME_Auratail_Search = async (query: string): Promise<IAuratailSearch> => {
  return await request<IAuratailSearch>('anime/auratail-search', { query });
};

/**
 * Searches for anime or manga titles on the Kiryuu platform.
 *
 * @param query - The search query for finding anime or manga titles.
 * @returns A promise resolving to the search results of type IKiryuuSearch.
 */
export const ANIME_Kiryuu_Search = async (query: string): Promise<IKiryuuSearch> => {
  return await request<IKiryuuSearch>('anime/kiryuu', { query });
};

/**
 * Retrieves detailed information about a manga from the Komikindo platform.
 *
 * @param url - The URL of the manga page on Komikindo.
 * @returns A promise resolving to the manga details of type IKomikindoDetail.
 */
export const ANIME_Komikindo_Detail = async (url: string): Promise<IKomikindoDetail> => {
  return await request<IKomikindoDetail>('anime/komikindo-detail', { url });
};

/**
 * Retrieves download links for a manga chapter from the Komikindo platform.
 *
 * @param url - The URL of the manga chapter or page on Komikindo.
 * @returns A promise resolving to the download information of type IKomikindoDownload.
 */
export const ANIME_Komikindo_Download = async (url: string): Promise<IKomikindoDownload> => {
  return await request<IKomikindoDownload>('anime/komikindo-download', { url });
};

/**
 * Searches for manga titles on the Komikindo platform.
 *
 * @param query - The search query for finding manga titles.
 * @returns A promise resolving to the search results of type IKomikindoSearch.
 */
export const ANIME_Komikindo_Search = async (query: string): Promise<IKomikindoSearch> => {
  return await request<IKomikindoSearch>('anime/komikindo-serach', { query });
};

/**
 * Retrieves the latest anime release schedule from the Samehadaku platform.
 *
 * @returns A promise resolving to the release schedule of type ISamehadakuRelease.
 */
export const ANIME_Samehadaku_Release = async (): Promise<ISamehadakuRelease> => {
  return await request<ISamehadakuRelease>('anime/samehadaku/release');
};

/**
 * Retrieves the latest anime episodes from the Samehadaku platform.
 *
 * @returns A promise resolving to the latest episodes of type ISamehadakuLatest.
 */
export const ANIME_Samehadaku_Latest = async (): Promise<ISamehadakuLatest> => {
  return await request<ISamehadakuLatest>('anime/samehadaku/latest');
};

/**
 * Searches for anime titles on the Samehadaku platform.
 *
 * @param query - The search query for finding anime titles.
 * @returns A promise resolving to the search results of type ISamehadakuSearch.
 */
export const ANIME_Samehadaku_Search = async (query: string): Promise<ISamehadakuSearch> => {
  return await request<ISamehadakuSearch>('anime/samehadaku/search', { query });
};

/**
 * Miscellaneous API endpoints for anime quotes, APK searches, news, and canvas-based image generation provided by the Siputzx API.
 *
 * These functions retrieve anime quotes, search for APKs, fetch news from Indonesian sources, and generate custom images
 * for social media or community interactions (e.g., welcome/goodbye cards, profiles).
 */

/**
 * Retrieves random anime quotes.
 *
 * @returns A promise resolving to anime quote data of type IQuotes.
 */
export const R_QuotesAnime = async (): Promise<IQuotes> => {
  return await request<IQuotes>('r/quotesanime');
};

/**
 * Retrieves an image related to Blue Archive from a specific source or community.
 *
 * @returns A promise resolving to the image as a Buffer.
 */
export const R_BlueArchive = async (): Promise<Buffer> => {
  return await requestBuffer('r/blue-archive');
};

/**
 * Searches for APKs on the AN1 platform.
 *
 * @param search - The search query for finding APKs.
 * @returns A promise resolving to the search results of type IApkAn1.
 */
export const APK_An1 = async (search: string): Promise<IApkAn1> => {
  return await request<IApkAn1>('apk/an1', { search });
};

/**
 * Searches for apps on the Appstore platform.
 *
 * @param search - The search query for finding apps.
 * @returns A promise resolving to the search results of type IApkAppstore.
 */
export const APK_Appstore = async (search: string): Promise<IApkAppstore> => {
  return await request<IApkAppstore>('apk/appstore', { search });
};

/**
 * Searches for APKs on the Happymod platform.
 *
 * @param search - The search query for finding APKs.
 * @returns A promise resolving to the search results of type IApkHappymod.
 */
export const APK_Happymod = async (search: string): Promise<IApkHappymod> => {
  return await request<IApkHappymod>('apk/happymod', { search });
};

/**
 * Retrieves the latest news from Antara, an Indonesian news agency.
 *
 * @returns A promise resolving to the news data of type INewsAntara.
 */
export const News_Antara = async (): Promise<INewsAntara> => {
  return await request<INewsAntara>('berita/antara');
};

/**
 * Retrieves the latest news from CNBC Indonesia.
 *
 * @returns A promise resolving to the news data of type INewsCnbcIND.
 */
export const News_CnbcIND = async (): Promise<INewsCnbcIND> => {
  return await request<INewsCnbcIND>('berita/cnbcindonesia');
};

/**
 * Retrieves the latest news from CNN Indonesia.
 *
 * @returns A promise resolving to the news data of type INewsCnnIND.
 */
export const News_CnnIND = async (): Promise<INewsCnnIND> => {
  return await request<INewsCnnIND>('berita/cnnindonesia');
};

/**
 * Retrieves the latest news or updates related to JKT48, an Indonesian idol group.
 *
 * @returns A promise resolving to the news data of type INewsJKT48.
 */
export const News_JKT48 = async (): Promise<INewsJKT48> => {
  return await request<INewsJKT48>('berita/jkt48');
};

/**
 * Retrieves the latest news from Liputan6, an Indonesian news portal.
 *
 * @returns A promise resolving to the news data of type INewsLiputan6.
 */
export const News_Liputan6 = async (): Promise<INewsLiputan6> => {
  return await request<INewsLiputan6>('berita/liputan6');
};

/**
 * Generates a custom image with a "gay" theme for humorous or community purposes.
 *
 * @param nama - The name to include in the image.
 * @param avatar - The URL of the avatar image to include.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_Gay = async (nama: string, avatar: string): Promise<Buffer> => {
  return await requestBuffer('canvas/gay', { nama, avatar });
};

/**
 * Generates a custom image with an "XNXX" theme for humorous or meme purposes.
 *
 * @param title - The title text to include in the image.
 * @param image - The URL of the image to include.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_XNXX = async (title: string, image: string): Promise<Buffer> => {
  return await requestBuffer('canvas/xnxx', { title, image });
};

/**
 * Generates a goodbye image (version 1) for a user leaving a community or server.
 *
 * @param username - The username of the departing user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param guildIcon - The URL of the community icon.
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_GoodByeV1 = async (username: string, guildName: string, memberCount: number | string, guildIcon: string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === 'number' ? String(memberCount) : memberCount;
  return await requestBuffer('canvas/goodbyev1', { username, guildName, memberCount, guildIcon, avatar, background });
};

/**
 * Generates a goodbye image (version 2) for a user leaving a community or server.
 *
 * @param username - The username of the departing user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_GoodbyeV2 = async (username: string, guildName: string, memberCount: number | string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === 'number' ? String(memberCount) : memberCount;
  return await requestBuffer('canvas/goodbyev2', { username, guildName, memberCount, avatar, background });
};

/**
 * Generates a goodbye image (version 3) for a user leaving a community or server.
 *
 * @param username - The username of the departing user.
 * @param avatar - The URL of the user's avatar.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_GoodbyeV3 = async (username: string, avatar: string): Promise<Buffer> => {
  return await requestBuffer('canvas/goodbyev3', { username, avatar });
};

/**
 * Generates a goodbye image (version 4) for a user leaving a community or server.
 *
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @param description - A custom description or message for the image.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_GoodbyeV4 = async (avatar: string, background: string, description: string): Promise<Buffer> => {
  return await requestBuffer('canvas/goodbyev4', { avatar, background, description });
};

/**
 * Generates a profile card image for a user, typically for community or gaming platforms.
 *
 * @param backgroundURL - The URL of the background image.
 * @param avatarURL - The URL of the user's avatar.
 * @param rankName - The name of the user's rank or role.
 * @param rankId - The ID of the user's rank (number or string).
 * @param requireExp - The experience points required for the next rank (number or string).
 * @param level - The user's current level.
 * @param name - The user's name.
 * @param exp - The user's current experience points (number or string).
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_Profile = async (backgroundURL: string, avatarURL: string, rankName: string, rankId: number | string, requireExp: number | string, level: string, name: string, exp: number | string): Promise<Buffer> => {
  rankId = typeof rankId === 'number' ? String(rankId) : rankId;
  requireExp = typeof requireExp === 'number' ? String(requireExp) : requireExp;
  exp = typeof exp === 'number' ? String(exp) : exp;
  return await requestBuffer('canvas/profile', {
    backgroundURL,
    avatarURL,
    rankName,
    rankId,
    requireExp,
    level,
    name,
    exp,
  });
};

/**
 * Generates a level-up image for a user advancing to a new level.
 *
 * @param backgroundURL - The URL of the background image.
 * @param avatarURL - The URL of the user's avatar.
 * @param fromLevel - The previous level of the user.
 * @param toLevel - The new level of the user.
 * @param name - The user's name.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_LevelUp = async (backgroundURL: string, avatarURL: string, fromLevel: string, toLevel: string, name: string): Promise<Buffer> => {
  return await requestBuffer('canvas/level-up', { backgroundURL, avatarURL, fromLevel, toLevel, name });
};

/**
 * Generates a "ship" image pairing two users or characters with a compatibility percentage.
 *
 * @param avatar1 - The URL of the first user's or character's avatar.
 * @param avatar2 - The URL of the second user's or character's avatar.
 * @param background - The URL of the background image.
 * @param persen - The compatibility percentage (number or string).
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_Ship = async (avatar1: string, avatar2: string, background: string, persen: number | string): Promise<Buffer> => {
  persen = typeof persen === 'number' ? String(persen) : persen;
  return await requestBuffer('canvas/ship', { avatar1, avatar2, background, persen });
};

/**
 * Generates a welcome image (version 1) for a user joining a community or server.
 *
 * @param username - The username of the joining user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param guildIcon - The URL of the community icon.
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_WelcomeV1 = async (username: string, guildName: string, memberCount: number | string, guildIcon: string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === 'number' ? String(memberCount) : memberCount;
  return await requestBuffer('canvas/welcomev1', { username, guildName, memberCount, guildIcon, avatar, background });
};

/**
 * Generates a welcome image (version 2) for a user joining a community or server.
 *
 * @param username - The username of the joining user.
 * @param guildName - The name of the community or server.
 * @param memberCount - The current member count of the community (number or string).
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_WelcomeV2 = async (username: string, guildName: string, memberCount: number | string, avatar: string, background: string): Promise<Buffer> => {
  memberCount = typeof memberCount === 'number' ? String(memberCount) : memberCount;
  return await requestBuffer('canvas/welcomev2', { username, guildName, memberCount, avatar, background });
};

/**
 * Generates a welcome image (version 3) for a user joining a community or server.
 *
 * @param username - The username of the joining user.
 * @param avatar - The URL of the user's avatar.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_WelcomeV3 = async (username: string, avatar: string): Promise<Buffer> => {
  return await requestBuffer('canvas/welcomev3', { username, avatar });
};

/**
 * Generates a welcome image (version 4) for a user joining a community or server.
 *
 * @param avatar - The URL of the user's avatar.
 * @param background - The URL of the background image.
 * @param description - A custom description or message for the image.
 * @returns A promise resolving to the generated image as a Buffer.
 */
export const Canvas_WelcomeV4 = async (avatar: string, background: string, description: string): Promise<Buffer> => {
  return await requestBuffer('canvas/welcomev4', { avatar, background, description });
};

/**
 * Downloads media from an Instagram URL.
 *
 * @param url - The Instagram media URL to download.
 * @returns A promise resolving to the Instagram download data of type IDLInstagram.
 */
export const DLInstagram = async (url: string): Promise<IDLInstagram> => {
  return await request<IDLInstagram>('d/igdl', { url });
};

/**
 * Downloads media from a Twitter (X) URL.
 *
 * @param url - The Twitter media URL to download.
 * @returns A promise resolving to the Twitter download data of type IDLTwitter.
 */
export const DLTwitter = async (url: string): Promise<IDLTwitter> => {
  return await request<IDLTwitter>('d/twitter', { url });
};

/**
 * Downloads music from an Apple Music URL.
 *
 * @param url - The Apple Music URL to download.
 * @returns A promise resolving to the Apple Music download data of type IDLAppleMusic.
 */
export const DLAppleMusic = async (url: string): Promise<IDLAppleMusic> => {
  return await request<IDLAppleMusic>('d/musicapple', { url });
};

/**
 * Downloads media from a Capcut URL.
 *
 * @param url - The Capcut media URL to download.
 * @returns A promise resolving to the Capcut download data of type IDLCapcut.
 */
export const DLCapcut = async (url: string): Promise<IDLCapcut> => {
  return await request<IDLCapcut>('d/capcut', { url });
};

/**
 * Downloads media from a Douyin URL.
 *
 * @param url - The Douyin media URL to download.
 * @returns A promise resolving to the Douyin download data of type IDLDouyin.
 */
export const DLDouyin = async (url: string): Promise<IDLDouyin> => {
  return await request<IDLDouyin>('d/douyin', { url });
};

/**
 * Downloads media from a Facebook URL.
 *
 * @param url - The Facebook media URL to download.
 * @returns A promise resolving to the Facebook download data of type IDLFacebook.
 */
export const DLFacebook = async (url: string): Promise<IDLFacebook> => {
  return await request<IDLFacebook>('d/facebook', { url });
};

/**
 * Downloads a file from a Google Drive URL.
 *
 * @param url - The Google Drive file URL to download.
 * @returns A promise resolving to the Google Drive download data of type IDLGDrive.
 */
export const DLGDrive = async (url: string): Promise<IDLGDrive> => {
  return await request<IDLGDrive>('d/gdrive', { url });
};

/**
 * Downloads a file from a MediaFire URL.
 *
 * @param url - The MediaFire file URL to download.
 * @returns A promise resolving to the MediaFire download data of type IDLMediaFire.
 */
export const DLMediafire = async (url: string): Promise<IDLMediaFire> => {
  return await request<IDLMediaFire>('d/mediafire', { url });
};

/**
 * Downloads media from a Pinterest URL.
 *
 * @param url - The Pinterest media URL to download.
 * @returns A promise resolving to the Pinterest download data of type IDLPinterest.
 */
export const DLPinterest = async (url: string): Promise<IDLPinterest> => {
  return await request<IDLPinterest>('d/pinterest', { url });
};

/**
 * Downloads audio from a SoundCloud URL.
 *
 * @param url - The SoundCloud track URL to download.
 * @returns A promise resolving to the SoundCloud download data of type IDLSoundCloud.
 */
export const DLSoundcloud = async (url: string): Promise<IDLSoundCloud> => {
  return await request<IDLSoundCloud>('d/soundcloud', { url });
};

/**
 * Downloads media from a SnackVideo URL.
 *
 * @param url - The SnackVideo media URL to download.
 * @returns A promise resolving to the SnackVideo download data of type IDLSnackVideo.
 */
export const DLSnackvideo = async (url: string): Promise<IDLSnackVideo> => {
  return await request<IDLSnackVideo>('d/snackvideo', { url });
};

/**
 * Downloads music from a Spotify URL.
 *
 * @param url - The Spotify track or album URL to download.
 * @returns A promise resolving to the Spotify download data of type IDLSpotify.
 */
export const DLSpotify = async (url: string): Promise<IDLSpotify> => {
  return await request<IDLSpotify>('d/spotify', { url });
};

/**
 * Downloads a sticker pack from a Sticker.ly URL.
 *
 * @param url - The Sticker.ly pack URL to download.
 * @returns A promise resolving to the Sticker.ly download data of type IDLStickerLy.
 */
export const DLStickerLy = async (url: string): Promise<IDLStickerLy> => {
  return await request<IDLStickerLy>('d/stickerly', { url });
};

/**
 * Downloads media from a TikTok URL.
 *
 * @param url - The TikTok media URL to download.
 * @returns A promise resolving to the TikTok download data of type IDLTikTok.
 */
export const DLTiktok = async (url: string): Promise<IDLTikTok> => {
  return await request<IDLTikTok>('d/tiktok/v2', { url });
};
