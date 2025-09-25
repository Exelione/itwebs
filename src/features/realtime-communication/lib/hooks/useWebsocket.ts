import { useState, useEffect, useCallback } from "react";
import {
    WebSocketStatus,
    WebSocketMessage,
    UseWebSocketReturn,
    AppWebSocketMessage
} from "../../model/types";
import { websocketService } from "../config/websocket";

export const useWebSocket = (url: string = "wss://ws.postman-echo.com/raw"): UseWebSocketReturn => {
    const [status, setStatus] = useState<WebSocketStatus>("disconnected");
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

    useEffect(() => {
        const handleStatusChange = (newStatus: WebSocketStatus): void => {
            setStatus(newStatus);
        };

        const handleMessage = (message: WebSocketMessage): void => {
            setLastMessage(message);
            console.log("WebSocket message received:", message);
        };

        const handleError = (error: unknown): void => {
            console.error("WebSocket error:", error);
            setStatus("error");
        };

        websocketService.on("status", handleStatusChange);
        websocketService.on("message", handleMessage);
        websocketService.on("error", handleError);

        websocketService.connect(url);

        return (): void => {
            websocketService.off("status", handleStatusChange);
            websocketService.off("message", handleMessage);
            websocketService.off("error", handleError);
            websocketService.disconnect();
        };
    }, [url]);

    const connect = useCallback((): void => {
        websocketService.connect(url);
    }, [url]);

    const disconnect = useCallback((): void => {
        websocketService.disconnect();
    }, []);

    const sendMessage = useCallback(<T,>(message: WebSocketMessage<T>): void => {
        websocketService.send(message);
    }, []);

    const sendAppMessage = useCallback((message: AppWebSocketMessage): void => {
        websocketService.send(message);
    }, []);

    return {
        status,
        sendMessage,
        sendAppMessage,
        lastMessage,
        connect,
        disconnect
    };
};