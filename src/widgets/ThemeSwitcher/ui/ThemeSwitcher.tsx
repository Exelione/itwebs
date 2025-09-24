import React, { FC } from "react";
import { Theme, useTheme } from "@/app/providers/ThemeProvider";
import MoonIcon from "@/shared/assets/icons/MoonIcon"
import SunIcon from "@/shared/assets/icons/SunIcon";
import { classNames } from "@/shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames("", {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
};

export default ThemeSwitcher;