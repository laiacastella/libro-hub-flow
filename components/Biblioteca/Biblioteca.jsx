import styles from "./Biblioteca.module.css";
import LibroCard from "@/components/LibroCard/LibroCard";

export default function Biblioteca() {
    return (
        <>
            <div className={styles.biblioteca}>
                <LibroCard />
            </div>
        </>
    );
}
