import { WebSocketEvent, WebSocketCallback, WebSocketMessage, AppWebSocketMessage } from "../../model/types";

class WebSocketService {
    private socket: WebSocket | null = null;
    private listeners: Map<WebSocketEvent, WebSocketCallback[]> = new Map();

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onopen = (): void => this.emit("status", "connected");
        this.socket.onmessage = (event: MessageEvent): void => this.handleMessage(event);
        this.socket.onclose = (): void => this.emit("status", "disconnected");
        this.socket.onerror = (): void => this.emit("status", "error");
    }

    private handleMessage(event: MessageEvent): void {
        try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.emit("message", message);
        } catch {
            this.emit("message", {
                type: "raw",
                payload: event.data,
                timestamp: Date.now()
            } as WebSocketMessage);
        }
    }

    send<T>(message: WebSocketMessage<T> | AppWebSocketMessage): void {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn("WebSocket is not connected");
        }
    }

    on<T>(event: WebSocketEvent, callback: WebSocketCallback<T>): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback as WebSocketCallback<unknown>);
    }

    off<T>(event: WebSocketEvent, callback: WebSocketCallback<T>): void {
        const listeners = this.listeners.get(event);
        if (listeners) {
            const index = listeners.indexOf(callback as WebSocketCallback<unknown>);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    private emit<T>(event: WebSocketEvent, data: T): void {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach(callback => callback(data));
        }
    }

    disconnect(): void {
        this.socket?.close();
        this.socket = null;
    }

    get readyState(): number | undefined {
        return this.socket?.readyState;
    }
}

export const websocketService = new WebSocketService();
