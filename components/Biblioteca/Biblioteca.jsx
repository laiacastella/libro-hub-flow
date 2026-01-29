import styles from "./Biblioteca.module.css";
import LibroCard from "@/components/LibroCard/LibroCard";

export default function Biblioteca() {
    return (
        <>
            <h2 className={styles.titular}>Biblioteca de Nombre</h2>
            <div className={styles.biblioteca}>
                <LibroCard />
            </div>
        </>
    );
}
