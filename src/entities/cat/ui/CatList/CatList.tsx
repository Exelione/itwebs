import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux";
import Button, { ButtonSize } from "@/shared/ui/Button/Button";
import { Cat } from "../../lib/types";
import { toggleFavorite } from "../../model/catSlice";
import styles from "./CatList.module.scss";

interface CatListProps {
  cats: Cat[]
}

export const CatList = ({ cats }: CatListProps) => {
    const dispatch = useAppDispatch();
    const { favorites } = useAppSelector((state) => state.cats);

    const handleLike = (catId: string) => {
        dispatch(toggleFavorite(catId));
    };

    const uploadCats = () => {
        window.location.reload();
    };

    if (cats.length === 0) {
        return <div className={styles.empty}>
            Котов пока нет 😿
            <Button size={ButtonSize.M} onClick={uploadCats}>Загрузить котов</Button>
        </div>;
    }

    return (
        <div className={styles.list}>
            {cats.map((cat) => (
                <div key={cat.id} className={styles.card}>
                    <Image
                        src={cat.url}
                        alt="Cat"
                        className={styles.image}
                        width={cat.width || 300}
                        height={cat.height || 300}
                    />
                    <div className={styles.info}>
                        <span>ID: {cat.id.slice(0, 8)}...</span>
                        <button
                            className={`${styles.likeButton} ${
                                favorites.includes(cat.id) ? styles.liked : ""
                            }`}
                            onClick={() => handleLike(cat.id)}
                        >
                            {favorites.includes(cat.id) ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
