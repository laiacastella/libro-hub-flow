
import Link from "next/link";
import styles from "./HeaderHome.module.css";

export default function HeaderHome(){  
  return (
      <main>
        <div className={styles.cabecera}>
          <div className={styles.logo}>
            <img src="/logo-h1Blanco.svg" alt="logo" /> 
          </div>

          <div className={styles.menu}>
            <Link href="/inicioSesion">
              <button className={styles.boton}>
                Iniciar sesión
              </button>
            </Link>

            <Link href="/Registro">
              <button className={styles.boton}>
                Registrarse
              </button>
            </Link>
            
          </div>          
        </div>
      </main>
    )
}