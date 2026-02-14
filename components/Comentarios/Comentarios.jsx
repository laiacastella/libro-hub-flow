import CardComentario from "../CardComentario/CardComentario";
import styles from "./Comentarios.module.css";

export default function Comentarios() {
    return (
        <>
            <div className={styles.comentariosContainer}>
                <button className={styles.boton}>Añadir comentario</button>
                <CardComentario />
            </div>
        </>
    );
}
