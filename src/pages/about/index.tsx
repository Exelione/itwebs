import styles from "./about.module.scss";

// SSG - статичная страница
export default function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>О нас</h1>
            <div className={styles.content}>
                <p>Мы любим котиков и делаем для них всё возможное! 🐾</p>
                <p>Наш проект помогает находить дома для бездомных котиков.</p>
            </div>
        </div>
    );
}

// SSG - статическая генерация
export async function getStaticProps() {
    return {
        props: {},
        revalidate: 3600 // перегенерируем раз в час
    };
}