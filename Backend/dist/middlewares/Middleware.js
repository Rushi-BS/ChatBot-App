"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataEncryptor_1 = __importDefault(require("../helpers/DataEncryptor"));
class Middleware {
    constructor() {
        this.decryptRequest = (req, res, next) => {
            try {
                if (req.body && req.body.encryptedData) {
                    const decryptedData = this.dataEncryptor.decrypt(req.body.encryptedData);
                    console.log('decrypted data: ', decryptedData);
                    req.body.decryptedData = decryptedData; // Assuming the decrypted data is JSON-formatted
                }
                next();
            }
            catch (error) {
                res.status(400).send('Invalid encrypted data');
            }
        };
        this.dataEncryptor = new DataEncryptor_1.default();
    }
}
exports.default = Middleware;
