import { useContext } from "react";
import { ChatStateContext, ChatDispatchContext, UserDispatchContext, UserStateContext } from "./globalContext";

// custom hooks to use the context
export const useChatState = () => {
    const context = useContext(ChatStateContext);
    if (context === undefined) {
        throw new Error('useChatState must be used within a ChatProvider');
    }
    return context;
};

export const useChatDispatch = () => {
    const context = useContext(ChatDispatchContext);
    if (context === undefined) {
        throw new Error('useChatDispatch must be used within a ChatProvider');
    }
    return context;
};

export const useUserState = () => {
    const context = useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context;
}

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}