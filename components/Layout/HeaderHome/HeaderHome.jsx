"use client";

import { useEffect, useState } from "react";
import { Boton } from "@/components";
import Image from "next/image";
import styles from "./HeaderHome.module.css";
import Link from "next/link";

export default function HeaderHome() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);

        return () => {
            window.removeEventListener("resize", updateIsMobile);
        };
    }, []);

    return (
        <header className={`${styles.Header} ${isScrolled ? styles.headerScrolled : ""}`}>
            <div className={styles.cabecera}>
                <div className={styles.contenedorInterno}>
                    <div className={styles.logo}>
                        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <Image src="/logo-h1Blanco.svg" alt="Logo" width={120} height={40} />
                        </Link>
                    </div>
                    <div className={styles.menu}>
                        <Boton type="button" texto="Iniciar sesión" enlace="inicioSesion" size={isMobile ? "small" : "medium"} />
                        <Boton type="button" texto="Registrarse" enlace="registro" size={isMobile ? "small" : "medium"} />
                    </div>
                </div>
            </div>
        </header>
    );
}
