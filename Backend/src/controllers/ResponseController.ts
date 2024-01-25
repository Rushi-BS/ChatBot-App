import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Response } from "../entities/Chat";

class ResponseController {
    responseRepo: Repository<Response>;

    constructor() {
        this.responseRepo = AppDataSource.getRepository(Response);
    }

    // Method to get all responses
    getAllResponses = async (): Promise<Response[]> => {
        return await this.responseRepo.find();
    }

    // Method to get a response by ID
    getResponseById = async (responseId: number): Promise<Response> => {
        return await this.responseRepo.findOneBy({ id: responseId});
    }

    // Method to create a new response
    createResponse = async (responseData: Response): Promise<boolean> => {
        try {
            await this.responseRepo.save(responseData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing response
    updateResponse = async (responseId: number, responseDataToUpdate: Response): Promise<boolean> => {
        try {
            const response = await this.responseRepo.findOneBy({ id: responseId});
            if (response) {
                await this.responseRepo.update(responseId, responseDataToUpdate);
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
    deleteResponse = async (responseId: number): Promise<boolean> => {
        try {
            const response = await this.responseRepo.findOneBy({ id: responseId});
            if (response) {
                await this.responseRepo.remove(response);
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