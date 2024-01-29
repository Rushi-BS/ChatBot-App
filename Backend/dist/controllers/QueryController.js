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
class QueryController {
    constructor() {
        // Method to get all queries
        this.getAllQueries = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.queryRepo.find();
        });
        // Method to get a query by ID
        this.getQueryById = (queryId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.queryRepo.findOneBy({ id: queryId });
        });
        // Method to create a new query
        this.createQuery = (queryData) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.queryRepo.save(queryData);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to update an existing query
        this.updateQuery = (queryId, queryDataToUpdate) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield this.queryRepo.findOneBy({ id: queryId });
                if (query) {
                    yield this.queryRepo.update(queryId, queryDataToUpdate);
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
        this.deleteQuery = (queryId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield this.queryRepo.findOneBy({ id: queryId });
                if (query) {
                    yield this.queryRepo.remove(query);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        this.queryRepo = data_source_1.AppDataSource.getRepository(Chat_1.Query);
    }
}
exports.default = QueryController;
