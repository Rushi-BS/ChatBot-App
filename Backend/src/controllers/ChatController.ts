import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";

const chatRepo: Repository<Chat> = AppDataSource.getRepository(Chat);

class ChatController {
    // Method to get all chats
    static getAllChats = async (): Promise<Chat[]> => {
        return await chatRepo.find();
    }

    // Method to get all chats of a specific user
    static getAllChatsOfUser = async (userId: string): Promise<Chat[]> => {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) {
            return [];
        }
        return await chatRepo.findBy({ startBy: user });
    }

    // Method to get a specific chat by ID
    static getChatById = async (chatId: string): Promise<Chat> => {
        return await chatRepo.findOneBy({ id: chatId });
    }

    static getChatByIdWithRelations = async (chatId: string): Promise<Chat> => {
        return await chatRepo.findOne({
            where: { id: chatId },
            relations: { responses: true, queries: true }
        });
    }

    // Method to create a new chat
    static createChat = async (chatData: Chat): Promise<boolean> => {
        try {
            await chatRepo.save(chatData);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    // Method to update an existing chat
    static updateChat = async (chatId: string, chatDataToUpdate: Chat): Promise<boolean> => {
        try {
            const chat = await chatRepo.findOneBy({ id: chatId });
            if (chat) {
                await chatRepo.update(chatId, chatDataToUpdate);
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
    static deleteChat = async (chatId: string): Promise<boolean> => {
        try {
            const chat = await chatRepo.findOneBy({ id: chatId });
            if (chat) {
                chat.isDeleted = true;
                await chatRepo.save(chat);
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