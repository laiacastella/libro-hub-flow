import data from "@/data/valoraciones.json";
import styles from "./CardComentario.module.css";
import { Trash2, Pencil } from "lucide-react";

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
                            <Pencil />
                            <Trash2 />
                        </div>
                    </div>
                    <p className={styles.comentario}>{valoracion.comentario}</p>
                </div>
            ))}
        </div>
    );
}
