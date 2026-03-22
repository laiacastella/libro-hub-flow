"use client";

import Image from "next/image";
import Link from "next/link";
import { Enlaces, Boton } from "@/components";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={`navbar navbar-expand-lg ${styles.cabecera}`}>
            <div className={`container-fluid ${styles.contenedorPrincipal}`}>
                <Link href="/" className="navbar-brand">
                    <div className={styles.logo}>
                        <Image src="/logo-h1Negro.svg" alt="logo" width={170} height={45} priority />
                    </div>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">
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
                        <li className="nav-item">
                            <Enlaces nomEnlace="Perfil" ruta="/perfilUsuarioPropio" />
                        </li>
                        <li className="nav-item">
                            <Boton type="button" texto="Subir libro" enlace="subirLibro" />
                        </li>
                        <li>
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <div className="dropdown text-end">
                                    <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {" "}
                                        <Image src="https://github.com/mdo.png" alt="mdo" width={32} height={32} className="rounded-circle" unoptimized />{" "}
                                    </a>{" "}
                                    <ul className="dropdown-menu text-small">
                                        {" "}
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                New project...
                                            </a>
                                        </li>{" "}
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Settings
                                            </a>
                                        </li>{" "}
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Profile
                                            </a>
                                        </li>{" "}
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>{" "}
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Sign out
                                            </a>
                                        </li>{" "}
                                    </ul>{" "}
                                </div>{" "}
                                <p className="align-center px-2 mb-0 text-emerald-600 font-bold text-lg md:text-2xl leading-none">Hola, Nombre Apellido</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
