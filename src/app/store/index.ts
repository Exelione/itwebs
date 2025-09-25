import { configureStore } from "@reduxjs/toolkit";
import catReducer from "@/entities/cat/model/catSlice";
import { CatState } from "@/entities/cat/model/types";

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