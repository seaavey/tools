export type NyroFitlers = 'coklat' | 'hitam' | 'nerd' | 'piggy' | 'carbon' | 'botak';

export interface IFluxAI {
  ok: boolean;
  data: {
    imageUrl: string;
  };
}

export interface INyro {
  status: string;
  processedImageUrl: string;
}
