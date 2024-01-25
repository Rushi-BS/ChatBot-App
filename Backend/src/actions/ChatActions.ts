import { Request as Req, Response as Res } from "express";
import UserController from "../controllers/UserController";
import ChatController from "../controllers/ChatController";
import QueryController from "../controllers/QueryController";
import ResponseController from "../controllers/ResponseController";
import { Chat, Query, Response } from "../entities/Chat";

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
        const { userId, chatName }: { userId: number, chatName: string } = req.body;

        const user = await this.userController.getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
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
    }

    // Action to send a query in an ongoing chat
    sendQuery = async (req: Req, res: Res): Promise<void> => {
        const { chatId, queryText }: { chatId: number, queryText: string } = req.body;
        const chat: Chat = await this.chatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        const queryData: Query = new Query();
        queryData.chat = chat;
        queryData.text = queryText;
        chat.queries.push(queryData);

        const success = await this.chatController.updateChat(chatId, chat) && await this.queryController.createQuery(queryData);
        if (success) {
            res.status(200).json({ message: "Query sent successfully" });
        } else {
            res.status(500).json({ message: "Failed to send query" });
        }
    }

    // Action to get all past chats of a user
    getChatsList = async (req: Req, res: Res): Promise<void> => {
        const { userId }: { userId: number } = req.body;

        const chatsList = await this.chatController.getAllChatsOfUser(userId);

        if (chatsList) {
            res.status(200).json({ chatsList });
        } else {
            res.status(500).json({ message: "Failed to get chats list" });
        }
    }

    // Action to delete a chat
    deleteChat = async (req: Req, res: Res): Promise<void> => {
        const { chatId }: { chatId: number } = req.body;
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
        const { chatId }: { chatId: number } = req.body;
        const chat = await this.chatController.getChatById(chatId);

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        chat.isDeleted = true;
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
