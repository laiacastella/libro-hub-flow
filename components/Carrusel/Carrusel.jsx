import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Carrusel.module.css";

export default function Carrusel({ items = [], renderItem, slidesToShow = 1, mobileSlidesToShow = 1, mobileBreakpoint = 600 }) {
    const [indice, setIndice] = useState(0);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`).matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
        const actualizarEsMovil = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addEventListener("change", actualizarEsMovil);

        return () => {
            mediaQuery.removeEventListener("change", actualizarEsMovil);
        };
    }, [mobileBreakpoint]);

    const slidesVisiblesDeseados = isMobile ? mobileSlidesToShow : slidesToShow;
    const visibleSlides = Math.max(1, Math.min(slidesVisiblesDeseados, items.length || 1));
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
            <button type="button" className={styles.boton} onClick={anterior}>
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

            <button type="button" className={styles.boton} onClick={siguiente}>
                <ChevronRight />
            </button>
        </div>
    );
}
