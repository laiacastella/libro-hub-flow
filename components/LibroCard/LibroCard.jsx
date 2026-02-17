"use client"
import Link from "next/link"; // Necesario para navegar
import styles from "./LibroCard.module.css";

// Añadimos 'id' a las propiedades que recibe
export function LibroCard({ id, titulo, autor, imagen }) {
  const manejarErrorImagen = (e) => {
    if (!e.target.dataset.tried) {
      e.target.dataset.tried = "true";
      e.target.src = "https://via.placeholder.com/150x200?text=Sin+Portada";
    }
  };

  return (
    /* Envolvemos todo en un Link que apunte a tu nueva carpeta [id] */
    <Link href={`/con-marco/biblioteca/${id}`} className={styles.enlaceCard}>
      <div className={styles.libroCard}>
        <img 
          src={imagen || "https://via.placeholder.com/150x200?text=Sin+Portada"} 
          alt={titulo} 
          className={styles.libroImage}
          onError={manejarErrorImagen}
        />
        <div className={styles.contenido}>
          <h2 className={styles.libroTitulo}>{titulo}</h2>
          <p className={styles.libroAutor}>{autor}</p>
        </div>
      </div>
    </Link>
  );
}