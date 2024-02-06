"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatActions_1 = __importDefault(require("./actions/ChatActions"));
const UserActions_1 = __importDefault(require("./actions/UserActions"));
const Middleware_1 = __importDefault(require("./middlewares/Middleware"));
const Routes = [
    {
        method: 'post',
        route: '/user/signIn',
        action: UserActions_1.default.signIn,
    },
    {
        method: 'post',
        route: '/user/signUp',
        action: UserActions_1.default.signUp,
    },
    {
        method: 'put',
        route: '/user/:userId/updateProfile',
        action: UserActions_1.default.updateUserProfile,
        middleware: Middleware_1.default,
    },
    {
        method: 'delete',
        route: '/user/:userId/deleteAccount',
        action: UserActions_1.default.deleteAccount,
        middleware: Middleware_1.default,
    },
    {
        method: 'get',
        route: '/chat/:userId/chatsList',
        action: ChatActions_1.default.getChatsList,
        middleware: Middleware_1.default,
    },
    {
        method: 'post',
        route: '/chat/:userId/start',
        action: ChatActions_1.default.startChat,
        middleware: Middleware_1.default,
    },
    {
        method: 'post',
        route: '/chat/:chatId/send',
        action: ChatActions_1.default.sendQuery,
        middleware: Middleware_1.default,
    },
    {
        method: 'put',
        route: '/chat/:chatId/end',
        action: ChatActions_1.default.endChat,
        middleware: Middleware_1.default,
    },
    {
        method: 'delete',
        route: '/chat/:chatId/delete',
        action: ChatActions_1.default.deleteChat,
        middleware: Middleware_1.default,
    },
    {
        method: 'get',
        route: '/chat/:chatId/history',
        action: ChatActions_1.default.getChatHistory,
        middleware: Middleware_1.default,
    },
    {
        method: 'post',
        route: '/chat/:chatId/rating',
        action: ChatActions_1.default.chatRating,
        middleware: Middleware_1.default,
    },
    {
        method: 'post',
        route: '/chat/:chatId/feedback',
        action: ChatActions_1.default.chatFeedback,
        middleware: Middleware_1.default,
    },
];
exports.default = Routes;
