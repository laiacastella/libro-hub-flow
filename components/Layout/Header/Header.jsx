
import Link from "next/link";
import { Enlaces } from "@/components";
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
                        ruta="/PerfilUsuarioPropio?tab=solicitudes"
                    />

                    <Enlaces 
                        nomEnlace="Biblioteca" 
                        ruta="/con-marco/biblioteca"
                    />

                    <Enlaces 
                        nomEnlace="Perfil" 
                        ruta="/PerfilUsuarioPropio"
                    />

                    <Link href="">
                        <button className={styles.boton}>
                            Sube tu libro
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
