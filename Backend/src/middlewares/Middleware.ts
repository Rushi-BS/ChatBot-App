import { NextFunction, Request, Response } from "express";
import DataEncryptor from "../helpers/DataEncryptor";
import AuthManager  from "../helpers/Auth"

class Middleware {
    dataEncryptor: DataEncryptor;
    
    constructor() {
        this.dataEncryptor = new DataEncryptor();
    }

    decryptRequest = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body && req.body.encryptedData) {
                const decryptedData = this.dataEncryptor.decrypt(req.body.encryptedData);
                console.log('decrypted data: ', decryptedData);
                req.body.decryptedData = decryptedData; // Assuming the decrypted data is JSON-formatted
            }
            next();
        } catch (error) {
            res.status(400).send('Invalid encrypted data');
        }
    }

    jwtMiddleware = async (req: any, res: any, next: any) => {
        const token = req.headers.authorization;
    
        if (!token) {
            return res.status(401).json({ Error: "Unauthorized - Missing token" });
        }
    
        try {
            const decoded = await AuthManager.verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ Error: "Unauthorized - Invalid token" });
        }
    };
}

export default Middleware;