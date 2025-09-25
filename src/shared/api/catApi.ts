import { AddCatResponse, CatFormData } from "@/entities/cat/lib/types";
import { fetchWithRetry } from "@/shared/lib/network/fetchWithTimeout";

export const catApi = {
    async addCat(catData: CatFormData): Promise<AddCatResponse> {
        const cacheBuster = `cb=${Date.now()}`;
        const response = await fetchWithRetry(`/api/addCat?${cacheBuster}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: catData.name }),
            cache: "no-store",
            mode: "cors",
            credentials: "omit",
            timeoutMs: 10000,
            retries: 2,
            retryDelayMs: 400,
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        return {
            id: data.id.toString(),
            name: catData.name,
            imageUrl: catData.image ? URL.createObjectURL(catData.image) : "",
            success: true
        };
    }
};