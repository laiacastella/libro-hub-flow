"use client"
import styles from "./InfoLibro.module.css";
import { TarjetaPropietario } from "../TarjetaPropietario/TarjetaPropietario";

export function InfoLibro({ libro }) {
    const { titulo, autor, descripcion, genero, foto_portada, propietario } = libro;

    const manejarErrorImagen = (e) => {
        if (!e.target.dataset.tried) {
            e.target.dataset.tried = "true";
            e.target.src = "https://via.placeholder.com/250x350?text=Sin+Portada";
        }
    };

    return (
        <section className={styles.infoContenedor}>
            <div className={styles.columnaImagen}>
                <img 
                    src={foto_portada || "https://via.placeholder.com/250x350?text=Sin+Portada"} 
                    alt={titulo} 
                    className={styles.portadaDetalle}
                    onError={manejarErrorImagen}
                />
            </div>
            
            <div className={styles.columnaTexto}>
                <h1 className={styles.titulo}>{titulo}</h1>
                <p className={styles.autor}>de {autor}</p>
                
                <p className={styles.meta}><strong>Género:</strong> {genero}</p>
                
                <div className={styles.descripcionCaja}>
                    <p className={styles.descripcionTexto}>{descripcion}</p>
                </div>

                {/* Este es el componente del dueño con el botón verde */}
                <TarjetaPropietario propietario={propietario} />
            </div>
        </section>
    );
}