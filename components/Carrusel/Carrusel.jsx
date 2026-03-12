import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Carrusel.module.css';


export default function Carrusel({ items, renderItem }) {
    const [indice, setIndice] = useState(0);

    // Funciones de navegación
    const siguiente = () => {
        setIndice((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const anterior = () => {
        setIndice((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    
    useEffect(() => {
        const timer = setInterval(siguiente, 3000);
        return () => clearInterval(timer);
    }, [indice, items.length]);

    if (!items || items.length === 0) return null;

    return (
        <div className={styles.contenedor}>
            <button className={styles.flecha} onClick={anterior}><ChevronLeft /></button>

            <div className={styles.visor}>
                <div 
                    className={styles.riel} 
                    style={{ transform: `translateX(-${indice * 100}%)` }}
                >
                    {items.map((item, index) => (
                       <div key={item.id || item.id_libro || index } className={styles.slide}>
                            
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>

            <button className={styles.flecha} onClick={siguiente}><ChevronRight /></button>
        </div>
    );
}