import styles from "./Boton.module.css";
const Boton = ({ ruta, textoIcono, nomBoton, tipo = "button", disabled = false }) => {
    return (
        <button className={styles.botonApp} type={tipo} disabled={disabled}>
            <span>
                <img src={ruta} alt={textoIcono} />
            </span>
            {nomBoton}
        </button>
    );
};

export default Boton;
