import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Signin from "./pages/SignIn";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
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
    element: (
        <Profile />
    ),
  },
  {
    path: "/chat/:chatId",
    element: (
      <Chat />
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
