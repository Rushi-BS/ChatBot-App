import React, { useEffect, useState } from "react";
import { ApiResponse, MessageType } from "../utils/type";
import ApiHelper from "../utils/ApiHelper";
import toast from "react-hot-toast";
import { useChatDispatch, useChatState } from "./context/contextHooks";

const apiHelper = new ApiHelper();

const ChatWindow: React.FC = () => {
  const state = useChatState();
  const dispatch = useChatDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchChatMessages = async () => {
    try {
      if (!state.currentChat) {
        console.log("No chat selected");
        return;
      }
      console.log(state.currentChat);
      
      const response: ApiResponse<Array<MessageType>> = await apiHelper.get(
        `/chat/${state.currentChat?.id}/history`
      );
      console.log(response);
      
      const { results } = response.data;
      if (results) {
        console.log("Chat history:", results);
        dispatch({ type: "SET_MESSAGES", payload: results });
      }
    } catch (error) {
      toast.error("Error getting chat history");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: MessageType = {
      id: state.messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };

    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    setNewMessage("");

    try {
      setLoading(true);
      const reqBody = {
        queryText: newMessage,
      };
      const response: ApiResponse<{ responseData: MessageType }> =
        await apiHelper.post(`/chat/${state.currentChat?.id}/send`, reqBody);

      console.log(response);
      const { results } = response.data;
      if (results && results.responseData) {
        const { responseData } = results;
        // Update messages to include the bot's reply
        dispatch({ type: "ADD_MESSAGE", payload: responseData });
      }
      setLoading(false);
    } catch (error) {
      // console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col grow w-4/5 md:w-1/2 mx-auto">
      <div className="grow p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2 p-2 border-b border-indigo-00">
          <div className="w-6 h-6 p-5 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <h2 className="text-xl font-semibold">
            {state.currentChat?.chatName}
          </h2>
        </div>
        <div className="flex flex-col overflow-auto max-h-[460px]">
          {state.messages.map((message) => (
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
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
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
