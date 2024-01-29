"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatActions_1 = __importDefault(require("./actions/ChatActions"));
const UserActions_1 = __importDefault(require("./actions/UserActions"));
// Instantiate action controllers
const chatActions = new ChatActions_1.default();
const userActions = new UserActions_1.default();
const Routes = [
    {
        method: 'post',
        route: '/chat/start',
        action: chatActions.startChat,
        // middleware: jwtMiddleware,
    },
    {
        method: 'post',
        route: '/chat/sendQuery',
        action: chatActions.sendQuery,
        // middleware: jwtMiddleware,
    },
    {
        method: 'get',
        route: '/chat/getChatsList',
        action: chatActions.getChatsList,
        // middleware: jwtMiddleware,
    },
    {
        method: 'delete',
        route: '/chat/deleteChat',
        action: chatActions.deleteChat,
        // middleware: jwtMiddleware,
    },
    {
        method: 'post',
        route: '/chat/endChat',
        action: chatActions.endChat,
        // middleware: jwtMiddleware,
    },
    {
        method: 'post',
        route: '/user/signIn',
        action: userActions.signIn,
    },
    {
        method: 'post',
        route: '/user/signUp',
        action: userActions.signUp,
    },
    {
        method: 'put',
        route: '/user/updateProfile',
        action: userActions.updateProfile,
        // middleware: jwtMiddleware,
    },
    {
        method: 'delete',
        route: '/user/deleteAccount',
        action: userActions.deleteAccount,
        // middleware: jwtMiddleware,
    },
];
exports.default = Routes;
