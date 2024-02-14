import ChatActions from "./actions/ChatActions";
import UserActions from "./actions/UserActions";
import jwtMiddleware from "./middlewares/Middleware"

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
      method: 'post',
      route: '/user/:userId/updateProfile',
      action: UserActions.updateUserProfile,
      middleware: jwtMiddleware,
    },
    {
      method: 'delete',
      route: '/user/:userId/deleteAccount',
      action: UserActions.deleteAccount,
      middleware: jwtMiddleware,
    },
    {
      method: 'get',
      route: '/chat/:userId/chatsList',
      action: ChatActions.getChatsList,
      middleware: jwtMiddleware,
    },
    {
      method: 'post',
      route: '/chat/:userId/start',
      action: ChatActions.startChat,
      middleware: jwtMiddleware,
    },
    {
      method: 'post',
      route: '/chat/:chatId/send',
      action: ChatActions.sendQuery,
      middleware: jwtMiddleware,
    },
    {
      method: 'post',
      route: '/chat/:chatId/end',
      action: ChatActions.endChat,
      middleware: jwtMiddleware,
    },
    {
      method: 'delete',
      route: '/chat/:chatId/delete',
      action: ChatActions.deleteChat,
      middleware: jwtMiddleware,
    },
    {
      method: 'get',
      route: '/chat/:chatId/history',
      action: ChatActions.getMessagesHistory,
      middleware: jwtMiddleware,
    },
    {
      method: 'post',
      route: '/chat/:chatId/rating',
      action: ChatActions.chatRating,
      middleware: jwtMiddleware,
    },
    {
      method: 'post',
      route: '/chat/:chatId/feedback',
      action: ChatActions.chatFeedback,
      middleware: jwtMiddleware,
    },
    {
      method: 'post',
      route: '/user/logout',
      action: UserActions.logout,
      middleware: jwtMiddleware,
    },
  ];

export default Routes;