import axios from 'axios';
import { IFluxAI, INyro, NyroFitlers } from '../Types';

export async function FluxAI(prompt: string): Promise<IFluxAI> {
  return await axios
    .post<IFluxAI>(
      'https://fluxai.pro/api/tools/fast',
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; FluxAI-Client/1.0)',
          Accept: 'application/json',
        },
      }
    )
    .then((res) => res.data);
}

export async function Nyro(buffer: Buffer, filter: NyroFitlers): Promise<Buffer> {
  const { data } = await axios.post<INyro>('https://negro.consulting/api/process-image', {
    imageData: buffer.toString('base64'),
    filter,
  });

  return Buffer.from(data.processedImageUrl.split(',')[1], 'base64');
}
