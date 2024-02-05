import React, { useState } from "react";

type IMessage = {
  id: number;
  sender: "user" | "bot" | "support";
  text: string;
};

const dummyMessages: Array<IMessage> = [
  { id: 1, sender: "bot", text: "Dummy message 1 from user" },
  { id: 2, sender: "user", text: "Dummy message 2 from user" },
  { id: 3, sender: "user", text: "Dummy message 3 from bot" },
  { id: 4, sender: "user", text: "Dummy message 4 from support" },
  { id: 5, sender: "support", text: "Dummy message 5 from support" },
  { id: 6, sender: "support", text: "Dummy message 6 from user" },
  { id: 7, sender: "bot", text: "Dummy message 7 from support" },
  { id: 8, sender: "bot", text: "Dummy message 8 from bot" },
  { id: 9, sender: "bot", text: "Dummy message 9 from bot" },
  { id: 10, sender: "support", text: "Dummy message 10 from bot" },
  { id: 11, sender: "user", text: "Dummy message 11 from user" },
  { id: 12, sender: "bot", text: "Dummy message 12 from support" },
  { id: 13, sender: "user", text: "Dummy message 13 from support" },
  { id: 14, sender: "user", text: "Dummy message 14 from support" },
  { id: 15, sender: "user", text: "Dummy message 15 from user" },
  { id: 16, sender: "user", text: "Dummy message 16 from bot" },
  { id: 17, sender: "bot", text: "Dummy message 17 from user" },
  { id: 18, sender: "support", text: "Dummy message 18 from bot" },
  { id: 19, sender: "user", text: "Dummy message 19 from bot" },
  { id: 20, sender: "support", text: "Dummy message 20 from support" },
];

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: IMessage = {
      id: messages.length + 1, // Simple ID generation
      sender: "user", // Assuming the new message is always from the user
      text: newMessage,
    };

    setMessages([...messages, message]);
    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="bg-gray-50 flex flex-col grow w-4/5 md:w-1/2 mx-auto">
      <div className="grow p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2 p-2 border-b border-indigo-00">
          <div className="w-6 h-6 p-5 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <h2 className="text-xl font-semibold">Chat Name</h2>
        </div>
        <div className="flex flex-col overflow-auto max-h-[460px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 my-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-indigo-500 text-white self-end"
                  : "bg-white text-gray-900 self-start"
              } shadow`}
            >
              {message.text}
              {/* <span className="text-sm">{"10:00 AM"}</span> */}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center">
          <input
            type="text"
            className="appearance-none grow px-4 py-3 border rounded-md shadow-md mr-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
