import styles from "./Biblioteca.module.css";
import { CardLibro } from "@/components";

export default function Biblioteca({ setLibroSeleccionado, libroSeleccionado }) {
    return (
        <div className={styles.biblioteca}>
            <CardLibro setLibroSeleccionado={setLibroSeleccionado} libroSeleccionado={libroSeleccionado} />
        </div>
    );
}
