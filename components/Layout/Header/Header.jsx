"use client";

import Image from "next/image";
import Link from "next/link";
import { Enlaces } from "@/components";
import { useRouter } from "next/navigation";
import useUsuario from "@/hooks/useUsuario";
import styles from "./Header.module.css";

export default function Header() {

    const usuario = useUsuario();
    const router = useRouter();

    const logout = () => {
        if (confirm("¿Seguro que quieres cerrar sesión?")) {
            localStorage.removeItem("usuarioLogueado");
            router.refresh();
            router.push("/");
        }
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
                                    <a className="d-inline-flex align-items-center gap-2 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
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
                                    </a>

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
        </header>
    );
}