import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Chat } from "../entities/Chat";

class ChatController {
    chatRepo: Repository<Chat>;

    constructor() {
        this.chatRepo = AppDataSource.getRepository(Chat);
    }

    // Method to get all chats
    getAllChats = async (): Promise<Chat[]> => {
        return await this.chatRepo.find();
    }

    // Method to get a specific chat by ID
    getChatById = async (chatId: number): Promise<Chat> => {
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
    updateChat = async (chatId: number, chatDataToUpdate: Chat): Promise<boolean> => {
        try {
            let chat = await this.chatRepo.findOneBy({ id: chatId });
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
    deleteChat = async (chatId: number): Promise<boolean> => {
        try {
            let chat = await this.chatRepo.findOneBy({ id: chatId });
            if (chat) {
                chat.isDeleted = true;
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