
import styles from "./Paginacion.module.css";
import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast, Ellipsis } from "lucide-react";

export default function Paginacion({
    paginaActual,
    totalPaginas,
    onPageChange
}) {
    if (totalPaginas <= 1) return null;

    const rango = 2;
    let inicio = Math.max(1, paginaActual - rango);
    let fin = Math.min(totalPaginas, paginaActual + rango);

    const paginas = [];

    for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
    }

    return (
        <div className={styles.contenedor}>
            {/* Primera */}
            <button
                className={styles.boton}
                onClick={() => onPageChange(1)}
                disabled={paginaActual === 1}
            >
                <ChevronFirst />
            </button>

            {/* Anterior */}
            <button
                className={styles.boton}
                onClick={() => onPageChange(paginaActual - 1)}
                disabled={paginaActual === 1}
            >
                <ChevronLeft />
            </button>

            {/* Primera página + ... */}
            {inicio > 1 && (
                <>
                    <button className={styles.boton}
                    onClick={() => onPageChange(1)}>1</button>
                    {inicio > 2 && <span><Ellipsis /></span>}
                </>
            )}

            {/* Páginas centrales */}
            {paginas.map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`${styles.boton} ${
                        num === paginaActual ? styles.activa : ""
                    }`}
                >
                    {num}
                </button>
            ))}


            {/* ... + última página */}
            {fin < totalPaginas && (
                <>
                    {fin < totalPaginas - 1 && <span><Ellipsis /></span>}
                    <button
                        className={styles.boton}
                        onClick={() => onPageChange(totalPaginas)}>
                        {totalPaginas}
                    </button>
                </>
            )}

            {/* Siguiente */}
            <button
                className={styles.boton}
                onClick={() => onPageChange(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
            >
                <ChevronRight />
            </button>

            {/* Última */}
            <button
                className={styles.boton}
                onClick={() => onPageChange(totalPaginas)}
                disabled={paginaActual === totalPaginas}
            >
                <ChevronLast />
            </button>
        </div>
    );
}
