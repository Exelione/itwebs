export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface CatState {
    items: Cat[];
    favorites: string[];
    loading: boolean;
    error: string | null;
}

export interface CatFormData {
    name: string;
    image: File | null;
}

export interface AddCatResponse {
    id: string;
    name: string;
    imageUrl: string;
    success: boolean;
}