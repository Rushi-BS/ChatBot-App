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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Chat_1 = require("../entities/Chat");
const User_1 = require("../entities/User");
const chatRepo = data_source_1.AppDataSource.getRepository(Chat_1.Chat);
class ChatController {
}
_a = ChatController;
// Method to get all chats
ChatController.getAllChats = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatRepo.find();
});
// Method to get all chats of a specific user
ChatController.getAllChatsOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: userId });
    if (!user) {
        return [];
    }
    return yield chatRepo.findBy({ startBy: user });
});
// Method to get a specific chat by ID
ChatController.getChatById = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatRepo.findOneBy({ id: chatId });
});
ChatController.getChatByIdWithRelations = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatRepo.findOne({
        where: { id: chatId },
        relations: { responses: true, queries: true }
    });
});
// Method to create a new chat
ChatController.createChat = (chatData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chatRepo.save(chatData);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
// Method to update an existing chat
ChatController.updateChat = (chatId, chatDataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatRepo.findOneBy({ id: chatId });
        if (chat) {
            yield chatRepo.save(chatDataToUpdate);
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
ChatController.deleteChat = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatRepo.findOneBy({ id: chatId });
        if (chat) {
            chat.isDeleted = true;
            yield chatRepo.save(chat);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.default = ChatController;
