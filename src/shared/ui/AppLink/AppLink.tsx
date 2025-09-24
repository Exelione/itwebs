import Link from "next/link";
import { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";
import { usePathname } from "next/navigation";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    RED = "red",
}

interface AppLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
    theme?: AppLinkTheme;
    activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        href,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        activeClassName = cls.active,
        ...otherProps
    } = props;

    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={classNames(
                cls.AppLink,
                { [activeClassName]: !!isActive },
                [className, cls[theme]]
            )}
            {...otherProps}
        >
            {children}
        </Link>
    );
};

export default AppLink;