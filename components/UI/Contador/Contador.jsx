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
    const tieneAnimado = useRef(false);
    const animationRef = useRef(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const element = elementoRef.current;
        if (!element || !mountedRef.current) return;

        // Reset animation state when valorFinal changes
        tieneAnimado.current = false;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !tieneAnimado.current && mountedRef.current) {
                    tieneAnimado.current = true;
                    iniciarAnimacion();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [valorFinal]);

    const iniciarAnimacion = () => {
        if (!mountedRef.current || valorFinal === 0) {
            if (mountedRef.current) setCuenta(0);
            return;
        }

        // Cancel any existing animation
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        let inicio = 0;
        const incremento = valorFinal / (duracion / 16);

        const actualizar = () => {
            if (!mountedRef.current) return;
            inicio += incremento;
            if (inicio < valorFinal) {
                setCuenta(Math.floor(inicio));
                animationRef.current = requestAnimationFrame(actualizar);
            } else {
                setCuenta(valorFinal);
            }
        };

        animationRef.current = requestAnimationFrame(actualizar);
    };

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