import styles from "./Valoraciones.module.css";
import { CardValoracion } from "@/components/index";

export default function Valoraciones({ userId }) {
    return (
        <>
            <div className={styles.valoracionesContainer}>
                <CardValoracion userId={userId} />
            </div>
        </>
    );
}
