import data from "@/data/libros.json";
import styles from "./Biblioteca.module.css";

const libros = data.libros;

export default function Biblioteca() {
    return (
        <div className={styles.fondoPerfil}>
            <h2 className={styles.titular}>Biblioteca</h2>
            <div className={styles.biblioteca}>
                {libros.map((libro) => (
                    <div key={libro.id} className={styles.libroCard}>
                        <img src={libro.imagen} alt={libro.titulo} className={styles.libroImage} />
                        <h2 className={styles.libroTitulo}>{libro.titulo}</h2>
                        <p className={styles.libroAutor}>{libro.autor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
