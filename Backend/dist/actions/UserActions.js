"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
    // TODO: Check update logic
    // Update user profile
    static updateProfile(req, res) {
        const userId = req.params.id;
        const updatedUserData = req.body;
        UserController_1.default.updateUser(userId, updatedUserData)
            .then((success) => {
            if (success) {
                res.status(200).json({ message: "Profile updated successfully" });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        })
            .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        });
    }
    // Delete user account
    static deleteAccount(req, res) {
        const userId = req.params.userId;
        UserController_1.default.deleteUser(userId)
            .then((success) => {
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
    }
}
exports.default = UserActions;
