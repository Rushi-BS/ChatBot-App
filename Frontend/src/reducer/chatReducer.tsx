import {
  ChatActionType,
  ChatStateType,
  ChatType,
  MessageType,
} from "../utils/type";

export const chatIntialState: ChatStateType = {
  chatsList: [],
  currentChat: null,
  messages: [],
};

const chatReducer = (state: ChatStateType, action: ChatActionType) => {
  switch (action.type) {
    case "SET_CHATS_LIST":
      return {
        ...state,
        chatsList: action.payload as Array<ChatType>,
      };

    case "SET_CURRENT_CHAT":
      return {
        ...state,
        currentChat: action.payload as ChatType,
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload as Array<MessageType>,
      };

    case "ADD_CHAT":
      return {
        ...state,
        chatsList: [...state.chatsList, action.payload as ChatType],
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload as MessageType],
      };

    case "DELETE_CHAT":
      return {
        ...state,
        chatsList: state.chatsList.filter(
          (chat) => chat.id !== (action.payload as ChatType).id
        ),
      };

    default:
      return state;
  }
};

export default chatReducer;
