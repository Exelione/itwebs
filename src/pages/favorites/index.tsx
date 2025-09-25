import { useEffect, useState } from "react";
import { Cat } from "@/entities/cat/model/types";
import { CatList } from "@/entities/cat/ui/CatList/CatList";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import styles from "./favorites.module.scss";

export default function Favorites() {
    const { items: allCats, favorites } = useAppSelector((state) => state.cats);
    const [favoriteCats, setFavoriteCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const favCats = allCats.filter(cat => favorites.includes(cat.id));
        setFavoriteCats(favCats);
        setLoading(false);
    }, [allCats, favorites]);

    if (loading) return <div className={styles.loading}>Загружаем любимых котиков...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Любимые котики ❤️</h1>
            {favoriteCats.length === 0 ? (
                <p className={styles.empty}>У вас пока нет любимых котиков</p>
            ) : (
                <>
                    <p className={styles.subtitle}>Котики, которых вы лайкнули:</p>
                    <CatList cats={favoriteCats} />
                </>
            )}
        </div>
    );
}