import { Request, Response } from "express";
import UserController from "../controllers/UserController";
import ProfileController from "../controllers/ProfileController";
import { User } from "../entities/User";
import AuthManager from "../helpers/Auth";

class UserActions {
    // Sign in user
    static signIn = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const user = await UserController.getUserByEmail(email);

            if (user) {
                const isPasswordMatched = await AuthManager.comparePasswords(password, user.hashedPassword);

                if (isPasswordMatched) {
                    const token = AuthManager.generateToken({ userId: user.id, email: user.email });
                    res.json({ message: "Success",
                             results : token });

                } else {
                    res.json({ Error: "Invalid email or password" });
                }
            } else {
                res.json({ Error: "Invalid email or password" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error",
                error: true,
                code: res.statusCode
            });
        }
    };

    // Sign up user
    static signUp = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body;

        try {
            // Check if the email is already in use
            const existingUser = await UserController.getUserByEmailAndPassword(email, password);

            if (existingUser) {
                console.log('Email is already in use.');
                res.status(400).json({ Error: "Email is already in use" });
                return;
            }

            // Hash the password
            const hashedPassword = await AuthManager.hashPassword(password);

            // Create user data
            const userData = new User();
            userData.email = email;
            userData.hashedPassword = hashedPassword;
            userData.createdAt = new Date();
            userData.isActive = true;

            // Create the user
            const success = await UserController.createUser(userData);

            if (success) {
                const token = AuthManager.generateToken({ name, email });
                res.status(201).json({ Status: "Success", token });
            } else {
                res.status(400).json({ Error: "Sign up failed" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error",
                error: true,
                code: res.statusCode
            });
        }
    };

    // Update user profile
    static updateUserProfile = async (req: Request, res: Response): Promise<void> => {
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

            const user = await UserController.getUserById(userId);

            if (!user) {
                throw new Error("User not found");
            }

            user.userProfile.userName = userName;
            user.userProfile.phoneNo = phoneNo;
            user.userProfile.location = location;
            user.userProfile.profilePhoto = profilePhoto;

            const success = await UserController.updateUser(userId, user);

            if (success) {
                res.status(200).json({
                    message: "Profile updated successfully",
                    error: false,
                    code: res.statusCode
                });
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                message: error.message || "Facing issue at server end. Please try again later!",
                error: true,
                code: res.statusCode
            });
        }
    }

    // Delete user account
    static deleteAccount = async (req: Request, res: Response): Promise<void> => {
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

            const success = await UserController.deleteUser(userId);

            if (success) {
                res.status(200).json({
                    message: "Account deleted successfully",
                    error: false,
                    code: res.statusCode
                });
            } else {
                res.status(404).json({
                    message: "User not found",
                    error: true,
                    code: res.statusCode
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error",
                error: true,
                code: res.statusCode
            });
        }
    }

  // Logout user
  static logout = async (req: Request, res: Response): Promise<void> => {
    try {

        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            code: res.statusCode
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            code: res.statusCode
        });
    }
};
}

export default UserActions;
