import * as bcrypt from 'bcrypt';
import {PasswordData} from '../constants/interfaces';

export function hashPassword(password: string | undefined, readySalt?: string) {
  return new Promise<PasswordData>(async (resolve, reject) => {
    try {
      const salt = readySalt || await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      return resolve({ password: hashedPassword, key: salt });
    } catch (error) {
      return reject(error);
    }
  });
}
