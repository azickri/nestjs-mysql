import * as bcrypt from 'bcrypt';
import * as cryptojs from 'crypto-js';

export class CryptHelper {
  static hashString(value: string) {
    return bcrypt.hash(value, 10);
  }

  static compareString(value: string, hashedValue: string) {
    return bcrypt.compare(value, hashedValue);
  }

  static encryptString(value: string) {
    return cryptojs.AES.encrypt(value, process.env.SECRET_PHASE).toString();
  }

  static decryptString(value: string) {
    return cryptojs.AES.decrypt(value, process.env.SECRET_PHASE).toString(
      cryptojs.enc.Utf8,
    );
  }
}
