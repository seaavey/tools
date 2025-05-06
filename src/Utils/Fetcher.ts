import { Readable } from 'stream';
import axios from 'axios';
import mimes from 'mime-types';
import fileType from 'file-type';
import FormData from 'form-data';
import { formatBytes } from './General';

/**
 * Converts a Readable stream into a single Buffer by collecting all chunks.
 * @param stream - The Readable stream to convert.
 * @returns A Promise that resolves to a Buffer containing the concatenated stream data.
 * @remarks The stream is destroyed after processing to free up resources.
 */
export const toBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  stream.destroy();
  return Buffer.concat(chunks);
};

/**
 * Converts a Buffer into a Readable stream.
 * @param buffer - The Buffer to convert into a stream.
 * @returns A Readable stream that emits the Buffer's contents.
 */
export const toStream = (buffer: Buffer): Readable => Readable.from(buffer);

/**
 * Fetches a resource from a URL and returns its buffer with metadata.
 *
 * Performs an HTTP GET request using axios, converts the response stream to a buffer,
 * and extracts filename, MIME type, and extension.
 *
 * @param url - The URL to fetch.
 * @param options - Optional headers for the request.
 * @returns A promise resolving to an object with buffer, filename, mimetype, and ext.
 * @throws Rejects with an error if the request fails or the response is not a stream.
 * @returns {Promise<{ buffer: Buffer; filename: string; mimetype: string; ext: string; size: string }>} An object containing the buffer, filename, MIME type, extension, and size of the fetched resource.
 */
export const FBuffer = async (
  url: string,
  options?: { headers?: Record<string, string> }
): Promise<{
  buffer: Buffer;
  filename: string;
  mimetype: string;
  ext: string;
  size: string;
}> => {
  const response = await axios.get(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
      ...(options?.headers || {}),
    },
    responseType: 'stream',
    ...options,
  });

  const size = await formatBytes(parseInt(response.headers['content-length'] || '0'));
  const buffer = await toBuffer(response.data);
  const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/['"]/g, '') || 'unknown';
  const mimetype = mimes.lookup(filename) || (await fileType.fromBuffer(buffer))?.mime || 'application/octet-stream';
  const ext = mimes.extension(mimetype) || (await fileType.fromBuffer(buffer))?.ext || 'bin';

  return { buffer, filename, mimetype, ext, size };
};

/**
 * Fetches JSON data from a specified URL using an HTTP GET request.
 *
 * Sends a GET request to the provided URL with optional custom headers and returns the parsed JSON response.
 *
 * @param url - The URL to fetch JSON data from.
 * @param options - Optional configuration object with custom headers.
 * @returns A promise resolving to the parsed JSON data (any type).
 * @throws Rejects with an error if the request or JSON parsing fails.
 * @returns {Promise<JSON>} A promise that resolves to the parsed JSON data.
 */
export const FJson = async (url: string, options?: { headers?: Record<string, string> }): Promise<JSON> => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
        ...(options?.headers || {}),
      },
      ...options,
      responseType: 'json',
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
  }
};
