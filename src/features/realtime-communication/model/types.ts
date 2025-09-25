export type WebSocketStatus = "connecting" | "connected" | "disconnected" | "error";

export interface WebSocketMessage<T = unknown> {
    type: string;
    payload: T;
    timestamp: number;
    user?: string;
}

export interface CatAddedPayload {
    catName: string;
    id: string;
    timestamp: string;
}

export interface UserJoinedPayload {
    userName: string;
}

export interface CatLikedPayload {
    catId: string;
    catName: string;
    userId: string;
}

export interface ErrorPayload {
    message: string;
    code: string;
}

// Конкретные типы сообщений
export interface CatAddedMessage extends WebSocketMessage<CatAddedPayload> {
    type: "CAT_ADDED";
}

export interface UserJoinedMessage extends WebSocketMessage<UserJoinedPayload> {
    type: "USER_JOINED";
}

export interface CatLikedMessage extends WebSocketMessage<CatLikedPayload> {
    type: "CAT_LIKED";
}

export interface ErrorMessage extends WebSocketMessage<ErrorPayload> {
    type: "ERROR";
}

export type AppWebSocketMessage =
    | CatAddedMessage
    | UserJoinedMessage
    | CatLikedMessage
    | ErrorMessage;


export type WebSocketCallback<T = unknown> = (data: T) => void;
export type WebSocketEvent = "status" | "message" | "error";

export interface UseWebSocketReturn {
    status: WebSocketStatus;
    sendMessage: <T>(message: WebSocketMessage<T>) => void;
    sendAppMessage: (message: AppWebSocketMessage) => void;
    lastMessage: WebSocketMessage | null;
    connect: () => void;
    disconnect: () => void;
}