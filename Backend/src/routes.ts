import ChatActions from "./actions/ChatActions";
import UserActions from "./actions/UserActions";

const Routes = [
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
    route: '/user/:userId/updateProfile',
    action: UserActions.updateUserProfile,
    // middleware: jwtMiddleware,
  },
  {
    method: 'delete',
    route: '/user/:userId/deleteAccount',
    action: UserActions.deleteAccount,
    // middleware: jwtMiddleware,
  },
  {
    method: 'get',
    route: '/chat/:userId/getChatsList',
    action: ChatActions.getChatsList,
    // middleware: jwtMiddleware,
  },
  {
    method: 'post',
    route: '/chat/:userId/start',
    action: ChatActions.startChat,
    // middleware: jwtMiddleware,
  },
  {
    method: 'post',
    route: '/chat/:chatId/sendQuery',
    action: ChatActions.sendQuery,
    // middleware: jwtMiddleware,
  },
  {
    method: 'put',
    route: '/chat/:chatId/endChat',
    action: ChatActions.endChat,
    // middleware: jwtMiddleware,
  },
  {
    method: 'delete',
    route: '/chat/:chatId/deleteChat',
    action: ChatActions.deleteChat,
    // middleware: jwtMiddleware,
  },
];

export default Routes;