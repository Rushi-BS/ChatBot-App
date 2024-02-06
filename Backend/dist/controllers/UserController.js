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
const User_1 = require("../entities/User");
const UserProfile_1 = require("../entities/UserProfile");
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
class UserController {
}
_a = UserController;
// Method to get all users 
UserController.getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepo.find();
});
// Method to get a user by ID 
UserController.getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepo.findOne({
        where: { id: id },
        relations: { userProfile: true }
    });
});
//Method to get user by email & password
UserController.getUserByEmailAndPassword = (email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepo.findOne({
            where: { email: email, hashedPassword: hashedPassword },
        });
        return user;
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
});
//Method to get user by email
UserController.getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepo.findOne({
            where: { email: email },
        });
        return user;
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
});
// Method to create a new user 
UserController.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user.userProfile = new UserProfile_1.UserProfile();
        yield userRepo.save(user);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to update a user
UserController.updateUser = (id, userDataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield _a.getUserById(id);
        if (user) {
            yield userRepo.save(userDataToUpdate);
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
UserController.deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield _a.getUserById(id);
        if (user) {
            user.isActive = false;
            yield userRepo.save(user);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.default = UserController;
