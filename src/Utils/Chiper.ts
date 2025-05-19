import crypto from 'crypto';
import { ChiperOptions } from '../Types';

export class Chiper {
  private algorithm: 'aes-256-ctr' | 'aes-128-ctr' | 'aes-256-cbc';
  private secretKey: Buffer;
  private iv: Buffer;

  constructor(options: ChiperOptions) {
    this.algorithm = options.algorithm;
    this.secretKey = crypto
      .createHash('sha256')
      .update(options.key || 'seaavey')
      .digest();
    this.iv = crypto.randomBytes(16);
  }

  public encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return `${this.iv.toString('base64')}.${encrypted}`;
  }

  public decrypt(encryptedText: string): string {
    const [iv, encrypted] = encryptedText.split('.');
    const ivBuffer = Buffer.from(iv, 'base64');
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, ivBuffer);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
