"use client";
import styles from "./PopUpPassReset.module.css";
import { Input, Boton } from "@/components/index";
import { X } from "lucide-react";
import { useEffect } from "react";

const PopUpPassReset = ({ cerrar }) => {
    useEffect(() => {
        document.body.classList.add("no-scroll");

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    return (
        <div className={styles.fondo} onClick={cerrar}>
            <div className={styles.contenido} onClick={(e) => e.stopPropagation()}>
                <Boton texto={<X />} variant="cerrar" title="Cerrar ventana" className={styles.cerrarX} onClick={cerrar} />

                <h2>Restablecer contraseña</h2>
                <p className={styles.texto}>Introduce tu dirección de correo electrónico y si es correcto recibirás un enlace para resetear tu contraseña:</p>

                <div className={styles.email}>
                    <Input tipo="email" placeholder="ejemplo@gmail.com" className={styles.inputEmail} fullWidth />
                    <Boton texto="Enviar" />
                </div>
            </div>
        </div>
    );
};

export default PopUpPassReset;
