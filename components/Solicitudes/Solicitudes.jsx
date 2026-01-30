import styles from "./Solicitudes.module.css";
import CardSolicitud from "@/components/CardSolicitud/CardSolicitud";

export default function Solicitudes() {
    return (
        <>
            <h1 className={styles.titular}>Solicitudes pendientes</h1>
            <div className={styles.contenedorSolicitudes}>
                <CardSolicitud />
            </div>
        </>
    );
}