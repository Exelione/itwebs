import { useState, useEffect, useCallback } from "react";
import { AddCatResponse } from "@/entities/cat/lib/types";


const STORAGE_KEY = "catUploadHistory";

interface UseUploadHistoryReturn {
    uploadHistory: AddCatResponse[];
    addToHistory: (response: AddCatResponse) => void;
    clearHistory: () => void;
    totalUploads: number;
    lastUpload: AddCatResponse | null;
}

export const useUploadHistory = (): UseUploadHistoryReturn => {
    const [uploadHistory, setUploadHistory] = useState<AddCatResponse[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed: AddCatResponse[] = JSON.parse(saved);
                setUploadHistory(parsed);
            } catch (error) {
                console.error("Error parsing upload history:", error);
                setUploadHistory([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadHistory));
    }, [uploadHistory]);

    const addToHistory = useCallback((response: AddCatResponse): void => {
        setUploadHistory(prev => [response, ...prev]);
    }, []);

    const clearHistory = useCallback((): void => {
        setUploadHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const totalUploads = uploadHistory.length;
    const lastUpload = uploadHistory[0] || null;

    return {
        uploadHistory,
        addToHistory,
        clearHistory,
        totalUploads,
        lastUpload
    };
};