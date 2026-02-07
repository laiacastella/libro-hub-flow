import { useState, useEffect } from "react";
import styles from "./CardLibro.module.css";

export default function Biblioteca() {
    // Estado para almacenar los libros
    const [libros, setLibros] = useState([]);
    // Prueba de conexión a la API
    useEffect(() => {
        fetch("/api/libros")
            .then((res) => res.json())
            .then((data) => setLibros(data));
    }, []);
    return libros.map((libro) => (
        <div key={libro.id_libro} className={styles.libroCard}>
            <img src={libro.foto_portada} alt={libro.titulo} className={styles.libroImage} />
            <h2 className={styles.libroTitulo}>{libro.titulo}</h2>
            <p className={styles.libroAutor}>{libro.autor}</p>
        </div>
    ));
}
