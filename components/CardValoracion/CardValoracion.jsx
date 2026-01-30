import data from "@/data/valoraciones.json";
import styles from "./CardValoracion.module.css";
import Estrellas from "../Estrellas/Estrellas.jsx";

const valoraciones = data.comentarios;

export default function Valoraciones() {
    return (
        <div className={styles.valoracionesContainer}>
            {valoraciones.map((valoracion) => (
                <div key={valoracion.id} className={styles.comentarioCard}>
                    <div className={styles.header}>
                        <div className={styles.usuarioInfo}>
                            <img src={valoracion.perfil} alt={valoracion.usuario} className={styles.perfilUsuario} />
                            <div className={styles.usuarioDatos}>
                                <h2 className={styles.usuario}>{valoracion.usuario}</h2>
                                <p className={styles.tiempo}>Hace {valoracion.tiempo}</p>
                            </div>
                        </div>
                        <Estrellas valoracion={valoracion.valoracion} />
                    </div>
                    <p className={styles.comentario}>{valoracion.comentario}</p>
                </div>
            ))}
        </div>
    );
}