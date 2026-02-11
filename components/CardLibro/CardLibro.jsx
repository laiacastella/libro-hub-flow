import { useState, useEffect } from "react";
import styles from "./CardLibro.module.css";

export default function Biblioteca(userId, todos=true) {
  // Estado para almacenar los libros
  const [libros, setLibros] = useState([]);
  const [libroSeleccionadoId, setLibroSeleccionadoId] = useState(null);

  // todos los libros y por usuario
  useEffect(() => {

    const endpoint =
      todos === false ? `/api/libros/usuario/${userId}` : "/api/libros";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setLibros(data));
  }, [todos, userId]);

  return libros.map((libro) => (
    <div key={libro.id_libro} className={`${styles.libroCard} ${
            libro.id_libro === libroSeleccionadoId ? styles.seleccionado : ""
          }`}
          onClick={() => setLibroSeleccionadoId(libro.id_libro)}>
      <img
        src={libro.foto_portada}
        alt={libro.titulo}
        className={styles.libroImage}
      />
      <h2 className={styles.libroTitulo}>{libro.titulo}</h2>
      <p className={styles.libroAutor}>{libro.autor}</p>
    </div>
  ));
}
