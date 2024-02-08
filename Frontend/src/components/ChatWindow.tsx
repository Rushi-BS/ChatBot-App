import React, { useEffect, useState } from "react";
import { ApiResponse, MessageType } from "../utils/type";
import ApiHelper from "../utils/ApiHelper";
import toast from "react-hot-toast";
import { useChatDispatch, useChatState } from "../context/contextHooks";
import { useNavigate } from "react-router-dom";
import RatingForm from "./forms/RatingForm";
import Popup from "./Popup";
import Loader from "./Loader";

const apiHelper = new ApiHelper();

const ChatWindow: React.FC = () => {
  const navigate = useNavigate();
  const state = useChatState();
  const dispatch = useChatDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  const fetchChatMessages = async () => {
    try {
      if (!state.currentChat) {
        // console.log("No chat selected");
        return;
      }
      // console.log(state.currentChat);

      const response: ApiResponse<Array<MessageType>> = await apiHelper.get(
        `/chat/${state.currentChat?.id}/history`
      );
      // console.log(response);

      const { results } = response.data;
      // console.log("Chat history:", results);
      if (results) {
        dispatch({ type: "SET_MESSAGES", payload: results });
      } else {
        dispatch({ type: "SET_MESSAGES", payload: [] });
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

      // console.log(response);
      const { results } = response.data;
      if (results && results.responseData) {
        const { responseData } = results;
        // Update messages to include the bot's reply
        dispatch({ type: "ADD_MESSAGE", payload: responseData });
      }
    } catch (error) {
      // console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const endChat = async () => {
    try {
      setLoading(true);
      await apiHelper.post(`/chat/${state.currentChat?.id}/end`, {});
      toast.success("Chat ended successfully.");
      // navigate("/");
    } catch (error) {
      toast.error("Failed to end chat. Please try again.");
    } finally {
      setLoading(false);
      setShowRatingPopup(true);
    }
  };

  const handleRatingSubmit = async (rating: number) => {
    try {
      setLoading(true);
      await apiHelper.post(`/chat/${state.currentChat?.id}/rating`, { rating });
      toast.success("Thanks for your feedback!");
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
      setShowRatingPopup(false);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [state.currentChat]);

  return (
    <div className="bg-gray-50 flex flex-col grow w-4/5 md:w-1/2 mx-auto">
      <div className="grow bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-5 border-b border-indigo-500 shadow-xl">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center p-4">
              <span className="text-white font-semibold text-lg">B</span>
            </div>
            <h2 className="text-xl font-semibold">
              {state.currentChat?.chatName}
            </h2>
          </div>
          {!state.currentChat?.endAt ? (
            <button
              onClick={endChat}
              className="text-red-500 hover:text-red-700 font-semibold py-2 rounded-md"
            >
              End Chat
            </button>
          ) : (
            <div className="text-sm text-gray-500">
              Ended at{" "}
              {new Date(state.currentChat.endAt).toLocaleTimeString() +
                " on " +
                new Date(state.currentChat.endAt).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col overflow-auto max-h-[460px] h-[460px]">
          {state.messages.length > 0 ? (
            state.messages.map((message) => (
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
            ))
          ) : (
            <div className="grow flex justify-center items-center text-gray-400">
              No messages history
            </div>
          )}
          {loading && <Loader />}
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
            disabled={state.currentChat?.endAt ? true : false}
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg disabled:bg-gray-400"
            disabled={state.currentChat?.endAt ? true : false}
          >
            Send
          </button>
        </div>
      </form>
      {
        <Popup
          isOpen={showRatingPopup}
          onClose={() => setShowRatingPopup(false)}
        >
          <div className="text-center text-lg font-medium mb-1">
            Rate Our Chat Bot Support
          </div>
          <RatingForm onRatingSubmit={handleRatingSubmit} />
        </Popup>
      }
    </div>
  );
};

export default ChatWindow;
