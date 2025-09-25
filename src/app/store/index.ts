import { configureStore } from "@reduxjs/toolkit";
import { CatState } from "@/entities/cat/lib/types";
import catReducer from "@/entities/cat/model/catSlice";

type PreloadedState = {
  cats: CatState
}

export const makeStore = (preloadedState?: PreloadedState) => {
    return configureStore({
        reducer: {
            cats: catReducer,
        },
        preloadedState,
    });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]