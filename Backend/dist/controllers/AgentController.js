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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Agent_1 = require("../entities/Agent");
class AgentController {
    constructor() {
        // Method to get all agents
        this.getAllAgents = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.agentRepo.find();
        });
        // Method to get an agent by ID
        this.getAgentById = (agentId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.agentRepo.findOneBy({ id: agentId });
        });
        // Method to create a new agent
        this.createAgent = (agentData) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.agentRepo.save(agentData);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to update an existing agent
        this.updateAgent = (agentId, agentDataToUpdate) => __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield this.agentRepo.findOneBy({ id: agentId });
                if (agent) {
                    yield this.agentRepo.update(agentId, agentDataToUpdate);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to delete an agent
        this.deleteAgent = (agentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield this.agentRepo.findOneBy({ id: agentId });
                if (agent) {
                    yield this.agentRepo.remove(agent);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        this.agentRepo = data_source_1.AppDataSource.getRepository(Agent_1.Agent);
    }
}
exports.default = AgentController;
