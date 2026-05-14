import styles from "./Valoraciones.module.css";
import { CardValoracion } from "@/components/index";

export default function Valoraciones({ userId }) {
    return (
        <div className={styles.valoracionesWrapper}>
            <div className={styles.valoracionesContainer}>
                <div className={styles.header}>
                    <h2>Valoraciones recibidas</h2>
                </div>
                <CardValoracion userId={userId} />
            </div>
        </div>
    );
}
