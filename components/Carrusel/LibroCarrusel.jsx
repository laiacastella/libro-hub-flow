import Image from "next/image";
import styles from "./LibroCarrusel.module.css";

export default function LibroCarrusel({ libro }) {
    const imagenSrc = libro.imagen || "https://via.placeholder.com/150x200?text=Sin+Portada";
    return (
        <div className={styles.libroCard}>
            <Image src={imagenSrc} alt="" className={styles.libroImage} width={150} height={200} unoptimized={imagenSrc.startsWith("https://via.placeholder.com")} />
            <h2 className={styles.libroTitulo}>{libro.titulo}</h2>
            <p className={styles.libroAutor}>{libro.autor}</p>
        </div>
    );
}
