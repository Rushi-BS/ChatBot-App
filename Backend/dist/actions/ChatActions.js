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
Object.defineProperty(exports, "__esModule", { value: true });
const ChatController_1 = __importDefault(require("../controllers/ChatController"));
const QueryController_1 = __importDefault(require("../controllers/QueryController"));
const ResponseController_1 = __importDefault(require("../controllers/ResponseController"));
const Chat_1 = require("../entities/Chat");
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("../config"));
const { openai_api_key } = config_1.default;
class ChatActions {
    constructor() {
        // Action to start a chat
        this.startChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, chatName } = req.body;
                const user = yield this.userController.getUserById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                const chatData = new Chat_1.Chat();
                chatData.chatName = chatName;
                chatData.startBy = user;
                user.chats.push(chatData);
                const success = (yield this.userController.updateUser(userId, user)) && (yield this.chatController.createChat(chatData));
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
        this.sendQuery = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { chatId, queryText } = req.body;
            const chat = yield this.chatController.getChatById(chatId);
            if (!chat) {
                res.status(404).json({ message: "Chat not found" });
                return;
            }
            const queryData = new Chat_1.Query();
            queryData.chat = chat;
            queryData.text = queryText;
            queryData.timestamp = new Date();
            chat.queries.push(queryData);
            const success = (yield this.chatController.updateChat(chatId, chat)) && (yield this.queryController.createQuery(queryData));
            if (success) {
                try {
                    const responseText = yield this.getResponseFromBot(queryText);
                    if (!responseText) {
                        throw new Error("Failed to get response from bot");
                    }
                    const responseData = new Chat_1.Response();
                    responseData.chat = chat;
                    responseData.text = responseText;
                    responseData.timestamp = new Date();
                    responseData.isBotResponse = true;
                    chat.responses.push(responseData);
                    (yield this.chatController.updateChat(chatId, chat)) && (yield this.responseController.createResponse(responseData));
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
        this.getResponseFromBot = (query) => __awaiter(this, void 0, void 0, function* () {
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
                });
                return completion.choices[0].message.content;
            }
            catch (error) {
                console.error('Error:', error);
                return "";
            }
        });
        // Action to get all past chats of a user
        this.getChatsList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const chatsList = yield this.chatController.getAllChatsOfUser(userId);
            if (chatsList) {
                res.status(200).json({ chatsList });
            }
            else {
                res.status(500).json({ message: "Failed to get chats list" });
            }
        });
        // Action to delete a chat
        this.deleteChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.body;
            const chat = yield this.chatController.getChatById(chatId);
            if (!chat) {
                res.status(404).json({ message: "Chat not found" });
                return;
            }
            const success = yield this.chatController.deleteChat(chatId);
            if (success) {
                res.status(200).json({ message: "Chat deleted successfully" });
            }
            else {
                res.status(500).json({ message: "Failed to delete chat" });
            }
        });
        // Action to end a chat
        this.endChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.body;
            const chat = yield this.chatController.getChatById(chatId);
            if (!chat) {
                res.status(404).json({ message: "Chat not found" });
                return;
            }
            chat.endAt = new Date();
            const success = yield this.chatController.updateChat(chatId, chat);
            if (success) {
                res.status(200).json({ message: "Chat ended successfully" });
            }
            else {
                res.status(500).json({ message: "Failed to end chat" });
            }
        });
        this.chatController = new ChatController_1.default();
        this.queryController = new QueryController_1.default();
        this.responseController = new ResponseController_1.default();
    }
}
exports.default = ChatActions;
