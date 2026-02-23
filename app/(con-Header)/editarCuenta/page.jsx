"use client";
import { FormEditarCuenta, Boton } from "@/components/index";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 

export default function EditarCuenta() {
    const router = useRouter();

    return (
        <main>
            <div className={styles.fondo}>
                <h2 className={styles.titulo}>Mi información personal</h2>

                <div className={styles.perfil}>
                    <div className={styles.foto}>
                        <img src="/perfilUsuario.svg" alt="perfilUsuario" />
                        <br />
                        <br />
                        <Boton type="button" texto="Cambiar foto de perfil" />
                    </div>
                    <div className={styles.datos}>
                        <h2>Nombre Apellidos (Nombre de usuario)</h2>
                        <h3>Ciudad, Provincia</h3>
                        <h3>Correo electrónico</h3>
                        <h3>Número de teléfono</h3>
                    </div>
                </div>

                <div>
                    <FormEditarCuenta />
                </div>
            </div>
        </main>
    );
}
