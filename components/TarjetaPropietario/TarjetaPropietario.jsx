"use client"
import styles from "./TarjetaPropietario.module.css";

export function TarjetaPropietario({ propietario }) {
    // Si no hay datos del propietario, no mostramos nada para evitar errores
    if (!propietario) return null;

    const { nombre, foto_perfil, valoracion } = propietario;

    // Función para renderizar las estrellas de valoración
    const renderEstrellas = (puntuacion) => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            estrellas.push(
                <span key={i} className={i <= puntuacion ? styles.estrellaLlena : styles.estrellaVacia}>
                    ★
                </span>
            );
        }
        return estrellas;
    };

    const manejarSolicitud = () => {
        alert(`Has enviado una solicitud de intercambio a ${nombre}`);
        // Aquí iría la lógica para insertar la solicitud en la base de datos (PHP)
    };

    return (
        <div className={styles.tarjetaContenedor}>
            <div className={styles.infoUsuario}>
                <img 
                    src={foto_perfil || "https://via.placeholder.com/50"} 
                    alt={nombre} 
                    className={styles.avatar} 
                />
                <div className={styles.textoUsuario}>
                    <p className={styles.etiqueta}>Propietario:</p>
                    <p className={styles.nombre}>{nombre}</p>
                    <div className={styles.estrellas}>
                        {renderEstrellas(valoracion)}
                    </div>
                </div>
            </div>
            
            <button className={styles.botonIntercambio} onClick={manejarSolicitud}>
                Solicitar intercambio
            </button>
        </div>
    );
}