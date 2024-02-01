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
const Query_1 = require("../entities/Query");
const queryRepo = data_source_1.AppDataSource.getRepository(Query_1.Query);
class QueryController {
}
_a = QueryController;
// Method to get all queries
QueryController.getAllQueries = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield queryRepo.find();
});
// Method to get a query by ID
QueryController.getQueryById = (queryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield queryRepo.findOneBy({ id: queryId });
});
// Method to get all queries of a specific chat
// static getAllQueriesOfChat = async (chatId: string): Promise<Query[]> => {
//     return await queryRepo.find({
//         chatId: chatId,
//     });
// }
// Method to create a new query
QueryController.saveQuery = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield queryRepo.save(queryData);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to update an existing query
QueryController.updateQuery = (queryId, queryDataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield queryRepo.findOneBy({ id: queryId });
        if (query) {
            yield queryRepo.update(queryId, queryDataToUpdate);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to delete a query
QueryController.deleteQuery = (queryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield queryRepo.findOneBy({ id: queryId });
        if (query) {
            yield queryRepo.remove(query);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.default = QueryController;
