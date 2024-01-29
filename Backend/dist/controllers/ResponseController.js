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
const Chat_1 = require("../entities/Chat");
class ResponseController {
    constructor() {
        // Method to get all responses
        this.getAllResponses = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.responseRepo.find();
        });
        // Method to get a response by ID
        this.getResponseById = (responseId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.responseRepo.findOneBy({ id: responseId });
        });
        // Method to create a new response
        this.createResponse = (responseData) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.responseRepo.save(responseData);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to update an existing response
        this.updateResponse = (responseId, responseDataToUpdate) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.responseRepo.findOneBy({ id: responseId });
                if (response) {
                    yield this.responseRepo.update(responseId, responseDataToUpdate);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to delete a response
        this.deleteResponse = (responseId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.responseRepo.findOneBy({ id: responseId });
                if (response) {
                    yield this.responseRepo.remove(response);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        this.responseRepo = data_source_1.AppDataSource.getRepository(Chat_1.Response);
    }
}
exports.default = ResponseController;
