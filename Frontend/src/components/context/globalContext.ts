import { Dispatch, createContext } from "react";
import { ChatActionType, ChatStateType } from "../../utils/type";

export const ChatStateContext = createContext<ChatStateType>({} as ChatStateType);
export const ChatDispatchContext = createContext<Dispatch<ChatActionType>>(() => {});
