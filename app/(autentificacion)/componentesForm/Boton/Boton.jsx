import styles from './Boton.module.css'
const Boton = ({ruta, textoIcono, nomBoton, tipo}) => {
    return (
        <button 
        className={styles.botonApp}
        type= {tipo}
        >
            <span>
                <img src={ruta} alt={textoIcono} />
            </span>
            {nomBoton}
        </button>
    )
}

export default Boton