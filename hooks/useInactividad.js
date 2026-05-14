"use client";

import { useEffect, useRef, useCallback } from "react";

export default function useInactividad(alExpirar, segundos = 1800, activo = true, alAdvertir = null, segundosAdvertencia = 30) {
  const timerExpirar = useRef(null);
  const timerAdvertir = useRef(null);
  const callbackExpirar = useRef(alExpirar);
  const callbackAdvertir = useRef(alAdvertir);

  useEffect(() => {
    callbackExpirar.current = alExpirar;
    callbackAdvertir.current = alAdvertir;
  }, [alExpirar, alAdvertir]);

  const reiniciar = useCallback(() => {
    const msTotal = segundos * 1000;
    const msAdvertencia = (segundos - segundosAdvertencia) * 1000;
    
    clearTimeout(timerExpirar.current);
    clearTimeout(timerAdvertir.current);
    
    timerExpirar.current = setTimeout(() => callbackExpirar.current?.(), msTotal);
    
    if (callbackAdvertir.current && msAdvertencia > 0) {
      timerAdvertir.current = setTimeout(() => callbackAdvertir.current?.(), msAdvertencia);
    }
  }, [segundos, segundosAdvertencia]);

  useEffect(() => {
    if (!activo) {
      clearTimeout(timerExpirar.current);
      clearTimeout(timerAdvertir.current);
      return;
    }
    
    reiniciar();
    
    const eventos = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'wheel'];
    eventos.forEach(e => window.addEventListener(e, reiniciar, { passive: true }));
    
    return () => {
      clearTimeout(timerExpirar.current);
      clearTimeout(timerAdvertir.current);
      eventos.forEach(e => window.removeEventListener(e, reiniciar));
    };
  }, [activo, reiniciar]);

  return reiniciar;
}
