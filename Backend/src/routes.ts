import ChatActions from "./actions/ChatActions";
import UserActions from "./actions/UserActions";

const Routes: Array<{
    method: string;
    route: string;
    action: (...args: any[]) => void;
    middleware?: any;
}> = [
        {
            method: 'post',
            route: '/user/signIn',
            action: UserActions.signIn,
        },
        {
            method: 'post',
            route: '/user/signUp',
            action: UserActions.signUp,
        },
        {
            method: 'put',
            route: '/user/updateProfile',
            action: UserActions.updateUserProfile,
            // middleware: jwtMiddleware,
        },
        {
            method: 'delete',
            route: '/user/deleteAccount',
            action: UserActions.deleteAccount,
            // middleware: jwtMiddleware,
        },
        {
            method: 'post',
            route: '/chat/start',
            action: ChatActions.startChat,
            // middleware: jwtMiddleware,
        },
        {
            method: 'post',
            route: '/chat/sendQuery',
            action: ChatActions.sendQuery,
            // middleware: jwtMiddleware,
        },
        {
            method: 'get',
            route: '/chat/getChatsList',
            action: ChatActions.getChatsList,
            // middleware: jwtMiddleware,
        },
        {
            method: 'delete',
            route: '/chat/deleteChat',
            action: ChatActions.deleteChat,
            // middleware: jwtMiddleware,
        },
        {
            method: 'post',
            route: '/chat/endChat',
            action: ChatActions.endChat,
            // middleware: jwtMiddleware,
        },
    ];

export default Routes;