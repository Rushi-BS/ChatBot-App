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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Response_1 = require("../entities/Response");
const responseRepo = data_source_1.AppDataSource.getRepository(Response_1.Response);
class ResponseController {
}
_a = ResponseController;
// Method to get all responses
ResponseController.getAllResponses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield responseRepo.find();
});
// Method to get a response by ID
ResponseController.getResponseById = (responseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield responseRepo.findOneBy({ id: responseId });
});
// Method to create a new response
ResponseController.saveResponse = (responseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield responseRepo.save(responseData);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to update an existing response
ResponseController.updateResponse = (responseId, responseDataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield responseRepo.findOneBy({ id: responseId });
        if (response) {
            yield responseRepo.update(responseId, responseDataToUpdate);
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
ResponseController.deleteResponse = (responseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield responseRepo.findOneBy({ id: responseId });
        if (response) {
            yield responseRepo.remove(response);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.default = ResponseController;
