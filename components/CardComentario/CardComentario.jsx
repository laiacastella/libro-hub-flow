import data from "@/data/valoraciones.json";
import styles from "./CardComentario.module.css";
import Estrellas from "../Estrellas/Estrellas.jsx";

const valoraciones = data.comentarios;

export default function CardComentario() {
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
                        <div className={styles.contenedorSvg}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                <path d="M13.5 6.5l4 4" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </div>
                    </div>
                    <p className={styles.comentario}>{valoracion.comentario}</p>
                </div>
            ))}
        </div>
    );
}
