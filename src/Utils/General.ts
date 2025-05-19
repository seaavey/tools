import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const question = (text: string): Promise<string> => new Promise((res) => rl.question(text, (answer) => res(answer)));

/**
 * Delays the execution for a specified amount of time.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay time.
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Formats an object into a JSON string with indentation for better readability.
 *
 * @param {Object} obj - The object to format.
 * @returns {string} A stringified version of the object with indentation.
 */
export const jsonformat = (obj: Object) => JSON.stringify(obj, null, 2);

/**
 * Extracts all URLs from a string using regular expression.
 *
 * @param {string} str - The string from which to extract URLs.
 * @returns {string[] | null} An array of URLs found in the string, or null if no URLs are found.
 */
export const StringToURL = (str: string) => str.match(/\bhttps?:\/\/\S+/gi);

/**
 * Converts a given string to uppercase.
 *
 * @param {string} str - The string to convert to uppercase.
 * @returns {string} The input string converted to uppercase.
 */
export const toUpper = (str: string) => str.toUpperCase();

/**
 * Converts a given string to lowercase.
 *
 * @param {string} str - The string to convert to lowercase.
 * @returns {string} The input string converted to lowercase.
 */
export const toLower = (str: string) => str.toLowerCase();

/**
 * Selects a random element from an array.
 *
 * @param {any[]} arr - The array from which to pick a random element.
 * @returns {any} A random element from the array.
 */
export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The input string to be capitalized.
 * @returns {string} A new string with the first letter converted to uppercase.
 */
export const Capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Computes a CRC-16 checksum for a given string and returns it as a 4-digit uppercase hexadecimal string.
 *
 * The CRC-16 algorithm uses the CCITT polynomial (0x1021) with an initial value of 0xFFFF.
 * Each character is processed bit-by-bit to generate the checksum.
 *
 * @param str - The input string to compute the CRC-16 checksum for.
 * @returns A 4-digit uppercase hexadecimal string representing the CRC-16 checksum (e.g., 'A1B2').
 */
export const convertCRC16 = (str: string): string => {
  let crc = 0xffff;

  for (const char of str) {
    crc ^= char.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }

  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Converts a byte value into a human-readable string with appropriate units.
 *
 * Formats the input bytes into a string with units (B, KB, MB, GB, TB) using base-1024.
 * Returns '0 B' for zero bytes and rounds non-zero values to two decimal places.
 *
 * @param bytes - The number of bytes to format (non-negative).
 * @returns A string representing the formatted bytes (e.g., '1.50 MB').
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const base = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const value = bytes / base ** i;

  return `${value.toFixed(2)} ${units[i]}`;
};

/**
 * Generates a formatted filename with a prefix, date, random number, and optional extension.
 *
 * Creates a filename based on the provided file extension, using prefixes like 'IMG', 'VID', 'AUD',
 * or 'FILE'. The format includes the current date (YYYYMMDD) and a padded random number.
 *
 * @param ext - The file extension (e.g., 'png', 'mp4'). Case-insensitive.
 * @returns A formatted filename string (e.g., 'IMG-20250505-SE1234.png' or 'FILE-20250505-SE1234').
 */
export const getRandom = (ext: string): string => {
  ext = ext.replace(/^\./, ''); // Remove leading dot if present
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const num = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  const lower = ext.toLowerCase();

  const map: Record<string, string> = {
    png: 'IMG',
    jpg: 'IMG',
    jpeg: 'IMG',
    webp: 'IMG',
    mp4: 'VID',
    mkv: 'VID',
    mov: 'VID',
    mp3: 'AUD',
    wav: 'AUD',
    ogg: 'AUD',
    m4a: 'AUD',
  };

  const prefix = map[lower] || 'FILE';
  const extension = ext ? `.${ext}` : '';

  return `${prefix}-${ymd}-SE${num}${extension}`;
};
