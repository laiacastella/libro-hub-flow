"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
                        <Image src={libro.foto_portada || "https://via.placeholder.com/150x200?text=Sin+Portada"} alt={libro.titulo || "Sin Portada"} className={styles.libroImage} width={150} height={200} onError={manejarErrorImagen} unoptimized={libro.foto_portada?.startsWith("http") ? true : false} />
                        <h2 className={styles.libroTitulo}>{libro.titulo}</h2>
                        <p className={styles.libroAutor}>{libro.autor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
