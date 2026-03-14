
import { Enlaces, Boton } from "@/components";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
    
    const usuario = "Nombre Apellido";
    
    return (
        <main>
            <div className={styles.cabecera}>
                <div className={styles.logo}>
                    <Image src="/logo-h1Negro.svg" alt="logo" width={120} height={40} />
                </div>
                
                <div className={styles.bienvenida}>
                    Hola {usuario}
                    <Enlaces
                        nomEnlace="cerrar sesion"
                        onClick=""
                        ruta=""
                    />
                </div>

                <div className={styles.menu}> 
                    <Enlaces 
                        nomEnlace="Solicitudes" 
                        ruta="/perfilUsuarioPropio?tab=solicitudes"
                    />

                    <Enlaces 
                        nomEnlace="Biblioteca" 
                        ruta="/biblioteca"
                    />

                    <Enlaces 
                        nomEnlace="Perfil" 
                        ruta="/perfilUsuarioPropio"
                    />

                    <Boton type="button" texto="Subir libro" enlace="subirLibro" />
                </div>
            </div>
        </main>
    );
}
