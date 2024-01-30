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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
const ChatController_1 = __importDefault(require("../controllers/ChatController"));
const QueryController_1 = __importDefault(require("../controllers/QueryController"));
const ResponseController_1 = __importDefault(require("../controllers/ResponseController"));
const Chat_1 = require("../entities/Chat");
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("../config"));
const { openai_api_key } = config_1.default;
class ChatActions {
}
_a = ChatActions;
// Action to start a chat
ChatActions.startChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, chatName } = req.body;
        console.log(userId, chatName);
        const user = yield UserController_1.default.getUserById(userId);
        console.log("User: ", user);
        if (!user) {
            throw new Error("User not found");
        }
        const chatData = new Chat_1.Chat();
        chatData.chatName = chatName;
        chatData.startBy = user;
        chatData.startAt = new Date();
        // const isChatCreated = await ChatController.createChat(chatData)
        // if (isChatCreated && !user.chats) {
        // user.chats = [];
        // }
        // user.chats = [...(user.chats || []), chatData];
        console.log("updated user: ", user);
        // const success = await UserController.updateUser(userId, user);
        const success = yield ChatController_1.default.createChat(chatData);
        if (success) {
            res.status(201).json({ message: "Chat started successfully" });
        }
        else {
            res.status(500).json({ message: "Failed to start chat" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
    }
});
// Action to send a query in an ongoing chat
ChatActions.sendQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, queryText } = req.body;
    const chat = yield ChatController_1.default.getChatById(chatId);
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    const queryData = new Chat_1.Query();
    queryData.chat = chat;
    queryData.text = queryText;
    queryData.timestamp = new Date();
    const success = yield QueryController_1.default.createQuery(queryData);
    if (success) {
        try {
            const responseText = yield _a.getResponseFromBot(queryText);
            if (!responseText) {
                throw new Error("Failed to get response from bot");
            }
            const responseData = new Chat_1.Response();
            responseData.chat = chat;
            responseData.text = responseText;
            responseData.timestamp = new Date();
            responseData.isBotResponse = true;
            yield ResponseController_1.default.createResponse(responseData);
            res.status(200).json({ message: "Query sent successfully", response: responseData });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
        }
    }
    else {
        res.status(500).json({ message: "Failed to send query" });
    }
});
// Get a response to a query from a bot
ChatActions.getResponseFromBot = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!query) {
            return;
        }
        // Initialize OpenAI API
        const openai = new openai_1.default({
            apiKey: openai_api_key
        });
        const prompt = {
            role: "user",
            content: query
        };
        // Defining chat completion method
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                    role: "system",
                    content: `When I request for a help, Assume it's for customer support for our product blockCerti.`
                }, prompt],
            temperature: 0.2,
            max_tokens: 150,
        });
        return completion.choices[0].message.content;
    }
    catch (error) {
        console.error('Error:', error);
        return "";
    }
});
// Action to get all past chats of a user
ChatActions.getChatsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const chatsList = yield ChatController_1.default.getAllChatsOfUser(userId);
    if (chatsList) {
        res.status(200).json({ chatsList });
    }
    else {
        res.status(500).json({ message: "Failed to get chats list" });
    }
});
// Action to delete a chat
ChatActions.deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.body;
    const chat = yield ChatController_1.default.getChatById(chatId);
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    const success = yield ChatController_1.default.deleteChat(chatId);
    if (success) {
        res.status(200).json({ message: "Chat deleted successfully" });
    }
    else {
        res.status(500).json({ message: "Failed to delete chat" });
    }
});
// Action to end a chat
ChatActions.endChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.body;
    const chat = yield ChatController_1.default.getChatById(chatId);
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    chat.endAt = new Date();
    const success = yield ChatController_1.default.updateChat(chatId, chat);
    if (success) {
        res.status(200).json({ message: "Chat ended successfully" });
    }
    else {
        res.status(500).json({ message: "Failed to end chat" });
    }
});
exports.default = ChatActions;
