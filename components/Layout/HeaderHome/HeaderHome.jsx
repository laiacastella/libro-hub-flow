
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
                        <Boton type="button" texto="Iniciar sesión" enlace="inicioSesion"/>
                        <Boton type="button" texto="Registrarse" enlace="registro"/>
                    </div>
                </div>          
            </div>
        </main>
    )
}