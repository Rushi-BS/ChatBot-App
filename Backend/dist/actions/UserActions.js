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
const Auth_1 = __importDefault(require("../helpers/Auth"));
class UserActions {
}
_a = UserActions;
// Sign in user
UserActions.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserController_1.default.getUserByEmail(email);
        if (user) {
            const isPasswordMatched = yield Auth_1.default.comparePasswords(password, user.hashedPassword);
            if (isPasswordMatched) {
                const token = Auth_1.default.generateToken({ userId: user.id, email: user.email });
                res.json({ message: "Success",
                    results: token });
            }
            else {
                res.json({ Error: "Invalid email or password" });
            }
        }
        else {
            res.json({ Error: "Invalid email or password" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            code: res.statusCode
        });
    }
});
// Sign up user
UserActions.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // Check if the email is already in use
        const existingUser = yield UserController_1.default.getUserByEmailAndPassword(email, password);
        if (existingUser) {
            console.log('Email is already in use.');
            res.status(400).json({ Error: "Email is already in use" });
            return;
        }
        // Hash the password
        const hashedPassword = yield Auth_1.default.hashPassword(password);
        // Create user data
        const userData = new User_1.User();
        userData.email = email;
        userData.hashedPassword = hashedPassword;
        userData.createdAt = new Date();
        userData.isActive = true;
        // Create the user
        const success = yield UserController_1.default.createUser(userData);
        if (success) {
            const token = Auth_1.default.generateToken({ name, email });
            res.status(201).json({ Status: "Success", token });
        }
        else {
            res.status(400).json({ Error: "Sign up failed" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            code: res.statusCode
        });
    }
});
// Update user profile
UserActions.updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { userName, phoneNo, location, profilePhoto } = req.body;
        if (!userId || !userName || !phoneNo || !location || !profilePhoto) {
            res.status(400).json({
                message: "Invalid request",
                error: true,
                code: res.statusCode
            });
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
            res.status(200).json({
                message: "Profile updated successfully",
                error: false,
                code: res.statusCode
            });
        }
        else {
            throw new Error("Failed to update profile");
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message || "Facing issue at server end. Please try again later!",
            error: true,
            code: res.statusCode
        });
    }
});
// Delete user account
UserActions.deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!userId) {
            res.status(400).json({
                message: "Invalid request",
                error: true,
                code: res.statusCode
            });
            return;
        }
        const success = yield UserController_1.default.deleteUser(userId);
        if (success) {
            res.status(200).json({
                message: "Account deleted successfully",
                error: false,
                code: res.statusCode
            });
        }
        else {
            res.status(404).json({
                message: "User not found",
                error: true,
                code: res.statusCode
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            code: res.statusCode
        });
    }
});
// Logout user
UserActions.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            code: res.statusCode
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            code: res.statusCode
        });
    }
});
exports.default = UserActions;
