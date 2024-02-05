import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-center">Chat App</h1>
        <div className="flex items-center">
          <button className="bg-white text-indigo-500 rounded-full p-2 mr-4">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg> */}
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
              <span className="text-indigo-500 font-semibold text-lg">P</span>
            </div>
          </button>
          {/* <button className="bg-white text-indigo-500 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
            onClick={() => {
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* User Chats */}
      <main className="py-8 px-4 grow">
        <div className="max-w-md mx-auto">
          {/* List of user chats */}
          <div className="space-y-4">
            {/* Chat item */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Chat Name</h2>
                  <p className="text-gray-500">Last message...</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500">12:30 PM</p>
              </div>
            </div>

            {/* More chat items go here */}
          </div>

          {/* Start a new chat button */}
          <div className="mt-4">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full w-full"
              onClick={() => {
                // Add logic to start a new chat
                window.prompt("Enter the name of the chat");
              }}
            >
              Start a New Chat
            </button>
          </div>
        </div>
      </main>

      {/* Logout Button */}
      <footer className="bg-white p-4 border-t border-gray-200 text-center">
        Made with ❤️ by {"Team BlockSuitCase"}
      </footer>
    </div>
  );
};

export default Home;
