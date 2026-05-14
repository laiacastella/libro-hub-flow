"use client";

import { useCallback, useState, useEffect } from "react";
import useInactividad from "@/hooks/useInactividad";
import PopUp from "@/components/UI/PopUp/PopUp";
import { Boton } from "@/components/index";

export default function SessionTimeout() {
  const [mostrarWarning, setMostrarWarning] = useState(false);
  const [contador, setContador] = useState(60);
  const [activo, setActivo] = useState(false);

  // Verificar sesión cada segundo
  useEffect(() => {
    const check = () => setActivo(!!localStorage.getItem("usuarioLogueado"));
    check();
    const i = setInterval(check, 1000);
    window.addEventListener("usuarioActualizado", check);
    return () => { clearInterval(i); window.removeEventListener("usuarioActualizado", check); };
  }, []);

  // Contador del popup
  useEffect(() => {
    if (!mostrarWarning) return;
    setContador(60);
    const i = setInterval(() => setContador(p => p <= 1 ? 0 : p - 1), 1000);
    return () => clearInterval(i);
  }, [mostrarWarning]);

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem("usuarioLogueado");
    window.dispatchEvent(new Event("usuarioActualizado"));
    window.location.href = "/login";
  }, []);

  const reiniciar = useInactividad(cerrarSesion, 70, activo, () => setMostrarWarning(true), 60);

  if (!activo) return null;

  return (
    <PopUp
      isOpen={mostrarWarning}
      onClose={() => { setMostrarWarning(false); reiniciar?.(); }}
      title="¿Sigues ahí?"
      footer={<Boton texto="Mantener sesión activa" variant="default" onClick={() => { setMostrarWarning(false); reiniciar?.(); }} />}
    >
      <p>Tu sesión está a punto de expirar por inactividad.</p>
      <p style={{ fontSize: "1.1rem", color: "#dc3545", fontWeight: "bold", textAlign: "center" }}>
        ⏱️ {contador} segundos
      </p>
    </PopUp>
  );
}
