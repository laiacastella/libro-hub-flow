import data from "@/data/comentarios.json";
import styles from "./Valoraciones.module.css";
import Estrellas from "../Estrellas/page.jsx";

const comentarios = data.comentarios;

export default function Valoraciones() {
    return (
        <div className={styles.valoracionesContainer}>
            {comentarios.map((comentario) => (
                <div key={comentario.id} className={styles.comentarioCard}>
                    <div className={styles.header}>
                        <div className={styles.usuarioInfo}>
                            <img src={comentario.perfil} alt={comentario.usuario} className={styles.perfilUsuario} />
                            <div className={styles.usuarioDatos}>
                                <h2 className={styles.usuario}>{comentario.usuario}</h2>
                                <p className={styles.tiempo}>Hace {comentario.tiempo}</p>
                            </div>
                        </div>
                        <Estrellas valoracion={comentario.valoracion} />
                    </div>
                    <p className={styles.comentario}>{comentario.comentario}</p>
                </div>
            ))}
        </div>
    );
}
