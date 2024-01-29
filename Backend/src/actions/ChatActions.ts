import { Request as Req, Response as Res } from "express";
import UserController from "../controllers/UserController";
import ChatController from "../controllers/ChatController";
import QueryController from "../controllers/QueryController";
import ResponseController from "../controllers/ResponseController";
import { Chat, Query, Response } from "../entities/Chat";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import config from "../config";

const { openai_api_key } = config;

class ChatActions {
    private userController: UserController;
    private chatController: ChatController;
    private queryController: QueryController;
    private responseController: ResponseController;

    constructor() {
        this.chatController = new ChatController();
        this.queryController = new QueryController();
        this.responseController = new ResponseController();
    }

    // Action to start a chat
    startChat = async (req: Req, res: Res): Promise<void> => {
        try {
            const { userId, chatName }: { userId: string, chatName: string } = req.body;
            const user = await this.userController.getUserById(userId);

            if (!user) {
                throw new Error("User not found");
            }

            const chatData = new Chat();
            chatData.chatName = chatName;
            chatData.startBy = user;
            user.chats.push(chatData);

            const success = await this.userController.updateUser(userId, user) && await this.chatController.createChat(chatData);
            if (success) {
                res.status(201).json({ message: "Chat started successfully" });
            } else {
                res.status(500).json({ message: "Failed to start chat" });
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
        }

    }

    // Action to send a query in an ongoing chat
    sendQuery = async (req: Req, res: Res): Promise<void> => {
        const { chatId, queryText }: { chatId: string, queryText: string } = req.body;
        const chat: Chat = await this.chatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        const queryData: Query = new Query();
        queryData.chat = chat;
        queryData.text = queryText;
        queryData.timestamp = new Date();
        chat.queries.push(queryData);

        const success = await this.chatController.updateChat(chatId, chat) && await this.queryController.createQuery(queryData);
        if (success) {
            try {
                const responseText = await this.getResponseFromBot(queryText);
                if (!responseText) {
                    throw new Error("Failed to get response from bot");
                }
                const responseData: Response = new Response();
                responseData.chat = chat;
                responseData.text = responseText;
                responseData.timestamp = new Date();
                responseData.isBotResponse = true;
                chat.responses.push(responseData);
                await this.chatController.updateChat(chatId, chat) && await this.responseController.createResponse(responseData);
                res.status(200).json({ message: "Query sent successfully", response: responseData });
            } catch (error) {
                console.error(error.message);
                res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
            }
        } else {
            res.status(500).json({ message: "Failed to send query" });
        }
    }

    // Get a response to a query from a bot
    getResponseFromBot = async (query: string): Promise<string> => {
        try {
            if (!query) {
                return;
            }

            // Initialize OpenAI API
            const openai: OpenAI = new OpenAI({
                apiKey: openai_api_key
            });

            const prompt: ChatCompletionMessageParam = {
                role: "user",
                content: query
            }

            // Defining chat completion method
            const completion = await openai.chat.completions.create({
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
    }

    // Action to get all past chats of a user
    getChatsList = async (req: Req, res: Res): Promise<void> => {
        const { userId }: { userId: string } = req.body;

        const chatsList = await this.chatController.getAllChatsOfUser(userId);

        if (chatsList) {
            res.status(200).json({ chatsList });
        } else {
            res.status(500).json({ message: "Failed to get chats list" });
        }
    }

    // Action to delete a chat
    deleteChat = async (req: Req, res: Res): Promise<void> => {
        const { chatId }: { chatId: string } = req.body;
        const chat = await this.chatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        const success = await this.chatController.deleteChat(chatId);
        if (success) {
            res.status(200).json({ message: "Chat deleted successfully" });
        } else {
            res.status(500).json({ message: "Failed to delete chat" });
        }
    }

    // Action to end a chat
    endChat = async (req: Req, res: Res): Promise<void> => {
        const { chatId }: { chatId: string } = req.body;
        const chat = await this.chatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        chat.endAt = new Date();

        const success = await this.chatController.updateChat(chatId, chat);
        if (success) {
            res.status(200).json({ message: "Chat ended successfully" });
        } else {
            res.status(500).json({ message: "Failed to end chat" });
        }
    }
}

export default ChatActions;