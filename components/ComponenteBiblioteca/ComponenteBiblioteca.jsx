import styles from "./ComponenteBiblioteca.module.css";
import { CardLibro } from "@/components";

export default function ComponenteBiblioteca({ setLibroSeleccionado, libroSeleccionado }) {
    return (
        <div className={styles.biblioteca}>
            <CardLibro setLibroSeleccionado={setLibroSeleccionado} libroSeleccionado={libroSeleccionado} />
        </div>
    );
}
