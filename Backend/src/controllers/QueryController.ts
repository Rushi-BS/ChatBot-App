import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Query } from "../entities/Chat";

const queryRepo: Repository<Query> = AppDataSource.getRepository(Query);

class QueryController {
    // Method to get all queries
    static getAllQueries = async (): Promise<Query[]> => {
        return await queryRepo.find();
    }

    // Method to get a query by ID
    static getQueryById = async (queryId: string): Promise<Query> => {
        return await queryRepo.findOneBy({id: queryId});
    }

    // Method to create a new query
    static createQuery = async (queryData: Query): Promise<boolean> => {
        try {
            await queryRepo.save(queryData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing query
    static updateQuery = async (queryId: string, queryDataToUpdate: Query): Promise<boolean> => {
        try {
            const query = await queryRepo.findOneBy({id: queryId});
            if (query) {
                await queryRepo.update(queryId, queryDataToUpdate);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to delete a query
    static deleteQuery = async (queryId: string): Promise<boolean> => {
        try {
            const query = await queryRepo.findOneBy({id: queryId});
            if (query) {
                await queryRepo.remove(query);
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

export default QueryController;
