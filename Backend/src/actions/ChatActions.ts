import { Request as Req, Response as Res } from "express";
import UserController from "../controllers/UserController";
import ChatController from "../controllers/ChatController";
import QueryController from "../controllers/QueryController";
import ResponseController from "../controllers/ResponseController";
import { Chat } from "../entities/Chat";
import { Query } from "../entities/Query";
import { Response } from "../entities/Response";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import config from "../config";

const { openai_api_key } = config;

class ChatActions {
    // Action to start a chat
    static startChat = async (req: Req, res: Res): Promise<void> => {
        try {
            const { userId } = req.params;
            const { chatName }: { chatName: string } = req.body;

            if (!userId || !chatName) {
                res.status(400).json({ message: "Invalid request" });
                return;
            }

            const user = await UserController.getUserById(userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const chatData = new Chat();
            chatData.chatName = chatName;
            chatData.startBy = user;
            chatData.startAt = new Date();

            const success = await ChatController.createChat(chatData);
            if (success) {
                res.status(201).json({ message: "Chat started successfully", chat: chatData });
            } else {
                res.status(500).json({ message: "Failed to start chat" });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
        }
    }

    // Action to send a query in an ongoing chat
    static sendQuery = async (req: Req, res: Res): Promise<void> => {
        const { chatId } = req.params;
        const { queryText }: { queryText: string } = req.body;

        if (!chatId || !queryText) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const chat: Chat = await ChatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        const queryData: Query = new Query();
        queryData.chat = chat;
        queryData.text = queryText;
        queryData.timestamp = new Date();

        const success = await QueryController.saveQuery(queryData);
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

                await ResponseController.saveResponse(responseData);
                res.status(200).json({ message: "Received response successfully", query: queryData, responseData: responseData });
            } catch (error) {
                console.error(error.message);
                res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
            }
        } else {
            res.status(500).json({ message: "Failed to send query" });
        }
    }

    // Get a response to a query from a bot
    static getResponseFromBot = async (query: string): Promise<string> => {
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
    }

    // Action to get all past chats of a user
    static getChatsList = async (req: Req, res: Res): Promise<void> => {
        const { userId }: { userId: string } = req.body;

        if (!userId) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const chatsList = await ChatController.getAllChatsOfUser(userId);

        if (chatsList) {
            res.status(200).json({ message: "Chats list fetched successfully", chatsList: chatsList });
        } else {
            res.status(500).json({ message: "Failed to get chats list" });
        }
    }

    // Action to delete a chat
    static deleteChat = async (req: Req, res: Res): Promise<void> => {
        const { chatId }: { chatId: string } = req.body;

        if (!chatId) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const chat = await ChatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        const success = await ChatController.deleteChat(chatId);
        if (success) {
            res.status(200).json({ message: "Chat deleted successfully" });
        } else {
            res.status(500).json({ message: "Failed to delete chat" });
        }
    }

    // Action to end a chat
    static endChat = async (req: Req, res: Res): Promise<void> => {
        const { chatId } = req.params;

        if (!chatId) {
            res.status(400).json({ message: "Invalid request" });
            return;
        }

        const chat = await ChatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        chat.endAt = new Date();

        const success = await ChatController.updateChat(chatId, chat);
        if (success) {
            res.status(200).json({ message: "Chat ended successfully" });
        } else {
            res.status(500).json({ message: "Failed to end chat" });
        }
    }

    // Action to get chat feedback
    static chatFeedback = async (req: Req, res: Res): Promise<void> => {
        try {
            const { chatId } = req.params;
            const { feedback }: { feedback: string } = req.body;
            if (!chatId || !feedback) {
                res.status(400).json({ message: "Invalid request" });
                return;
            }

            const chat = await ChatController.getChatById(chatId);

            if (!chat) {
                res.status(404).json({ message: "Chat not found" });
                return;
            }

            chat.feedback = feedback;
            const success = await ChatController.updateChat(chatId, chat);
            if (success) {
                res.status(200).json({ message: "Feedback submitted successfully" });
            } else {
                res.status(500).json({ message: "Failed to submit feedback" });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Facing issue at server end. Please try again later!" });
        }
    }
}

export default ChatActions;