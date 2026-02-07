import styles from "./Biblioteca.module.css";
import { CardLibro } from "../index.js";

export default function Biblioteca() {
    return (
        <>
            <div className={styles.biblioteca}>
                <CardLibro />
            </div>
        </>
    );
}
