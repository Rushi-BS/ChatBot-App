import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

class UserController {
    userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }

    // Method to get all users (/getAllUsers)
    getAllUsers = async (): Promise<User[]> => {
        return await this.userRepo.find();
    }

    // Method to get a user by ID (/getUserById)
    getUserById = async (id: string): Promise<User> => {
        return await this.userRepo.findOneBy({ id: id });
    }

    //Method to get user by email & password
    getUserByEmailAndPassword = async (email: string, hashedPassword: string): Promise<User | undefined> => {
        try {
            const user = await this.userRepo.findOne({
                where: { email: email, hashedPassword: hashedPassword },
            });
            return user;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    // Method to create a new user 
    createUser = async (user: User): Promise<boolean> => {
        try {
            await this.userRepo.save(user);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update a user
    updateUser = async (id: string, userDataToUpdate: User): Promise<boolean> => {
        try {
            let user = await this.userRepo.findOneBy({ id: id });
            if (user) {
                await this.userRepo.update(id, userDataToUpdate);
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
    deleteUser = async (id: string): Promise<boolean> => {
        try {
            let user = await this.userRepo.findOneBy({ id: id });
            if (user) {
                user.isActive = false;
                await this.userRepo.save(user);
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