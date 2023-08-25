import { CryptAdapter } from '../crypt';
import * as bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class BcryptAdapter implements CryptAdapter {
  async hash(data: string): Promise<string> {
    const hashedData = await bcrypt.hash(data, 10);

    return hashedData;
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    const result = await bcrypt.compare(data, hashedData);

    return result;
  }
}
