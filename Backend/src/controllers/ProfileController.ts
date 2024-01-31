import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserProfile } from "../entities/User";

const profileRepo: Repository<UserProfile> = AppDataSource.getRepository(UserProfile);

class ProfileController {
    // Method to get all profiles 
    static getAllProfiles = async (): Promise<UserProfile[]> => {
        return await profileRepo.find();
    }

    // Method to get a profile by ID 
    static getProfileById = async (id: string): Promise<UserProfile> => {
        return await profileRepo.findOneBy({ id: id });
    }

    // Method to create a new profile 
    static saveProfile = async (profile: UserProfile): Promise<boolean> => {
        try {
            await profileRepo.save(profile);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update a profile
    static updateProfile = async (id: string, profileDataToUpdate: UserProfile): Promise<boolean> => {
        try {
            let profile = await profileRepo.findOneBy({ id: id });
            if (profile) {
                await profileRepo.update(id, profileDataToUpdate);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

  // Method to delete a profile
static deleteProfile = async (id: string): Promise<boolean> => {
    try {
        // Use the delete method of the profileRepo
        const deleteResult = await profileRepo.delete(id);

        // Check if any records were affected by the delete operation
        return deleteResult.affected !== undefined && deleteResult.affected > 0;
    } catch (err) {
        console.log(err);
        return false;
    }
}

}

export default ProfileController;
