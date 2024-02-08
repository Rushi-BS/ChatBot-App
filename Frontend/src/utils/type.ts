export type ApiResponse<T> = {
    data: {
        message: string,
        error: boolean,
        code: number,
        results?: T
    };
    status: number;
};

export type MessageType = {
    id: string | number;
    sender: "user" | "bot" | "agent";
    text: string;
    timestamp: Date;
};

export type ChatType = {
    chatName: string;
    endAt: Date | null;
    feedback: string | null;
    id: number;
    isAgentPresent: boolean;
    isDeleted: boolean;
    rating: 0 | 1 | 2 | 3 | 4 | 5 | null;
    startAt: Date;
};

export type ChatStateType = {
    chatsList: Array<ChatType>;
    currentChat: ChatType | null;
    messages: Array<MessageType>;
};

export type ChatActionType = {
    type: "SET_CURRENT_CHAT" | "SET_CHATS_LIST" | "SET_MESSAGES" | "ADD_CHAT" | "ADD_MESSAGE" | "DELETE_CHAT";
    payload?: ChatType | Array<ChatType> | MessageType | Array<MessageType>;
};

export type UserType = {
    email: string;
    id: string;
    name: string;
};

export type UserStateType = {
    isAuthenticated: boolean;
    user: UserType | null;
};

export type UserActionType = {
    type: "LOGIN" | "LOGOUT" | "UPDATE_USER";
    payload?: {
        email: string;
        id: string;
        name: string;
    };
};

export type SignUpPropType = {
    formData: {
        email: string;
        password: string;
        confirmPassword: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type SignInPropType = {
    formData: {
        email: string;
        password: string;
        rememberMe: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type PopupProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
  };