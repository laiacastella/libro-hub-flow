import styles from "./Boton.module.css";

export default function Boton({ ruta, nomEnlace, onClick, title }) {
    return (
        <button href={ruta} onClick={onClick} className={styles.boton} title={title}>
            {nomEnlace}
        </button>
    );
}
