import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import Button from "@/shared/ui/Button/Button";
import styles from "./AddCatModal.module.scss";

interface AddCatModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { name: string; image: File | null }) => void
    loading?: boolean
}

export const AddCatModal = ({ isOpen, onClose, onSubmit, loading = false }: AddCatModalProps) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Введите имя кота!");
            return;
        }

        onSubmit({ name: name.trim(), image });

        setName("");
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;


    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Добавить нового кота</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="catName">Имя кота:</label>
                        <input
                            id="catName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Например, Барсик"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="catImage">Фото кота:</label>
                        <input
                            id="catImage"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.actions}>
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className={styles.cancelButton}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? "Добавляем..." : "Добавить котика"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};