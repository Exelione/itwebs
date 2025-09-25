import { AddCatResponse, CatFormData } from "@/entities/cat/lib/types";


export const catApi = {
    async addCat(catData: CatFormData): Promise<AddCatResponse> {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: catData.name }),
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