import styles from "./Valoraciones.module.css";
import CardValoracion from "@/components/CardValoracion/CardValoracion";

export default function Valoraciones() {
    return (
        <>
            <div className={styles.valoracionesContainer}>
                <CardValoracion />
            </div>
        </>
    );
}
