import { SignatureKind } from "typescript";
import ChatActions from "./actions/ChatActions";
import UserActions from "./actions/UserActions";

// Instantiate action controllers
const chatActions = new ChatActions();
const userActions = new UserActions();

const Routes: Array<{
    method: string;
    route: string;
    action: (...args: any[]) => void;
    middleware?: any;
  }> = [
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

  export default Routes;