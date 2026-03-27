'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './page.module.css'
import { FormLogin, Enlaces, PopUpPassReset } from "@/components";
import Link from "next/link";

export default function InicioSesion () {

    const router = useRouter ()
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const manejarLoginCorrecto = () => {
        router.push('/biblioteca')
    }

    const abrirPopup = () => {
        setMostrarPopup(true);
    };

    const cerrarPopup = () => {
        setMostrarPopup(false);
    };

    return (
        <main className = {styles.contenedorPagina}>
            <div className={styles.estiloForm}>
                <div className={styles.contenedorLogo}>
                    <Link href="/">
                        <img src="/logo-h1Negro.svg" alt="logo App" />
                    </Link>
                </div>

                <div className={styles.contenedorLogo}>
                    <img src="icono-inicioSesion.svg" alt="logo inicio sesion" />
                </div>

                <FormLogin onLoginSuccess={manejarLoginCorrecto} />

                <div className={styles.textoLogin}>
                    <Enlaces nomEnlace="¿Olvidaste tu contraseña?" onClick={abrirPopup} />
                    <p>
                        {" "}
                        ¿No tienes una cuenta?
                        <Enlaces nomEnlace="Registrarse" ruta="/registro" />
                    </p>
                </div>
            </div>

            {mostrarPopup && <PopUpPassReset cerrar={cerrarPopup} />}
        </main>
    )
}