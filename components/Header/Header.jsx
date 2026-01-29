"use client";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
    const router = useRouter();

    return (
        <main>
            <div className={styles.cabecera}>
                <div className={styles.logo}>
                    <img src="/logo-h1Negro.svg" alt="logo" />
                </div>

                <div className={styles.menu}>
                    <div className={styles.elemento} onClick={() => router.push("/PerfilUsuarioPropio?tab=solicitudes")}>
                        Solicitudes
                    </div>

                    <div className={styles.elemento} onClick={() => router.push("")}>
                        Biblioteca
                    </div>

                    <div className={styles.elemento} onClick={() => router.push("/PerfilUsuarioPropio")}>
                        Perfil
                    </div>

                    <button className={styles.boton} onClick={() => router.push("")}>
                        Sube tu libro
                    </button>
                </div>
            </div>
        </main>
    );
}
