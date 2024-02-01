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
const UserProfile_1 = require("../entities/UserProfile");
const profileRepo = data_source_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
class ProfileController {
}
_a = ProfileController;
// Method to get all profiles 
ProfileController.getAllProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield profileRepo.find();
});
// Method to get a profile by ID 
ProfileController.getProfileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield profileRepo.findOneBy({ id: id });
});
// Method to create a new profile 
ProfileController.saveProfile = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield profileRepo.save(profile);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to update a profile
ProfileController.updateProfile = (id, profileDataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profile = yield profileRepo.findOneBy({ id: id });
        if (profile) {
            yield profileRepo.update(id, profileDataToUpdate);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to delete a profile
ProfileController.deleteProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profileRepo.findOneBy({ id: id });
        if (profile) {
            yield profileRepo.remove(profile);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.default = ProfileController;
