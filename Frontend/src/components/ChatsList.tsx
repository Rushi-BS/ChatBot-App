import { useNavigate } from "react-router-dom";

const ChatsList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-1/2 w-1/2 md:w-1/3 mx-auto">
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
              {/* <p className="text-gray-500">Last message...</p> */}
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
            // window.prompt("Enter the name of the chat");
            navigate('/chat');
          }}
        >
          Start a New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatsList;
