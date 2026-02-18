"use client";
import FormEditarCuenta from "@/components/FormEditarCuenta/FormEditarCuenta.jsx"; // componente de prueba
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 

export default function EditarCuenta() {
    const router = useRouter();

    return (
        <main>
            <Header />

            <div className={styles.fondo}>
                <h2 className={styles.titulo}>Mi información personal</h2>

                <div className={styles.perfil}>
                    <div className={styles.foto}>
                        <img src="/perfilUsuario.svg" alt="perfilUsuario" />
                        <br />
                        <br />
                        <button
                            type="button"
                            className={styles.boton}
                            /*onClick={}*/
                        >
                            Cambiar foto <br />
                            de perfil
                        </button>
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

            <Footer />
        </main>
    );
}
