import { useState, useEffect } from "react";
import { AddCatResponse } from "@/entities/cat/lib/types";
import { catApi } from "@/shared/api/catApi";
import Button, { ButtonSize } from "@/shared/ui/Button/Button";
import { AddCatModal } from "@/widgets/AddCatModal/ui/AddCatModal";
import styles from "./upload.module.scss";


interface UploadPageProps {
    serverTime: string;
    buildId: string;
}

export default function UploadPage({ serverTime, buildId }: UploadPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadHistory, setUploadHistory] = useState<AddCatResponse[]>([]);
    const [wsConnection, setWsConnection] = useState<"connected" | "disconnected">("disconnected");

    useEffect(() => {
        const savedHistory = localStorage.getItem("catUploadHistory");
        if (savedHistory) {
            setUploadHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("catUploadHistory", JSON.stringify(uploadHistory));
    }, [uploadHistory]);

    useEffect(() => {
        const connectWebSocket = () => {
            try {
                const ws = new WebSocket("wss://ws.postman-echo.com/raw");

                ws.onopen = () => {
                    console.log("WebSocket connected");
                    setWsConnection("connected");
                };

                ws.onmessage = (event) => {
                    console.log("WebSocket message:", event.data);
                };

                ws.onclose = () => {
                    console.log("WebSocket disconnected");
                    setWsConnection("disconnected");
                };

                return ws;
            } catch (error) {
                console.error("WebSocket error:", error);
                return null;
            }
        };

        const ws = connectWebSocket();
        return () => ws?.close();
    }, []);

    const handleSubmit = async (formData: { name: string; image: File | null }) => {
        setLoading(true);

        try {
            console.log("📤 Отправка POST-запроса:", formData.name);

            const response = await catApi.addCat(formData);

            setUploadHistory(prev => [response, ...prev]);
            setIsModalOpen(false);

            console.log("✅ POST-запрос успешен");

        } catch (error) {
            console.error("❌ Ошибка POST-запроса:", error);
            alert("Произошла ошибка при добавлении котика");
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = () => {
        setUploadHistory([]);
        localStorage.removeItem("catUploadHistory");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Добавить кота 🐱 (ISR)</h1>
            <p className={styles.subtitle}>
                Страница сгенерирована: {serverTime} | Build: {buildId}
            </p>

            <div className={styles.websocketStatus}>
                WebSocket: <span className={wsConnection === "connected" ? styles.connected : styles.disconnected}>
                    {wsConnection === "connected" ? "🟢 Подключен" : "🔴 Отключен"}
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
                        <h3>История загрузок ({uploadHistory.length})</h3>
                        <Button
                            onClick={clearHistory}
                            size={ButtonSize.XL}
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
                <p>Статус: {wsConnection}</p>
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
    const buildId = Math.random().toString(36).toUpperCase();

    return {
        props: { serverTime, buildId },
        revalidate: 30,
    };
}