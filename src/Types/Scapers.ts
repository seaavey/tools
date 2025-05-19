export type NyroFitlers = 'coklat' | 'hitam' | 'nerd' | 'piggy' | 'carbon' | 'botak';
export type Styless = 'default' | 'realistic' | 'anime' | 'ghibli' | 'cartoon' | '3d' | 'fantasy' | 'chibi' | 'superhero' | 'cyberpunk' | 'disney' | 'pokemon' | 'dnd art' | 'furry art' | 'villain' | 'pixel art' | 'sailor moon' | 'npc';
export type Aspects = '1:1' | '2:3' | '3:2' | '9:16';

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

export interface ITiktok {
  id: number;
  title: string;
  url: string;
  created_at: string;
  stats: {
    likeCount: number;
    commentCount: number;
    shareCount: number;
    playCount: number;
    saveCount: number;
  };
  video: {
    noWatermark: string;
    cover: string;
    dynamic_cover: string;
    origin_cover: string;
    width: number;
    height: number;
    durationFormatted: string;
    duration: number;
    ratio: string;
  };
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  music: {
    id: number;
    title: string;
    author: string;
    cover_hd: any;
    cover_large: string;
    cover_medium: string;
    cover_thumb: string;
    durationFormatted: string;
    duration: number;
    play_url: string;
  };
  author: {
    id: string;
    name: string;
    unique_id: string;
    signature: string;
    avatar: string;
    avatar_thumb: string;
  };
}
