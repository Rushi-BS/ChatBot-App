import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

class UserController {
    userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }

    // Method to get all users
    getAllUsers = async (): Promise<User[]> => {
        return await this.userRepo.find();
    }

    // Method to get a user by ID
    getUserById = async (id: number): Promise<User> => {
        return await this.userRepo.findOneBy({ id: id });
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
    updateUser = async (id: number, userDataToUpdate: User): Promise<boolean> => {
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
    deleteUser = async (id: number): Promise<boolean> => {
        try {
            let user = await this.userRepo.findOneBy({ id: id });
            if (user) {
                user.isActive = false;
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