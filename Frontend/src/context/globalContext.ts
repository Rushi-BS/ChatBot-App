import { Dispatch, createContext } from "react";
import { ChatActionType, ChatStateType, UserActionType, UserStateType } from "../utils/type";

export const ChatStateContext = createContext<ChatStateType>({} as ChatStateType);
export const ChatDispatchContext = createContext<Dispatch<ChatActionType>>(() => {});
export const UserStateContext = createContext<UserStateType>({} as UserStateType);
export const UserDispatchContext = createContext<Dispatch<UserActionType>>(() => {});