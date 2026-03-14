import { Boton } from "@/components";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeaderHome.module.css";

export default function HeaderHome() {
    return (
        <div className={styles.Header}>
            <div className={styles.cabecera}>
                <div className={styles.contenedorInterno}>
                    <div className={styles.logo}>
                        <Image src="/logo-h1Blanco.svg" alt="" width={120} height={40} />
                    </div>

                    <div className={styles.menu}>
                        <Boton type="button" texto="Iniciar sesión" enlace="inicioSesion" />
                        <Boton type="button" texto="Registrarse" enlace="registro" />
                    </div>
                </div>
            </div>
        </div>
    );
}
