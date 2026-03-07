
import { Boton } from "@/components";
import Link from "next/link";
import styles from "./HeaderHome.module.css";


export default function HeaderHome(){  
  return (
      <main className = {styles.Header}>
        <div className={styles.cabecera}>
          <div className ={styles.contenedorInterno}>
          <div className={styles.logo}>
            <img src="/logo-h1Negro.svg" alt="logo" /> 
          </div>

          <div className={styles.menu}>

            
            <Link href="/inicioSesion">
              <Boton type="button" texto="Iniciar sesión" />
            </Link>

            <Link href="/registro">
              <Boton type="button" texto="Registrarse" />
            </Link>
          </div>
          </div>          
        </div>
      </main>
    )
}