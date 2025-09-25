import { makeStore } from "@/app/store";
import { RootState } from "@/app/store";
import { fetchCats } from "@/entities/cat/model/catSlice";
import { CatList } from "@/entities/cat/ui/CatList/CatList";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import Button, { ButtonSize } from "@/shared/ui/Button/Button";
import styles from "./index.module.scss";

interface HomeProps {
    initialReduxState?: RootState
}

export default function HomePage({ initialReduxState }: HomeProps) {
    const uploadCats = () => {
        window.location.reload();
    };

    const { items: cats, loading, error } = useAppSelector((state) => state.cats);

    if (!initialReduxState && loading) return <div className={styles.loading}>Загружаем котиков...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Коты на любой вкус! 🐱</h1>
            {initialReduxState && cats.length > 0 &&
             <Button className={styles.uploadButton} size={ButtonSize.M} onClick={uploadCats}>Обновить котосписок</Button>
            }
            <CatList cats={cats} />
        </div>
    );
}

export async function getServerSideProps() {
    const store = makeStore();
    await store.dispatch(fetchCats(10));

    return {
        props: {
            initialReduxState: store.getState()
        }
    };
}