import styles from "./Solicitudes.module.css";
import { CardSolicitud } from "@/components/index";

export default function Solicitudes() {
    return (
        <>
            <div className={styles.contenedorSolicitudes}>
                <CardSolicitud />
            </div>
        </>
    );
}
