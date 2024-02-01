import { Request, Response } from "express";
import UserController from "../controllers/UserController";
import ProfileController from "../controllers/ProfileController"
import { User } from "../entities/User";
import { UserProfile } from "../entities/UserProfile";

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

    // Update user profile
    static updateUserProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const { userName, phoneNo, location, profilePhoto } = req.body;

            if (!userId || !userName || !phoneNo || !location || !profilePhoto) {
                res.status(400).json({ message: "Invalid request" });
                return;
            }

            const user = await UserController.getUserById(userId);

            if (!user) {
                throw new Error("User not found");
            }

            // Update user profile properties
            user.userProfile.userName = userName;
            user.userProfile.phoneNo = phoneNo;
            user.userProfile.location = location;
            user.userProfile.profilePhoto = profilePhoto;

            const success = await UserController.updateUser(userId, user);

            if (success) {
                res.status(200).json({ message: "Profile updated successfully" });
            } else {
                throw new Error("Failed to update profile");
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: error.message || "Facing issue at server end. Please try again later!" });
        }
    }

    // Delete user account
    static deleteAccount = (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        
        UserController.deleteUser(userId)
            .then((success) => {
                console.log(success);
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
