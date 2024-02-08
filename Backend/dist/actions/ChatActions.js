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
const Query_1 = require("../entities/Query");
const Response_1 = require("../entities/Response");
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("../config"));
const { openai_api_key } = config_1.default;
class ChatActions {
}
_a = ChatActions;
// Action to start a chat
ChatActions.startChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { chatName } = req.body;
        if (!userId || !chatName) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        const user = yield UserController_1.default.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const chatData = new Chat_1.Chat();
        chatData.chatName = chatName;
        chatData.startBy = user;
        chatData.startAt = new Date();
        const success = yield ChatController_1.default.createChat(chatData);
        if (success) {
            res.status(201).json({
                message: "New chat started successfully",
                error: false,
                code: res.statusCode,
                results: chatData
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Facing issue at server end. Please try again later!",
            error: true,
            code: res.statusCode
        });
    }
});
// Action to send a query in an ongoing chat
ChatActions.sendQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const { queryText } = req.body;
    console.log(chatId, queryText);
    if (!chatId || !queryText) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }
    const chat = yield ChatController_1.default.getChatById(chatId);
    console.log(chat);
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    const queryData = new Query_1.Query();
    queryData.chat = chat;
    queryData.text = queryText;
    queryData.timestamp = new Date();
    console.log(queryData);
    const success = yield QueryController_1.default.saveQuery(queryData);
    console.log(success);
    if (success) {
        try {
            const responseText = yield _a.getResponseFromBot(queryText);
            if (!responseText) {
                throw new Error("Failed to get response from bot");
            }
            const responseData = new Response_1.Response();
            responseData.chat = chat;
            responseData.text = responseText;
            responseData.timestamp = new Date();
            yield ResponseController_1.default.saveResponse(responseData);
            res.status(200).json({
                message: "Received response successfully",
                error: false,
                code: res.statusCode,
                results: {
                    responseData: { id: responseData.id, text: responseData.text, timestamp: responseData.timestamp, sender: "bot" },
                }
            });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({
                message: "Facing issue at server end. Please try again later!",
                error: true,
                code: res.statusCode
            });
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
                    content: `When I request for a help, Assume it's for customer support for our product blockCerti. Try to give short answer in around 30-50 words.`
                }, prompt],
            temperature: 0.2,
            max_tokens: 150,
        });
        return completion.choices[0].message.content;
    }
    catch (error) {
        console.error('Error:', error);
        return;
    }
});
// Action to get all past chats of a user
ChatActions.getChatsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }
    const chatsList = yield ChatController_1.default.getAllChatsOfUser(userId);
    if (chatsList) {
        res.status(200).json({
            message: "Chats list fetched successfully",
            error: false,
            code: res.statusCode,
            results: chatsList.filter(chat => !chat.isDeleted)
        });
    }
    else {
        res.status(500).json({
            message: "Facing issue at server end. Please try again later!",
            error: true,
            code: res.statusCode
        });
    }
});
// Action to delete a chat
ChatActions.deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    if (!chatId) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }
    const chat = yield ChatController_1.default.getChatById(chatId);
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    const success = yield ChatController_1.default.deleteChat(chatId);
    if (success) {
        res.status(200).json({
            message: "Chat deleted successfully",
            error: false,
            code: res.statusCode,
        });
    }
    else {
        res.status(500).json({
            message: "Facing issue at server end. Please try again later!",
            error: true,
            code: res.statusCode
        });
    }
});
// Action to end a chat
ChatActions.endChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    if (!chatId) {
        res.status(400).json({ message: "Invalid request" });
        return;
    }
    const chat = yield ChatController_1.default.getChatById(chatId);
    if (!chat) {
        res.status(404).json({ message: "Chat not found" });
        return;
    }
    chat.endAt = new Date();
    const success = yield ChatController_1.default.updateChat(chatId, chat);
    if (success) {
        res.status(200).json({
            message: "Chat ended successfully",
            error: false,
            code: res.statusCode,
        });
    }
    else {
        res.status(500).json({
            message: "Facing issue at server end. Please try again later!",
            error: true,
            code: res.statusCode
        });
    }
});
// Action for chat rating
ChatActions.chatRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const { rating } = req.body;
        if (!chatId || !rating) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        const chat = yield ChatController_1.default.getChatById(chatId);
        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }
        chat.rating = rating;
        const success = yield ChatController_1.default.updateChat(chatId, chat);
        if (success) {
            res.status(200).json({ message: "Rating submitted successfully" });
        }
        else {
            res.status(500).json({ message: "Failed to submit rating" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
    }
});
// Action for chat feedback
ChatActions.chatFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const { feedback } = req.body;
        if (!chatId || !feedback) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        const chat = yield ChatController_1.default.getChatById(chatId);
        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }
        chat.feedback = feedback;
        const success = yield ChatController_1.default.updateChat(chatId, chat);
        if (success) {
            res.status(200).json({ message: "Feedback submitted successfully" });
        }
        else {
            res.status(500).json({ message: "Failed to submit feedback" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
    }
});
// Action to get chat history
ChatActions.getMessagesHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        if (!chatId) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }
        const chat = yield ChatController_1.default.getChatByIdWithRelations(chatId);
        console.log(chat);
        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }
        // Combine queries and responses into a single array.
        const messages = [];
        chat.queries.forEach(query => {
            const msg = {
                id: 'q' + parseInt(query.id),
                sender: 'user',
                text: query.text,
                timestamp: query.timestamp
            };
            messages.push(msg);
        });
        chat.responses.forEach(response => {
            const msg = {
                id: 'r' + parseInt(response.id),
                sender: 'bot',
                text: response.text,
                timestamp: response.timestamp
            };
            messages.push(msg);
        });
        // Sort the messages array based on the timestamp.
        messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        console.log(messages);
        if (messages.length > 0) {
            res.status(200).json({
                message: "Messages history fetched successfully",
                error: false,
                code: res.statusCode,
                results: messages
            });
        }
        else {
            res.status(200).json({
                message: "No previous messages found",
                error: false,
                code: res.statusCode
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Facing issue at server end. Please try again later!",
            error: true,
            code: res.statusCode
        });
    }
});
exports.default = ChatActions;
