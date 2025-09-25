import { AddCatResponse, CatFormData } from "@/entities/cat/lib/types";


export const catApi = {
    async addCat(catData: CatFormData): Promise<AddCatResponse> {
        const formData = new FormData();
        formData.append("name", catData.name);
        if (catData.image) {
            formData.append("image", catData.image);
        }

        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: formData,
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