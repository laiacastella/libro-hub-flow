import styles from "./Biblioteca.module.css";
import { CardLibro } from "../index.js";

export default function Biblioteca({setLibroSeleccionado, libroSeleccionado}) {
    return (
            <div className={styles.biblioteca}>
                <CardLibro 
                setLibroSeleccionado={setLibroSeleccionado}
                libroSeleccionado={libroSeleccionado}
                />
            </div>
    );
}
