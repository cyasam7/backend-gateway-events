import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  encrypt(data: string): string {
    return bcrypt.hashSync(data, 10);
  }
  compare(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
}
