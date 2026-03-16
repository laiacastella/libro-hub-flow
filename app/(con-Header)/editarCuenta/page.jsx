"use client";
import { FormEditarCuenta, Boton } from "@/components/index";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css"; 

export default function EditarCuenta() {
    return (
        <div className={`container my-4 ${styles.fondo}`}>
            <div className={styles.fondo}>
                <div>
                    <h2 className={styles.titulo}>
                        <Link href="perfilUsuarioPropio" >
                            <Undo2 size="30" color="#000000"/> 
                        </Link>
                        {" "}Mi información personal
                    </h2>
                </div>

                <div className={`row ${styles.perfil}`}>
                    <div className={`col-12 col-md-4 text-center ${styles.foto}`}>
                        <img
                        src="/perfilUsuario.svg"
                        className={`img-fluid ${styles.fotoPerfil}`}
                        alt="perfilUsuario"
                        />
                        <Boton type="button" texto="Cambiar foto de perfil" size="small"/>
                    </div>

                    <div className={`col-12 col-md-8 ${styles.datos}`}>
                        <h2>Nombre Apellidos (Nombre de usuario)</h2>
                        <h3>Ciudad, Provincia</h3>
                        <h3>Correo electrónico</h3>
                        <h3>Número de teléfono</h3>
                    </div>
                </div>

                <div className={`row ${styles.form}`}>
                    <div>
                        <FormEditarCuenta />
                    </div>
                </div>
            </div>
        </div>
    );
}
