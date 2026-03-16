"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './Contador.module.css'
const Contador = ({ valorFinal, duracion = 2000 }) => {
  const [cuenta, setCuenta] = useState(0);
  const elementoRef = useRef(null);
  const tieneAnimado = useRef(false); // Para evitar que se repita si haces scroll arriba/abajo

  useEffect(() => {
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

    if (elementoRef.current) observer.observe(elementoRef.current);

    return () => {
      if (elementoRef.current) observer.unobserve(elementoRef.current);
    };
  }, [valorFinal]);

  const iniciarAnimacion = () => {
    let inicio = 0;
    const duracion = 2000;
    const incremento = valorFinal / (duracion / 16);
    
    const actualizar = () => {
      inicio += incremento;
      if (inicio < valorFinal) {
        setCuenta(Math.floor(inicio));
        requestAnimationFrame(actualizar);
      } else {
        setCuenta(valorFinal);
      }
    };
    
    actualizar();
  };

  return (
    <span ref={elementoRef} className={`${styles.contador} ${cuenta > 0 ? styles.visible : ''}`}>
      {cuenta.toLocaleString()}
    </span>
  );
};

export default Contador;