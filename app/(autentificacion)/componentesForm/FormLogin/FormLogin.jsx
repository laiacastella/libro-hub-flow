import Campo from "../Campo/Campo.jsx"
import Boton from "../Boton/Boton.jsx"
import Enlaces from "../Enlaces/Enlaces.jsx"
import styles from '../disenoForm.module.css'
import stylesTexto from './FormLogin.module.css'

const FormLogin = () => {
    return (
        <div>
            <form className={styles.estiloForm}>
                 <div className={styles.contenedorLogo}>
                <img src='/logo-h1Negro.svg' alt='logo App' />
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
                        ruta = ''
                        nomEnlace = '¿Olvidaste tu contraseña?'
                    />
                    <p> ¿No tienes una cuenta? 
                    <Enlaces
                        ruta = ''
                        nomEnlace = 'Registrarse'
                    />

                    </p>

                </div>
                </div>
            </form>
        </div>
    )
}

export default FormLogin