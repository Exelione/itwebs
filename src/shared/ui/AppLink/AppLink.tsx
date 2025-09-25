import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
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
    const isActive = href === "/"
        ? pathname === "/"
        : pathname?.startsWith(href);

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