import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
    theme: Theme,
    toggleTheme: () => void,
}

export function useTheme(): UseThemeResult {
    const context = useContext(ThemeContext);
    if (!context.theme || !context.setTheme) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    const { theme, setTheme } = context;

    const toggleTheme = () => {
        const newTheme = theme === Theme.NORMAL ? Theme.DARK : Theme.NORMAL;
        setTheme(newTheme);
        if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        }
    };

    return {
        theme,
        toggleTheme,
    };
}