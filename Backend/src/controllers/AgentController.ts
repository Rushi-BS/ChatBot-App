import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Agent } from "../entities/Agent";

const agentRepo: Repository<Agent> = AppDataSource.getRepository(Agent);

class AgentController {
    // Method to get all agents
    static getAllAgents = async (): Promise<Agent[]> => {
        return await agentRepo.find();
    }

    // Method to get an agent by ID
    static getAgentById = async (agentId: string): Promise<Agent> => {
        return await agentRepo.findOneBy({ id: agentId });
    }

    // Method to create a new agent
    static createAgent = async (agentData: Agent): Promise<boolean> => {
        try {
            await agentRepo.save(agentData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing agent
    static updateAgent = async (agentId: string, agentDataToUpdate: Agent): Promise<boolean> => {
        try {
            const agent = await agentRepo.findOneBy({ id: agentId });
            if (agent) {
                await agentRepo.update(agentId, agentDataToUpdate);
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
    static deleteAgent = async (agentId: string): Promise<boolean> => {
        try {
            const agent = await agentRepo.findOneBy({ id: agentId });
            if (agent) {
                await agentRepo.remove(agent);
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