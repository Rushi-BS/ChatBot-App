"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../config"));
const { secret_key, secret_iv, encryption_method } = config_1.default;
class DataEncryptor {
    constructor() {
        this.encrypt = (data) => {
            try {
                const cipher = crypto_1.default.createCipheriv(this.encryptionMethod, this.key, this.encryptionIV);
                return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
            }
            catch (error) {
                throw new Error('Encryption Failed: ' + error);
            }
        };
        this.decrypt = (encryptedData) => {
            try {
                const buff = Buffer.from(encryptedData, 'base64');
                const decipher = crypto_1.default.createDecipheriv(this.encryptionMethod, this.key, this.encryptionIV);
                return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8')); // Decrypts data and converts to utf8
            }
            catch (error) {
                throw new Error('Decryption Failed: ' + error);
            }
        };
        if (!secret_key || !secret_iv || !encryption_method) {
            throw new Error('secretKey, secretIV and encryptionMethod are required');
        }
        // Key and IV generation should be adapted based on the encryptionMethod
        this.key = crypto_1.default
            .createHash('sha512')
            .update(secret_key)
            .digest('hex')
            .substring(0, 32);
        this.encryptionIV = crypto_1.default
            .createHash('sha512')
            .update(secret_iv)
            .digest('hex')
            .substring(0, 16);
        this.encryptionMethod = encryption_method;
    }
}
exports.default = DataEncryptor;
