import { NextFunction, Request, Response } from "express";
import DataEncryptor from "../helpers/DataEncryptor";

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
}

export default Middleware;