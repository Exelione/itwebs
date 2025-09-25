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
