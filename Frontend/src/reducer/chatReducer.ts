import {
  ChatActionType,
  ChatStateType,
  ChatType,
  MessageType,
} from "../utils/type";

// Function to initialize state from localStorage
const initializeChatStateFromLocalStorage = () : ChatStateType => {
  const storedChatState = localStorage.getItem('chatState');
  return storedChatState ? JSON.parse(storedChatState) : {
    chatsList: [],
    currentChat: null,
    messages: [],
  };
};

export const chatIntialState: ChatStateType = initializeChatStateFromLocalStorage();

const chatReducer = (state: ChatStateType, action: ChatActionType) => {
  let newState;
  switch (action.type) {
    case "SET_CHATS_LIST":
      newState = {
        ...state,
        chatsList: action.payload as Array<ChatType>,
      };
      localStorage.setItem('chatState', JSON.stringify(newState));
      return newState;

    case "SET_CURRENT_CHAT":
      newState = {
        ...state,
        currentChat: action.payload as ChatType,
      };
      localStorage.setItem('chatState', JSON.stringify(newState));
      return newState;

    case "SET_MESSAGES":
      newState = {
        ...state,
        messages: action.payload as Array<MessageType>,
      };
      localStorage.setItem('chatState', JSON.stringify(newState));
      return newState;

    case "ADD_CHAT":
      newState = {
        ...state,
        chatsList: [...state.chatsList, action.payload as ChatType],
      };
      localStorage.setItem('chatState', JSON.stringify(newState));
      return newState;

    case "ADD_MESSAGE":
      newState = {
        ...state,
        messages: [...state.messages, action.payload as MessageType],
      };
      localStorage.setItem('chatState', JSON.stringify(newState));
      return newState;

    case "DELETE_CHAT":
      newState = {
        ...state,
        chatsList: state.chatsList.filter(
          (chat) => chat.id !== (action.payload as ChatType).id
        ),
      };
      localStorage.setItem('chatState', JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default chatReducer;