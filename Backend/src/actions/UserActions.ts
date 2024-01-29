import { Request, Response } from "express";
import UserController from "../controllers/UserController";
import { User } from "../entities/User";

class UserActions {
    private userController: UserController;

    constructor() {
        this.userController = new UserController();
    }

    // Sign in user
    signIn(req: Request, res: Response): void {

        const { email, password } = req.body;

        this.userController.getUserByEmailAndPassword(email, password)
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
    signUp(req: Request, res: Response): void {
        const userData: User = req.body;

        this.userController.createUser(userData)
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

    // Update user profile
    updateProfile(req: Request, res: Response): void {
        const userId = parseInt(req.params.id);
        const updatedUserData = req.body;

        this.userController.updateUser(userId, updatedUserData)
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

    deleteAccount(req: Request, res: Response): void {
        const userId = parseInt(req.params.id);

        this.userController.deleteUser(userId)
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

export default UserActions;
