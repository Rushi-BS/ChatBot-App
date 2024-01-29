"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Chat_1 = require("../entities/Chat");
const User_1 = require("../entities/User");
class ChatController {
    constructor() {
        // Method to get all chats
        this.getAllChats = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.find();
        });
        // Method to get all chats of a specific user
        this.getAllChatsOfUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: userId });
            if (!user) {
                return [];
            }
            return yield this.chatRepo.findBy({ startBy: user });
        });
        // Method to get a specific chat by ID
        this.getChatById = (chatId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.findOneBy({ id: chatId });
        });
        // Method to create a new chat
        this.createChat = (chatData) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.chatRepo.save(chatData);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to update an existing chat
        this.updateChat = (chatId, chatDataToUpdate) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield this.chatRepo.findOneBy({ id: chatId });
                if (chat) {
                    yield this.chatRepo.update(chatId, chatDataToUpdate);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        // Method to delete a chat
        this.deleteChat = (chatId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield this.chatRepo.findOneBy({ id: chatId });
                if (chat) {
                    chat.isDeleted = true;
                    yield this.chatRepo.save(chat);
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
        this.chatRepo = data_source_1.AppDataSource.getRepository(Chat_1.Chat);
    }
}
exports.default = ChatController;
