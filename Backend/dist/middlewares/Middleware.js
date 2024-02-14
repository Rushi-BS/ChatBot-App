"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataEncryptor_1 = __importDefault(require("../helpers/DataEncryptor"));
const Auth_1 = __importDefault(require("../helpers/Auth"));
const jsonwebtoken_1 = require("jsonwebtoken"); // Importing 'jsonwebtoken' and 'TokenExpiredError'
class Middleware {
    static decryptRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body && req.body.encryptedData) {
                    const decryptedData = Middleware.dataEncryptor.decrypt(req.body.encryptedData);
                    console.log('decrypted data: ', decryptedData);
                    req.body.decryptedData = decryptedData; // Assuming the decrypted data is JSON-formatted
                }
                next();
            }
            catch (error) {
                res.status(400).send('Invalid encrypted data');
            }
        });
    }
    static jwtMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenHeader = req.headers.authorization;
            //console.log('Headers:', req.headers)
            console.log('Received Token1:', tokenHeader);
            if (!tokenHeader) {
                return res.status(401).json({ Error: 'Unauthorized - Missing token' });
            }
            const token = tokenHeader.split(' ')[1];
            console.log('Received Token2:', token);
            try {
                const decoded = yield Auth_1.default.verifyToken(token);
                req.user = decoded;
                next();
            }
            catch (tokenError) {
                console.error('JWT Verification Error:', tokenError);
                if (tokenError instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res.status(401).json({ Error: 'Unauthorized - Token expired' });
                }
                return res.status(401).json({ Error: 'Unauthorized - Invalid token' });
            }
        });
    }
}
Middleware.dataEncryptor = new DataEncryptor_1.default();
exports.default = Middleware;
