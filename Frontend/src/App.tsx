import React, { useReducer } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Signin from "./pages/SignIn";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import {
  ChatDispatchContext,
  ChatStateContext,
  UserDispatchContext,
  UserStateContext,
} from "./context/globalContext";
import chatReducer, { chatIntialState } from "./reducer/chatReducer";
import userReducer, { userInitialState } from "./reducer/userReducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [chatState, chatDispatch] = useReducer(chatReducer, chatIntialState);

  return (
    <>
      <UserStateContext.Provider value={userState}>
        <UserDispatchContext.Provider value={userDispatch}>
          <ChatStateContext.Provider value={chatState}>
            <ChatDispatchContext.Provider value={chatDispatch}>
              <RouterProvider router={router} />
            </ChatDispatchContext.Provider>
          </ChatStateContext.Provider>
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
      <Toaster />
    </>
  );
};

export default App;
