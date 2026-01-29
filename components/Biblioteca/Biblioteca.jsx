import styles from "./Biblioteca.module.css";
import LibroCard from "@/components/LibroCard/LibroCard";

export default function Biblioteca() {
    return (
        <div className={styles.fondoPerfil}>
            <h2 className={styles.titular}>Biblioteca</h2>
            <div className={styles.biblioteca}>
                <LibroCard />
            </div>
        </div>
    );
}
