import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Carrusel.module.css";

export default function Carrusel({ items = [], renderItem, slidesToShow = 1 }) {
    const [indice, setIndice] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(1);

    useEffect(() => {
        const actualizarSlidesVisibles = () => {
            if (window.innerWidth < 600) {
                setVisibleSlides(1);
                return;
            }

            if (window.innerWidth < 900) {
                setVisibleSlides(Math.max(1, Math.min(2, items.length || 1)));
                return;
            }

            setVisibleSlides(Math.max(1, Math.min(slidesToShow, items.length || 1)));
        };

        actualizarSlidesVisibles();
        window.addEventListener("resize", actualizarSlidesVisibles);

        return () => {
            window.removeEventListener("resize", actualizarSlidesVisibles);
        };
    }, [items.length, slidesToShow]);

    const maxIndex = Math.max(0, items.length - visibleSlides);
    const indiceVisible = Math.min(indice, maxIndex);

    // Funciones de navegación
    const siguiente = () => {
        setIndice((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const anterior = () => {
        setIndice((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    useEffect(() => {
        if (maxIndex === 0) return;
        const timer = setInterval(() => {
            setIndice((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [maxIndex]);

    if (items.length === 0) return null;

    return (
        <div className={styles.contenedor}>
            <button type="button" className={styles.boton} onClick={anterior} aria-label="Ver elementos anteriores">
                <ChevronLeft />
            </button>

            <div className={styles.visor}>
                <div
                    className={styles.riel}
                    style={{
                        transform: `translateX(-${(indiceVisible * 100) / visibleSlides}%)`,
                        "--slides-to-show": visibleSlides,
                    }}>
                    {items.map((item, index) => (
                        <div key={item.id || item.id_libro || index} className={styles.slide}>
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>

            <button type="button" className={styles.boton} onClick={siguiente} aria-label="Ver elementos siguientes">
                <ChevronRight />
            </button>
        </div>
    );
}
