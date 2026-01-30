
import { useRouter } from "next/navigation";
import styles from "./HeaderHome.module.css";

export default function HeaderHome(){
  
  const router = useRouter();  
  
  return (
      <main>
        <div className={styles.cabecera}>
          <div className={styles.logo}>
            <img src="/logo-h1Blanco.svg" alt="logo" /> 
          </div>

          <div className={styles.menu}>
            <button className={styles.boton}
              onClick={() => router.push("")}>
              Iniciar sesión
            </button>

            <button className={styles.boton}
              onClick={() => router.push("")}>
              Registrarse
            </button>
          </div>          
        </div>
      </main>
    )
}