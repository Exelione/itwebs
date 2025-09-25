import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CatState } from "./types";


export const fetchCats = createAsyncThunk(
    "cats/fetchCats",
    async (limit: number) => {
        const response = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=${limit}`
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