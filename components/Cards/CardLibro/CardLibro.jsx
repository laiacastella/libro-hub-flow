"use client";
import { useState, useEffect } from "react";
import { Paginacion } from "@/components";
import styles from "./CardLibro.module.css";

export default function CardLibro({ setLibroSeleccionado, libroSeleccionado, librosFiltrados }) {
    const manejarErrorImagen = (e) => {
        if (!e.target.dataset.tried) {
            e.target.dataset.tried = "true";
            e.target.src = "https://via.placeholder.com/150x200?text=Sin+Portada";
        }
    };

    console.log("libros filtrados: ", librosFiltrados);

    return (
        <div className={styles.biblioteca}>
            <div className={styles.libros}>
                {librosFiltrados.map((libro) => (
                    <div
                        key={libro.id_libro}
                        className={`${styles.libroCard} ${libro.id_libro === libroSeleccionado ? styles.seleccionado : ""}`}
                        onClick={() => {
                            setLibroSeleccionado?.(libro.id_libro);
                        }}>
                        <img src={libro.foto_portada || "https://via.placeholder.com/150x200?text=Sin+Portada"} alt={libro.titulo} className={styles.libroImage} onError={manejarErrorImagen} />
                        <h2 className={styles.libroTitulo} title={libro.titulo} >{libro.titulo}</h2>
                        <p className={styles.libroAutor}>{libro.autor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
