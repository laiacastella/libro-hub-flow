"use client";

import Image from "next/image";
import Link from "next/link";
import { Boton, Enlaces, PopUp } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import styles from "./Header.module.css";

export default function Header() {

    const usuario = useUsuario();
    const router = useRouter();
    const [openLogout, setOpenLogout] = useState(false);

    const logout = () => {
        setOpenLogout(true);
    };

    const handleConfirmLogout = () => {
        localStorage.removeItem("usuarioLogueado");
        setOpenLogout(false);
        router.refresh();
        router.push("/");
    };

    return (
        <header className={`navbar navbar-expand-lg ${styles.cabecera}`}>
            <div className={`container-fluid ${styles.contenedorPrincipal}`}>
                <Link href="/" className="navbar-brand">
                    <div className={styles.logo}>
                        <Image src="/logo-h1Negro.svg" alt="logo" width={170} height={45} priority />
                    </div>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse`} id="menuPrincipal">
                    <ul className={`navbar-nav ms-auto ${styles.menu}`}>
                        <li className="nav-item">
                            <Enlaces nomEnlace="Solicitudes" ruta="/perfilUsuarioPropio?tab=solicitudes" />
                        </li>

                        <li className="nav-item">
                            <Enlaces nomEnlace="Biblioteca" ruta="/biblioteca" />
                        </li>

                        <li>
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <div className="dropdown text-end">
                                    <button className="d-inline-flex align-items-center gap-2 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                                        <Image 
                                            src={usuario?.foto_perfil || "/perfilUsuario.svg"}
                                            alt="perfil" 
                                            width={40} 
                                            height={40} 
                                            className="rounded-circle" 
                                            unoptimized 
                                        />
                                        {" "}
                                        <Enlaces nomEnlace={`Hola, ${usuario?.nombre}`} ruta="" />
                                    </button>

                                    <ul className="dropdown-menu text-small">
                                        <li>
                                            <Enlaces className="dropdown-item" nomEnlace="Perfil" ruta="/perfilUsuarioPropio" />
                                        </li>

                                        <li>
                                            <Enlaces className="dropdown-item" nomEnlace="Editar datos" ruta="/editarCuenta" />
                                        </li>

                                        <li>
                                            <Enlaces className="dropdown-item" nomEnlace="Subir libro" ruta="/subirLibro" />
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <Enlaces className="dropdown-item" nomEnlace="Cerrar sesión" onClick={logout} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <PopUp
                isOpen={openLogout}
                onClose={() => setOpenLogout(false)}
                title="Cerrar sesión"
                type="form"
                cerrarAlHacerClickFuera={true}
                footer={
                    <>
                    <Boton
                        texto="Cancelar"
                        onClick={() => setOpenLogout(false)}
                    />

                    <Boton
                        texto="Cerrar sesión"
                        onClick={handleConfirmLogout}
                    />
                    </>
                }
                >
                <p>¿Seguro que quieres cerrar sesión?</p>
                <p>Tu sesión actual se cerrará y volverás al inicio.</p>
            </PopUp>
        </header>
    );
}