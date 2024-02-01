import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Response } from "../entities/Response";

const responseRepo: Repository<Response> = AppDataSource.getRepository(Response);

class ResponseController {
    // Method to get all responses
    static getAllResponses = async (): Promise<Response[]> => {
        return await responseRepo.find();
    }

    // Method to get a response by ID
    static getResponseById = async (responseId: string): Promise<Response> => {
        return await responseRepo.findOneBy({ id: responseId});
    }

    // Method to create a new response
    static saveResponse = async (responseData: Response): Promise<boolean> => {
        try {
            await responseRepo.save(responseData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing response
    static updateResponse = async (responseId: string, responseDataToUpdate: Response): Promise<boolean> => {
        try {
            const response = await responseRepo.findOneBy({ id: responseId});
            if (response) {
                await responseRepo.update(responseId, responseDataToUpdate);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to delete a response
    static deleteResponse = async (responseId: string): Promise<boolean> => {
        try {
            const response = await responseRepo.findOneBy({ id: responseId});
            if (response) {
                await responseRepo.remove(response);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default ResponseController;