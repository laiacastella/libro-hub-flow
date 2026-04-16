'use client';

import { FormRegistro, Enlaces } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";

export default function Registro() {
    return (
        <main className = {styles.contenedorPagina}>
            <div className={styles.estiloForm}>
                <div className={styles.contenedorLogo}>
                    <Link href="/">
                        <img src='/logo-h1Negro.svg' alt='logo App' />
                    </Link>
                </div>

                <FormRegistro />

                <p className={styles.textoLogin}>
                    ¿Ya tienes una cuenta?
                    <Enlaces ruta='/inicioSesion' nomEnlace='Iniciar Sesion' />
                </p>
            </div>
        </main>
    )
}