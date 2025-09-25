import Paws from "@/shared/assets/icons/Paws";
import styles from "./about.module.scss";

export default function About() {
    return (
        <div className={styles.container}>

            <h1 className={styles.title}>О нас</h1>

            <div className={styles.content}>
                <p>
                    Наш алгоритм подбора котов использует чтение мыслей и анализирует текущее настроение пользователя.
                </p>

                <p>Так же сейчас у тебя есть уникальная возможность загрузить своего собственного кота, успевай до конца действия акции!</p>
                <p className={styles.rendering}>Рендеринг: Главная - SSR, О нас -  SSG, Избранное - CSR, Добавление кота - ISR </p>
                <Paws size={500} className={styles.paws}/>
            </div>

        </div>
    );
}
