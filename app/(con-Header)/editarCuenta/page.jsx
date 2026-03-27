"use client";
import { FormEditarCuenta, Boton, EscribirTexto, PopUpCambiarFoto } from "@/components/index";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import useUsuario from "@/hooks/useUsuario";
import { useState } from "react";

export default function EditarCuenta() {

    const usuario = useUsuario();
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const abrirPopup = () => {
        setMostrarPopup(true);
    };

    const cerrarPopup = () => {
        setMostrarPopup(false);
    };

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
                        <Image 
                            src={usuario?.foto_perfil || "/perfilUsuario.svg"}
                            alt="perfil" 
                            width={200} 
                            height={200} 
                            className="rounded-circle" 
                            unoptimized 
                        />
                        <Boton type="button" onClick={abrirPopup} texto="Cambiar foto de perfil" size="small"/>
                    </div>

                    <div className={`col-12 col-md-8 ${styles.datos}`}>
                        <EscribirTexto texto={`${usuario?.nombre} ${usuario?.apellidos} (${usuario?.nick_usuario})`} Tipo="h2" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.poblacion}, ${usuario?.provincia}`} Tipo="h3" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.email}`} Tipo="h3" velocidad="30" />
                        <EscribirTexto texto={`${usuario?.telefono}`} Tipo="h3" velocidad="30" />
                    </div>
                </div>

                <div className={`row ${styles.form}`}>
                    <div>
                        <FormEditarCuenta />
                    </div>
                </div>
            </div>

            {mostrarPopup && <PopUpCambiarFoto cerrar={cerrarPopup} />}
        </div>
    );
}
