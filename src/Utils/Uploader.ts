import axios from 'axios';
import fileType from 'file-type';
import FormData from 'form-data';

/**
 * Uploads a buffer to a remote server and returns the URL of the uploaded file.
 *
 * Uses FormData to send the buffer as a file to the specified upload endpoint.
 * The file is named with a timestamp and extension based on its MIME type.
 *
 * @param buffer - The buffer containing the file data to upload.
 * @returns A promise resolving to the URL of the uploaded file, or undefined if the upload fails.
 * @throws Logs an error to the console if the upload fails.
 */
export const Uploader = async (buffer: Buffer<ArrayBufferLike>): Promise<string | undefined> => {
  try {
    const mime = await fileType.fromBuffer(buffer);
    const extension = mime?.ext || 'bin';
    const filename = `file-${Date.now()}.${extension}`;

    const form = new FormData();
    form.append('files[]', buffer, filename);

    const response = await axios.post('https://pomf.lain.la/upload.php', form, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
        ...form.getHeaders(),
      },
    });

    return response.data.files[0].url;
  } catch (error) {
    console.error('Upload failed:', error);
    return undefined;
  }
};
