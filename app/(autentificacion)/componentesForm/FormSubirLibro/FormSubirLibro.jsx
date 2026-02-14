import Campo from "../Campo/Campo"
import Boton from "../Boton/Boton"
import styles from '../disenoForm.module.css'
const FormSubirLibro = () => {
    return (
        <div className= {styles.estiloForm}>
            <div className="contenedorColumnas">
            <div className="contendorPortada">

            </div>
            <div className = "contenedorCampos">
                <Campo 
                    tipo='text'
                    texto ='Titulo del libro'
                    nombre= 'tituloLibro'
                />
                <Campo 
                    tipo='text'
                    texto ='Autor'
                    nombre= 'autor'
                />

                <Campo 
                    tipo='text'
                    texto ='Genero'
                    nombre= 'genero'
                />
            </div>
            <Boton 
                tipo= 'submit'
                ruta = 'pendiente'
                texto = 'pendiente'
                nomBoton= 'SUBIR LIBRO'
            />
            </div>
        </div>
    )

}

export default FormSubirLibro