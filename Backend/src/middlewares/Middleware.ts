import { NextFunction, Request, Response } from 'express';
import DataEncryptor from '../helpers/DataEncryptor';
import AuthManager from '../helpers/Auth';
import jwt, { TokenExpiredError } from 'jsonwebtoken'; // Importing 'jsonwebtoken' and 'TokenExpiredError'

class Middleware {
    private static dataEncryptor = new DataEncryptor();

    static async decryptRequest(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body && req.body.encryptedData) {
                const decryptedData = Middleware.dataEncryptor.decrypt(req.body.encryptedData);
                console.log('decrypted data: ', decryptedData);
                req.body.decryptedData = decryptedData; // Assuming the decrypted data is JSON-formatted
            }
            next();
        } catch (error) {
            res.status(400).send('Invalid encrypted data');
        }
    }

    static async jwtMiddleware(req: any, res: any, next: any) {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader) {
            return res.status(401).json({ Error: 'Unauthorized - Missing token' });
        }

        const token = tokenHeader.split(' ')[1];

        try {
            const decoded = await AuthManager.verifyToken(token);
            req.user = decoded;
            next();
        } catch (tokenError) {
            console.error('JWT Verification Error:', tokenError);

            if (tokenError instanceof TokenExpiredError) {
                return res.status(401).json({ Error: 'Unauthorized - Token expired' });
            }

            return res.status(401).json({ Error: 'Unauthorized - Invalid token' });
        }
    }
}

export default Middleware;
