import styles from "./Valoraciones.module.css";
import { CardValoracion } from "@/components/index";

export default function Valoraciones() {
    return (
        <>
            <div className={styles.valoracionesContainer}>
                <CardValoracion />
            </div>
        </>
    );
}
