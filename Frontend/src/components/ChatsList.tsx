import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponse, ChatType } from "../utils/type";
import ApiHelper from "../utils/ApiHelper";
import toast from "react-hot-toast";
import { useChatDispatch, useChatState } from "./context/contextHooks";

const apiHelper = new ApiHelper();

const ChatsList: React.FC = () => {
  const navigate = useNavigate();
  const state = useChatState();
  const dispatch = useChatDispatch();
  const userId = "3"; // Hardcoded user ID for now

  const fetchChatsList = async () => {
    try {
      const response: ApiResponse<Array<ChatType>> = await apiHelper.get(
        `/chat/${userId}/chatsList`
      );
      // console.log("Response:", response);
      const { results } = response.data;
      if (results) {
        // console.log("Chats list:", results);
        dispatch({ type: "SET_CHATS_LIST", payload: results });
      }
    } catch (error) {
      console.error("Error fetching chats list:", error);
    }
  };

  const startNewChat = async () => {
    try {
      const chatName = window.prompt("Enter the name for new chat");
      if (chatName) {
        const reqBody = {
          chatName,
        };
        const response: ApiResponse<ChatType> = await apiHelper.post(
          `/chat/${userId}/start`,
          reqBody
        );
        // console.log("Response:", response);
        const { results } = response.data;
        if (results) {
          dispatch({ type: "ADD_CHAT", payload: results });
          dispatch({ type: "SET_CURRENT_CHAT", payload: results });
          navigate(`/chat/${results.id}`);
        }
      } else {
        toast.error("Chat name cannot be empty");
      }
    } catch (error) {
      toast.error("Failed to start new chat. Please try again.");
    }
  };

  const openChat = (chat: ChatType) => {
    dispatch({ type: "SET_CURRENT_CHAT", payload: chat });
    navigate(`/chat/${chat.id}`);
  }

  useEffect(() => {
    fetchChatsList();
  }, []);

  return (
    <div className="max-w-1/2 w-1/2 md:w-1/3 mx-auto">
      {/* List of user chats */}
      <div className="space-y-4">
        {/* Chat item */}
        {state.chatsList.map((chat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out"
            onClick={() => openChat(chat)}
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">C</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{chat.chatName}</h2>
                {/* <p className="text-gray-500">Last message...</p> */}
              </div>
            </div>
            <div>
              <p className="text-gray-500">
                {new Date(chat.startAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Start a new chat button */}
      <div className="mt-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full w-full"
          onClick={startNewChat}
        >
          Start a New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatsList;
