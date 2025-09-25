import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWithRetry } from "@/shared/lib/network/fetchWithTimeout";
import { CatState } from "../lib/types";

export const fetchCats = createAsyncThunk(
    "cats/fetchCats",
    async (limit: number) => {
        const cacheBuster = `cb=${Date.now()}`;
        const apiKey = process.env.NEXT_PUBLIC_CAT_API_KEY;
        const response = await fetchWithRetry(
            `https://api.thecatapi.com/v1/images/search?limit=${limit}&${cacheBuster}`,
            {
                cache: "no-store",
                mode: "cors",
                credentials: "omit",
                headers: apiKey ? { "x-api-key": apiKey } : undefined,
                timeoutMs: 10000,
                retries: 2,
                retryDelayMs: 400,
            }
        );
        const data = await response.json();
        return data;
    }
);

const initialState: CatState = {
    items: [],
    favorites: [],
    loading: false,
    error: null,
};

const catSlice = createSlice({
    name: "cats",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const index = state.favorites.indexOf(action.payload);
            if (index === -1) {
                state.favorites.push(action.payload);
            } else {
                state.favorites.splice(index, 1);
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCats.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка загрузки";
            });
    },
});

export const { toggleFavorite, clearError } = catSlice.actions;
export default catSlice.reducer;