'use client';
import { useRouter } from "next/navigation";
import styles from '../loginFondo.module.css'
import FormLogin from "../componentesForm/FormLogin/FormLogin";

export default function InicioSesion () {
    const router = useRouter ()

    const manejarLoginCorrecto = () => {
        router.push('/biblioteca')
    }

    return (
        <main className={styles.contenedorPagina}>
            <FormLogin onLoginSuccess={manejarLoginCorrecto} />
        </main>
        
    )
}