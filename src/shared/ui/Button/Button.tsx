import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}
export enum ButtonSize {
    M = "size_m",
    L = "size_l",
    XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        size = ButtonSize.M,
        type = "button",
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls[size]]: true,
        [cls.square]: !!square,
        ...(theme && cls[theme] ? { [cls[theme]]: true } : {}),
    };

    return (
        <button
            type={type}
            className={classNames(cls.Button, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>

    );
};

export default Button;