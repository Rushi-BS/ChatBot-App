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
    id: number;
    sender: "user" | "bot" | "support";
    text: string;
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