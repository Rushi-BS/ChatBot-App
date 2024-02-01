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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
const User_1 = require("../entities/User");
class UserActions {
    // Sign in user
    static signIn(req, res) {
        const { email, password } = req.body;
        UserController_1.default.getUserByEmailAndPassword(email, password)
            .then((user) => {
            if (user) {
                res.status(200).json({ message: "Sign in successful", user });
            }
            else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        })
            .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        });
    }
    // Sign up user
    static signUp(req, res) {
        const { email, hashedPassword } = req.body;
        const userData = new User_1.User();
        userData.email = email;
        userData.hashedPassword = hashedPassword;
        userData.createdAt = new Date();
        userData.isActive = true;
        UserController_1.default.createUser(userData)
            .then((success) => {
            if (success) {
                res.status(201).json({ message: "Sign up successful" });
            }
            else {
                res.status(400).json({ message: "Sign up failed" });
            }
        })
            .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        });
    }
}
_a = UserActions;
// Update user profile
UserActions.updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { userName, phoneNo, location, profilePhoto } = req.body;
        if (!userId || !userName || !phoneNo || !location || !profilePhoto) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        const user = yield UserController_1.default.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.userProfile.userName = userName;
        user.userProfile.phoneNo = phoneNo;
        user.userProfile.location = location;
        user.userProfile.profilePhoto = profilePhoto;
        const success = yield UserController_1.default.updateUser(userId, user);
        if (success) {
            res.status(200).json({ message: "Profile updated successfully" });
        }
        else {
            throw new Error("Failed to update profile");
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message || "Facing issue at server end. Please try again later!" });
    }
});
// Delete user account
UserActions.deleteAccount = (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }
    UserController_1.default.deleteUser(userId)
        .then((success) => {
        console.log(success);
        if (success) {
            res.status(200).json({ message: "Account deleted successfully" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    })
        .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    });
};
exports.default = UserActions;
