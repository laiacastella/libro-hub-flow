"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './Contador.module.css'

const Contador = ({ 
    valorFinal, 
    duracion = 2000, 
    colorInicio = "#A8D191",
    colorFin = "#63A26C",
    size = "md"
    }) => {

    const [cuenta, setCuenta] = useState(0);
    const elementoRef = useRef(null);
    const tieneAnimado = useRef(false); // Para evitar que se repita si haces scroll arriba/abajo
    const animationRef = useRef(null); // Para limpiar la animación

    useEffect(() => {
        const element = elementoRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                
                // Si el elemento es visible y no se ha animado aún
                if (entry.isIntersecting && !tieneAnimado.current) {
                tieneAnimado.current = true;
                iniciarAnimacion();
                }
            },
            { threshold: 1.0 } // Se activa cuando el 50% es visible
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [valorFinal]);

    const iniciarAnimacion = () => {
        // Si el valor final es 0, no hay nada que animar, fijamos en 0 y salimos
        if (valorFinal === 0) {
            setCuenta(0);
            return;
        }
        let inicio = 0;
        const incremento = valorFinal / (duracion / 16);
    
        const actualizar = () => {
            inicio += incremento;
            if (inicio < valorFinal) {
                setCuenta(Math.floor(inicio));
                animationRef.current = requestAnimationFrame(actualizar);
            } else {
                setCuenta(valorFinal);
            }
        };
    
        actualizar();
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <span
            ref={elementoRef}
            className={`
                ${styles.contador} 
                ${styles[size]} 
                ${styles.visible}
            `}
            style={{
                background: `linear-gradient(10deg, ${colorInicio} 0%, ${colorFin} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                // Por si acaso el estilo visible no está aplicado por defecto:
                opacity: 1
            }}
        >
            {cuenta.toLocaleString()}
        </span>
    );
};

export default Contador;