import Campo from '../Campo/Campo.jsx'
import Boton from '../Boton/Boton.jsx'
import styles from './FormRegistro.module.css'
import stylesGlobal from  '../disenoForm.module.css'
import { Enlaces } from "@/components";
import Link from "next/link";

const FormRegistro = () => {
    return (
        <div className={stylesGlobal.estiloForm}> 
        <form > 
            <div className={stylesGlobal.contenedorLogo}>
                <Link href="/">
                    <img src='/logo-h1Negro.svg' alt='logo App' />
                </Link>
            </div>

            <div className={stylesGlobal.contenedorCampos}>
            <Campo
                nombre = 'nombre'
                tipo = 'text'
                texto = 'Introduzca su Nombre'
            />
            <Campo
                nombre = 'apellidos'
                tipo = 'text'
                texto = 'Introduzca sus Apellidos'
            />

            <Campo
                nombre = 'nomUsuario'
                tipo = 'text'
                texto = 'Introduzca su nombre de usuario'
            />
            
            <Campo
                nombre = 'correo'
                tipo = 'email'
                texto = 'Introduzca su correo electronico'
            />

            <Campo
                nombre = 'movil'
                tipo = 'texto'
                texto = 'Introduzca su numero movil'
            />

            <Campo
                nombre = 'codigoPostal'
                tipo = 'text'
                texto = 'Introduzca su codigo postal'
            />

            <div className = {styles.contenedorDoble}> 
                <Campo
                nomClase = 'campoProvincia'
                nombre = 'provincia'
                tipo = ''
                texto = 'Seleccione provincia'
                />

            <Campo
                nomClase = 'campoMunicipio'
                nombre = 'municipio'
                tipo = ''
                texto = 'Seleccione municipio'
            />
            </div>
            <Campo
                nombre = 'contrasena'
                tipo = 'password'
                texto = 'Introduzca su contraseña'
            />
            
            <Campo
                nombre = 'contrasena'
                tipo = 'password'
                texto = 'Confirmar contraseña'
            />

            <Boton
                ruta = '/nuevoUsuario.png'
                textoIcono = 'Crear usuario'
                nomBoton = 'CREAR USUARIO'
                tipo = 'submmit'
            />
            </div>
        </form>
        <p className={styles.textoLogin}>
              ¿Ya tienes una cuenta? 

        <Enlaces
            ruta = '/inicioSesion'
            nomEnlace = 'Iniciar Sesion'
        />
        </p>
        </div>
    )
}

export default FormRegistro