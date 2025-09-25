"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, RootState } from "@/app/store";

interface StoreProviderProps {
  children: React.ReactNode
  initialState?: RootState
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore(initialState);
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};
