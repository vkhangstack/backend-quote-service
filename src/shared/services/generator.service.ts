import { Injectable } from '@nestjs/common';
import Crypto from 'crypto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public randomBase64(): string {
    return Crypto.createHash('sha256').update(this.uuid()).digest('base64');
  }

  public randomHex(): string {
    return Crypto.createHash('sha256').update(this.uuid()).digest('hex');
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }
}
