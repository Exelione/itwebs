import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import cls from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher />
            <div className={cls.links}>
                <AppLink href="/">Главная</AppLink>
                <AppLink href="/about">О нас</AppLink>
                <AppLink href="/favorites">Избранное</AppLink>
                <AppLink href="/upload">Загрузить кота</AppLink>
            </div>
        </nav>
    );
};

export default Navbar;