import { FC, useMemo, useState, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../lib/ThemeContext";

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || Theme.NORMAL);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
        }
    }, [theme]);

    const contextValue = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={classNames("app", {}, [theme])}>
                {children}
            </div>

        </ThemeContext.Provider>
    );
};

export default ThemeProvider;