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
const User_1 = require("../entities/User");
class UserController {
    constructor() {
        // Method to get all users
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.find();
        });
        // Method to get a user by ID
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.findOneBy({ id: id });
        });
        // Method to create a new user
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepo.save(user);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to update a user
        this.updateUser = (id, userDataToUpdate) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepo.findOneBy({ id: id });
                if (user) {
                    yield this.userRepo.update(id, userDataToUpdate);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to delete a user
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepo.findOneBy({ id: id });
                if (user) {
                    user.isActive = false;
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        this.userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = UserController;
