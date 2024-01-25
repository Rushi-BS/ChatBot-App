import crypto from 'crypto';
import config from '../config';

const { secret_key, secret_iv, encryption_method } = config;

class DataEncryptor {
  private key: string;
  private encryptionIV: string;
  private encryptionMethod: string;

  constructor() {
    if (!secret_key || !secret_iv || !encryption_method) {
      throw new Error('secretKey, secretIV and encryptionMethod are required');
    }

    // Key and IV generation should be adapted based on the encryptionMethod
    this.key = crypto
      .createHash('sha512')
      .update(secret_key)
      .digest('hex')
      .substring(0, 32);

    this.encryptionIV = crypto
      .createHash('sha512')
      .update(secret_iv)
      .digest('hex')
      .substring(0, 16);

    this.encryptionMethod = encryption_method;
  }

  encrypt = (data: string) => {
    try {
      const cipher = crypto.createCipheriv(this.encryptionMethod, this.key, this.encryptionIV);
      return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
      ).toString('base64') // Encrypts data and converts to hex and base64
    } catch (error) {
      throw new Error('Encryption Failed: ' + error);
    }
  }

  decrypt = (encryptedData: string) => {
    try {
      const buff = Buffer.from(encryptedData, 'base64')
      const decipher = crypto.createDecipheriv(this.encryptionMethod, this.key, this.encryptionIV)
      return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8')
      ) // Decrypts data and converts to utf8
    } catch (error) {
      throw new Error('Decryption Failed: ' + error);
    }
  }
}

export default DataEncryptor;