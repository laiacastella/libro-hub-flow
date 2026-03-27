import styles from "./CardValoracion.module.css";
import { Estrellas } from "@/components/index";

const calcularMedia = (lista) => {
    if (!lista || lista.length === 0) return 0; // Por ahora devolvemos 0 por defecto
    const suma = lista.reduce((acc, curr) => acc + curr.puntos, 0);
    return suma / lista.length;
};

export default function Valoraciones({ notaReal = 5 }) { //mientras no tenemos reseñas
    
    return (
        <div className={styles.valoracionesContainer}>
            <Estrellas valoracion={notaReal} /> 
        </div>
    );
}