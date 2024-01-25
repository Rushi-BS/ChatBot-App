import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Agent } from "../entities/Agent";

class AgentController {
    agentRepo: Repository<Agent>;

    constructor() {
        this.agentRepo = AppDataSource.getRepository(Agent);
    }

    // Method to get all agents
    getAllAgents = async (): Promise<Agent[]> => {
        return await this.agentRepo.find();
    }

    // Method to get an agent by ID
    getAgentById = async (agentId: number): Promise<Agent> => {
        return await this.agentRepo.findOneBy({ id: agentId });
    }

    // Method to create a new agent
    createAgent = async (agentData: Agent): Promise<boolean> => {
        try {
            await this.agentRepo.save(agentData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing agent
    updateAgent = async (agentId: number, agentDataToUpdate: Agent): Promise<boolean> => {
        try {
            const agent = await this.agentRepo.findOneBy({ id: agentId});
            if (agent) {
                await this.agentRepo.update(agentId, agentDataToUpdate);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to delete an agent
    deleteAgent = async (agentId: number): Promise<boolean> => {
        try {
            const agent = await this.agentRepo.findOneBy({ id: agentId});
            if (agent) {
                await this.agentRepo.remove(agent);
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

export default AgentController;