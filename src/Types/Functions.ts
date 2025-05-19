import { Readable } from 'stream';

export interface IFunction {
  question: () => Promise<string>;
  delay: (ms: number) => Promise<unknown>;
  jsonformat: (obj: object) => string;
  StringToURL: (str: string) => RegExpMatchArray | null;
  toUpper: (str: string) => string;
  toLower: (str: string) => string;
  pickRandom: (arr: any[]) => any;
  Capitalize: (str: string) => string;
  convertCRC16: (str: string) => string;
  formatBytes: (bytes: number) => string;
  getRandom: (ext: string) => string;

  toBuffer: (stream: Readable) => Promise<Buffer>;
  toStream: (buffer: Buffer) => Readable;
  FBuffer: (url: string, options?: { headers?: Record<string, string> }) => Promise<{ buffer: Buffer; filename: string; mimetype: string; ext: string; size: string }>;
  FJson: (url: string, options?: { headers?: Record<string, string> }) => Promise<JSON>;
  Uploader: (buffer: Buffer<ArrayBufferLike>) => Promise<string | undefined>;

  Chiper: (options: ChiperOptions) => IChiper;
  Cooldown: (cooldown: number) => ICooldown;
}

export interface ChiperOptions {
  algorithm: 'aes-256-ctr' | 'aes-128-ctr' | 'aes-256-cbc';
  key?: string;
  salt?: string;
}
export declare class IChiper {
  private algorithm;
  private secretKey;
  private iv;
  constructor(options: ChiperOptions);
  encrypt(text: string): string;
  decrypt(encryptedText: string): string;
}

export interface CooldownEntry {
  _id: string;
  timer: number;
}

export interface CooldownResult {
  state: boolean;
}

export declare class ICooldown {
  private cooldown;
  private cooldownList;
  constructor(cooldown: number);
  private find;
  private pushId;
  hold(id: string, delay?: number): CooldownResult;
  check(id: string): CooldownResult;
}
