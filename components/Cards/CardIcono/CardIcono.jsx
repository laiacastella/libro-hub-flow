import styles from "./CardIcono.module.css";

const CardIcono = ({ rutaIcono, alt, texto, titulo }) => {
    return (
        <div className={styles.cardContenedor}>
            <div className={styles.contenedorIcono}>
                <img src={rutaIcono} alt={alt} className={styles.icono} />
            </div>
            <div className={styles.texto}>
                <b style={{ display: "block", marginBottom: "0.5rem" }}>{titulo}</b>
                {texto}
            </div>
        </div>
    );
};

export default CardIcono;
