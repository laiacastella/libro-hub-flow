import styles from './CardIcono.module.css'

const CardIcono =({rutaIcono, nombreIcono, texto})=> {
    return (
        <div className={styles.cardContenedor}>
            <div className={styles.contenedorIcono}>
                <img src={rutaIcono} alt={nombreIcono} className={styles.icono}/>
            </div>
            <div className={styles.texto}>
                {texto}
            </div>
        </div>
    )
}

export default CardIcono