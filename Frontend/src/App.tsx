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
} from "./components/context/globalContext";
import chatReducer, { chatIntialState } from "./reducer/chatReducer";

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
  const [state, dispatch] = useReducer(chatReducer, chatIntialState);
  return (
    <>
      <ChatStateContext.Provider value={state}>
        <ChatDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router} />
        </ChatDispatchContext.Provider>
      </ChatStateContext.Provider>
      <Toaster />
    </>
  );
};

export default App;
