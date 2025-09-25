import {
    WebSocketMessage,
    CatAddedMessage,
    UserJoinedMessage,
    CatLikedMessage,
    ErrorMessage,
    AppWebSocketMessage,
    CatAddedPayload,
    UserJoinedPayload,
    CatLikedPayload,
    ErrorPayload
} from "../../model/types";

export const messageFactory = {
    createCatAddedMessage(catName: string, id: string, user?: string): CatAddedMessage {
        const payload: CatAddedPayload = {
            catName,
            id,
            timestamp: new Date().toISOString()
        };

        return {
            type: "CAT_ADDED",
            payload,
            timestamp: Date.now(),
            user
        };
    },

    createUserJoinedMessage(userName: string, user?: string): UserJoinedMessage {
        const payload: UserJoinedPayload = { userName };

        return {
            type: "USER_JOINED",
            payload,
            timestamp: Date.now(),
            user
        };
    },

    createCatLikedMessage(catId: string, catName: string, userId: string, user?: string): CatLikedMessage {
        const payload: CatLikedPayload = {
            catId,
            catName,
            userId
        };

        return {
            type: "CAT_LIKED",
            payload,
            timestamp: Date.now(),
            user
        };
    },

    createErrorMessage(message: string, code: string = "UNKNOWN", user?: string): ErrorMessage {
        const payload: ErrorPayload = {
            message,
            code
        };

        return {
            type: "ERROR",
            payload,
            timestamp: Date.now(),
            user
        };
    },

    // Type guards
    isCatAddedMessage(message: WebSocketMessage): message is CatAddedMessage {
        return message.type === "CAT_ADDED";
    },

    isUserJoinedMessage(message: WebSocketMessage): message is UserJoinedMessage {
        return message.type === "USER_JOINED";
    },

    isCatLikedMessage(message: WebSocketMessage): message is CatLikedMessage {
        return message.type === "CAT_LIKED";
    },

    isErrorMessage(message: WebSocketMessage): message is ErrorMessage {
        return message.type === "ERROR";
    },

    isAppWebSocketMessage(message: WebSocketMessage): message is AppWebSocketMessage {
        return [
            "CAT_ADDED",
            "USER_JOINED",
            "CAT_LIKED",
            "ERROR"
        ].includes(message.type);
    }
};