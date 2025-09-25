import { useState } from "react";
import { AddCatResponse } from "@/entities/cat/lib/types";
import { useWebSocket } from "@/features/realtime-communication/lib/hooks/useWebsocket";
import { messageFactory } from "@/features/realtime-communication/lib/utils/messageFactory";
import { WebSocketStatus } from "@/features/realtime-communication/model/types";
import { useUploadHistory } from "@/features/upload-manager/lib/hooks/useUploadHistory";
import { catApi } from "@/shared/api/catApi";
import Button from "@/shared/ui/Button/Button";
import { AddCatModal } from "@/widgets/AddCatModal/ui/AddCatModal";
import styles from "./upload.module.scss";


interface UploadPageProps {
    serverTime: string;
    buildId: string;
}

interface WebSocketStatusDisplay {
    text: string;
    emoji: string;
    className: string;
}

const getWebSocketStatusDisplay = (status: WebSocketStatus): WebSocketStatusDisplay => {
    const statusMap: Record<string, WebSocketStatusDisplay> = {
        connected: { text: "Подключен", emoji: "🟢", className: styles.connected },
        connecting: { text: "Подключение...", emoji: "🟡", className: styles.connecting },
        disconnected: { text: "Отключен", emoji: "🔴", className: styles.disconnected },
        error: { text: "Ошибка", emoji: "🔴", className: styles.error }
    };

    return statusMap[status] || statusMap.disconnected;
};

export default function UploadPage({ serverTime, buildId }: UploadPageProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { uploadHistory, addToHistory, clearHistory, totalUploads } = useUploadHistory();
    const { status, sendMessage, lastMessage } = useWebSocket();

    const statusDisplay = getWebSocketStatusDisplay(status);

    const handleSubmit = async (formData: { name: string; image: File | null }): Promise<void> => {
        setLoading(true);

        try {
            console.log("📤 Отправка POST-запроса:", formData.name);

            const response: AddCatResponse = await catApi.addCat(formData);

            addToHistory(response);
            setIsModalOpen(false);

            const catMessage = messageFactory.createCatAddedMessage(
            response.name,
            response.id,
            `User_${Math.random().toString(36)}`
        );

            sendMessage(catMessage);


            console.log("✅ POST-запрос успешен");

        } catch (error) {
            console.error("❌ Ошибка POST-запроса:", error);
            const errorMessage = messageFactory.createErrorMessage(
            error instanceof Error ? error.message : "Unknown error",
            "UPLOAD_ERROR"
        );

        sendMessage(errorMessage);
            alert("Произошла ошибка при добавлении котика");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Добавить кота 🐱</h1>
            <p className={styles.subtitle}>
                Страница сгенерирована: {serverTime} | Build: {buildId}
            </p>

            <div className={styles.websocketStatus}>
                WebSocket: <span className={statusDisplay.className}>
                    {statusDisplay.emoji} {statusDisplay.text}
                </span>
            </div>

            <Button
                className={styles.addButton}
                onClick={() => setIsModalOpen(true)}
            >
                📸 Добавить котика
            </Button>

            {uploadHistory.length > 0 && (
                <div className={styles.historySection}>
                    <div className={styles.historyHeader}>
                        <h3>История загрузок ({totalUploads})</h3>
                        <Button
                            onClick={clearHistory}
                            className={styles.clearButton}
                        >
                            🗑️ Очистить
                        </Button>
                    </div>

                    <div className={styles.historyList}>
                        {uploadHistory.map((item, index) => (
                            <div key={`${item.id}-${index}`} className={styles.historyItem}>
                                <div className={styles.itemHeader}>
                                    <span className={styles.catName}>{item.name}</span>
                                    <span className={styles.itemIndex}>#{index + 1}</span>
                                </div>
                                <div className={styles.itemDetails}>
                                    <span>ID: {item.id}</span>
                                    <span>Статус: ✅ Успешно</span>
                                    {item.imageUrl && <span>Фото: 📷 Загружено</span>}
                                </div>
                                <div className={styles.postData}>
                                    <strong>POST данные:</strong> имя={item.name}, изображение={item.imageUrl ? "да" : "нет"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.websocketDemo}>
                <h3>Демонстрация WebSocket</h3>
                <p>При добавлении кота отправляется уведомление через WebSocket</p>
                <p>Статус: {statusDisplay.text}</p>
                {lastMessage && (
                    <p>Последнее сообщение: {lastMessage.type}</p>
                )}
            </div>

            <AddCatModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}

export async function getStaticProps() {
    const serverTime = new Date().toLocaleString("ru-RU");
    const buildId = Math.random().toString(36).substr(2, 6).toUpperCase();

    return {
        props: { serverTime, buildId },
        revalidate: 30,
    };
}