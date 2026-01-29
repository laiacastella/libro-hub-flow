import styles from "./Valoraciones.module.css";
import CardValoracion from "@/components/CardValoracion/CardValoracion";

export default function Valoraciones() {
    return (
        <>
            <h1 className={styles.titular}>Valoraciones de Nombre</h1>
            <div className={styles.valoracionesContainer}>
                <CardValoracion />
            </div>
        </>
    );
}
