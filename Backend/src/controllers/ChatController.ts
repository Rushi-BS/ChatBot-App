import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";

class ChatController {
    chatRepo: Repository<Chat>;

    constructor() {
        this.chatRepo = AppDataSource.getRepository(Chat);
    }

    // Method to get all chats
    getAllChats = async (): Promise<Chat[]> => {
        return await this.chatRepo.find();
    }

    // Method to get all chats of a specific user
    getAllChatsOfUser = async (userId: string): Promise<Chat[]> => {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) {
            return [];
        }
        return await this.chatRepo.findBy({ startBy: user });
    }

    // Method to get a specific chat by ID
    getChatById = async (chatId: string): Promise<Chat> => {
        return await this.chatRepo.findOneBy({ id: chatId });
    }

    // Method to create a new chat
    createChat = async (chatData: Chat): Promise<boolean> => {
        try {
            await this.chatRepo.save(chatData);
            return true;
        }
        catch (err) {       
            console.log(err);
            return false;
        }
    }

    // Method to update an existing chat
    updateChat = async (chatId: string, chatDataToUpdate: Chat): Promise<boolean> => {
        try {
            const chat = await this.chatRepo.findOneBy({ id: chatId });
            if (chat) {
                await this.chatRepo.update(chatId, chatDataToUpdate);
                return true;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to delete a chat
    deleteChat = async (chatId: string): Promise<boolean> => {
        try {
            const chat = await this.chatRepo.findOneBy({ id: chatId });
            if (chat) {
                chat.isDeleted = true;
                await this.chatRepo.save(chat);
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

export default ChatController;