"use client"
import { useState } from "react"
import Campo from "../Campo/Campo.jsx"
import Boton from "../Boton/Boton.jsx"
import { Enlaces, PopUpPassReset } from "@/components";
import styles from '../disenoForm.module.css'
import stylesTexto from './FormLogin.module.css'
import Link from "next/link";

const FormLogin = () => {
    
    const [mostrarPopup, setMostrarPopup] = useState(false)

    const abrirPopup = () => {
        setMostrarPopup(true)
    }

    const cerrarPopup = () => {
        setMostrarPopup(false)
    }
    
    return (
        <div>
            <form className={styles.estiloForm}>
                <div className={styles.contenedorLogo}>
                    <Link href="/">
                        <img src='/logo-h1Negro.svg' alt='logo App' />
                    </Link>
                </div>
                <div className={styles.contenedorLogo}>
                    <img src="icono-inicioSesion.svg" alt="logo inicio sesion" />
                </div>
                <div className={styles.contenedorCampos}>
                    <Campo
                        tipo='text'
                        texto = 'Nombre de Usuario'
                        nombre = 'nomUsuario'
                    />

                    <Campo
                        tipo='text'
                        texto = 'Contraseña'
                        nombre = 'contrasena'
                    />
                        
                    <Boton
                        tipo = 'pendiente'
                        ruta = 'pendiente'
                        textoIcono = 'hola'
                        nomBoton = 'INICIAR SESION'
                    />
                        
                    <div className ={stylesTexto.textoLogin}>
                        <Enlaces 
                            nomEnlace="¿Olvidaste tu contraseña?"
                            onClick={abrirPopup}
                        />
                        <p> ¿No tienes una cuenta? 
                        <Enlaces 
                            nomEnlace="Registrarse" 
                            ruta="/registro"
                        />
                        </p>

                    </div>
                </div>
            </form>
            
            {mostrarPopup && <PopUpPassReset cerrar={cerrarPopup} />}
        </div>
    )
}

export default FormLogin