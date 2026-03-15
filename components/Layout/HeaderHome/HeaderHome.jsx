"use client";

import { useEffect, useState } from "react";
import { Boton } from "@/components";
import Image from "next/image";
import styles from "./HeaderHome.module.css";

export default function HeaderHome() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.Header} ${isScrolled ? styles.headerScrolled : ""}`}>
            <div className={styles.cabecera}>
                <div className={styles.contenedorInterno}>
                    <div className={styles.logo}>
                        <Image src="/logo-h1Blanco.svg" alt="Logo" width={120} height={40} />
                    </div>
                    <div className={styles.menu}>
                        <Boton type="button" texto="Iniciar sesión" enlace="inicioSesion" />
                        <Boton type="button" texto="Registrarse" enlace="registro" />
                    </div>
                </div>
            </div>
        </header>
    );
}
