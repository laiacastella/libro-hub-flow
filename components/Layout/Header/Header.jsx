
import { Enlaces, Boton } from "@/components";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <main>
            <div className={styles.cabecera}>
                <div className={styles.logo}>
                    <img src="/logo-h1Negro.svg" alt="logo" />
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
