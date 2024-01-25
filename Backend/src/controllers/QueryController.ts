import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Query } from "../entities/Chat";

class QueryController {
    queryRepo: Repository<Query>;

    constructor() {
        this.queryRepo = AppDataSource.getRepository(Query);
    }

    // Method to get all queries
    getAllQueries = async (): Promise<Query[]> => {
        return await this.queryRepo.find();
    }

    // Method to get a query by ID
    getQueryById = async (queryId: number): Promise<Query> => {
        return await this.queryRepo.findOneBy({id: queryId});
    }

    // Method to create a new query
    createQuery = async (queryData: Query): Promise<boolean> => {
        try {
            await this.queryRepo.save(queryData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing query
    updateQuery = async (queryId: number, queryDataToUpdate: Query): Promise<boolean> => {
        try {
            const query = await this.queryRepo.findOneBy({id: queryId});
            if (query) {
                await this.queryRepo.update(queryId, queryDataToUpdate);
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
    deleteQuery = async (queryId: number): Promise<boolean> => {
        try {
            const query = await this.queryRepo.findOneBy({id: queryId});
            if (query) {
                await this.queryRepo.remove(query);
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
