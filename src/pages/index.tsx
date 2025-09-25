import { makeStore } from "@/app/store";
import { RootState } from "@/app/store";
import { fetchCats } from "@/entities/cat/model/catSlice";
import { CatList } from "@/entities/cat/ui/CatList/CatList";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import styles from "./index.module.scss";

interface HomeProps {
    initialReduxState?: RootState
}

export default function HomePage({ initialReduxState }: HomeProps) {

    const { items: cats, loading, error } = useAppSelector((state) => state.cats);

    if (!initialReduxState && loading) return <div className={styles.loading}>Загружаем котиков...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Тут есть коты! 🐱 (SSR)</h1>
            {initialReduxState ? "🔄 Загружено на сервере" : "💻 Загружено на клиенте"}: {cats.length} котов
            <CatList cats={cats} />
        </div>
    );
}

export async function getServerSideProps() {
    const store = makeStore();
    await store.dispatch(fetchCats(1));

    return {
        props: {
            initialReduxState: store.getState()
        }
    };
}