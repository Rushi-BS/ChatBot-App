"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatActions_1 = __importDefault(require("./actions/ChatActions"));
const UserActions_1 = __importDefault(require("./actions/UserActions"));
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
        route: '/user/updateProfile',
        action: UserActions_1.default.updateProfile,
        // middleware: jwtMiddleware,
    },
    {
        method: 'delete',
        route: '/user/deleteAccount',
        action: UserActions_1.default.deleteAccount,
        // middleware: jwtMiddleware,
    },
    {
        method: 'post',
        route: '/chat/start',
        action: ChatActions_1.default.startChat,
        // middleware: jwtMiddleware,
    },
    {
        method: 'post',
        route: '/chat/sendQuery',
        action: ChatActions_1.default.sendQuery,
        // middleware: jwtMiddleware,
    },
    {
        method: 'get',
        route: '/chat/getChatsList',
        action: ChatActions_1.default.getChatsList,
        // middleware: jwtMiddleware,
    },
    {
        method: 'delete',
        route: '/chat/deleteChat',
        action: ChatActions_1.default.deleteChat,
        // middleware: jwtMiddleware,
    },
    {
        method: 'post',
        route: '/chat/endChat',
        action: ChatActions_1.default.endChat,
        // middleware: jwtMiddleware,
    },
];
exports.default = Routes;
