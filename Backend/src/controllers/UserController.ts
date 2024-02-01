import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepo: Repository<User> = AppDataSource.getRepository(User);

class UserController {
    // Method to get all users 
    static getAllUsers = async (): Promise<User[]> => {
        return await userRepo.find();
    }

    // Method to get a user by ID 
    static getUserById = async (id: string): Promise<User> => {
        return await userRepo.findOne(
            {
                where: { id: id },
                relations: { userProfile: true }
            });
    }

    //Method to get user by email & password
    static getUserByEmailAndPassword = async (email: string, hashedPassword: string): Promise<User | undefined> => {
        try {
            const user = await userRepo.findOne({
                where: { email: email, hashedPassword: hashedPassword },
            });
            return user;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    // Method to create a new user 
    static createUser = async (user: User): Promise<boolean> => {
        try {
            await userRepo.save(user);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update a user
    static updateUser = async (id: string, userDataToUpdate: User): Promise<boolean> => {
        try {
            let user = await UserController.getUserById(id);
            if (user) {
                await userRepo.save(userDataToUpdate);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to delete a user
    static deleteUser = async (id: string): Promise<boolean> => {
        try {
            let user = await UserController.getUserById(id);
            if (user) {
                user.isActive = false;
                await userRepo.save(user);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default UserController;