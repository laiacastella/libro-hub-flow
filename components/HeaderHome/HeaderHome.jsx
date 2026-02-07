"use client"
import { useRouter } from "next/navigation";
import styles from "./HeaderHome.module.css";

export function HeaderHome(){
  
  const router = useRouter();  
  
  return (
      <header className={styles.cabecera}>
        <div className={styles.logo}>
          <img src="/logo-h1Blanco.svg" alt="logo" /> 
        </div>

        <div className={styles.menu}>
          <button className={styles.boton} onClick={() => router.push("/login")}>
            Iniciar sesión
          </button>
          <button className={styles.boton} onClick={() => router.push("/register")}>
            Registrarse
          </button>
        </div>          
    </header>
    )
}