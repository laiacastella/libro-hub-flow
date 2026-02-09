"use client"
import styles from "./LibroCard.module.css";

export function LibroCard({ titulo, autor, imagen }) {

     const manejarErrorImagen = (e) => {
    e.target.src = "https://via.placeholder.com/150x200?text=Sin+Portada";
  };

    return (
        <div className={styles.libroCard}>
            <img 
                src={imagen || '/portada-por-defecto.png'} 
                alt={titulo} 
                className={styles.libroImage}
                onError={manejarErrorImagen}
            />
            <div className={styles.contenido}>
                <h2 className={styles.libroTitulo}>{titulo}</h2>
                <p className={styles.libroAutor}>{autor}</p>
            </div>
        </div>
    );
}