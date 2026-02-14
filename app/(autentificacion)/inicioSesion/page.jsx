'use client';
import { useRouter } from "next/navigation";
import styles from '../loginFondo.module.css'
import FormLogin from "../componentesForm/FormLogin/FormLogin";

export default function inicioSesion () {
  const router = useRouter ()
  return (
    <main className={styles.contenedorPagina}>
      <FormLogin />
    </main>
    
  )
}