import { Request, Response } from "express";
import UserController from "../controllers/UserController";
import { User } from "../entities/User";

class UserActions {
    // Sign in user
    static signIn(req: Request, res: Response): void {
        const { email, password } = req.body;

        UserController.getUserByEmailAndPassword(email, password)
            .then((user) => {
                if (user) {
                    res.status(200).json({ message: "Sign in successful", user });
                } else {
                    res.status(401).json({ message: "Invalid email or password" });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            });

    }

    // Sign up user
    static signUp(req: Request, res: Response): void {
        const { email, hashedPassword } = req.body;

        const userData = new User();
        userData.email = email;
        userData.hashedPassword = hashedPassword;
        userData.createdAt = new Date();
        userData.isActive = true;

        UserController.createUser(userData)
            .then((success) => {
                if (success) {
                    res.status(201).json({ message: "Sign up successful" });
                } else {
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
    static updateProfile(req: Request, res: Response): void {
        const userId = req.params.id;
        const updatedUserData = req.body;

        UserController.updateUser(userId, updatedUserData)
            .then((success) => {
                if (success) {
                    res.status(200).json({ message: "Profile updated successfully" });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            });
    }

    // Delete user account
    static deleteAccount(req: Request, res: Response): void {
        const userId = req.params.userId;

        UserController.deleteUser(userId)
            .then((success) => {
                if (success) {
                    res.status(200).json({ message: "Account deleted successfully" });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            });

    }
}

export default UserActions;
