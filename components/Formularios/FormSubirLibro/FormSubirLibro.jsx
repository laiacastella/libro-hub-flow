import React, { useState, useEffect } from 'react';
import useUsuario from "@/hooks/useUsuario";
import stylesElement from './FormSubirLibro.module.css'
import { Upload } from 'lucide-react';
import { CheckCircle } from "lucide-react";

//componentes
import Input from '../../UI/Input/Input'
import Boton from '../../UI/Boton/Boton'
import Select from '../../UI/Select/Select'
import AreaTexto from "../../UI/AreaTexto/AreaTexto"
import Portada from "../../UI/Portada/Portada"
import PopUp from '../../UI/PopUp/PopUp'

const OPCIONES_ESTADO = [
  { value: 'nuevo', label: 'Como Nuevo' },
  { value: 'excelente', label: 'Excelente' },
  { value: 'bueno', label: 'Buen estado' },
  { value: 'aceptable', label: 'Aceptable' },
  { value: 'deteriorado', label: 'Deteriorado' }
];

const FormSubirLibro = () => {
  
  const usuario = useUsuario();   
  const [generosBD, setGenerosBD] = useState([]);
  const [estaSubiendoImagen, setEstaSubiendoImagen] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    id_genero: '',
    estado: '',
    descripcion: '',
    portada: null // Almacenar la URL que devuelva la API de imagen
  });

  const limpiarFormulario = () => {
    setFormData({
      titulo: '',
      autor: '',
      id_genero: '',
      estado: '',
      descripcion: '',
      portada: null 
    });
};

useEffect(() => {
    const cargarGeneros = async () => {
        try {
            const res = await fetch('/api/generos');
            const data = await res.json();
            
            console.log("Datos que llegaron al componente:", data);

            const opcionesFormateadas = data.map(g => ({
                value: g.id,   
                label: g.nombre 
            }));
            
            setGenerosBD(opcionesFormateadas);
        } catch (err) {
            console.error("Error al procesar el JSON de géneros:", err);
        }
    };
    cargarGeneros();
}, []);

  
  // Función para actualizar el estado formData cada vez que el usuario escribe o elige algo
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value // Si es un archivo usa el file, si no el value
    });
  };

  const formularioCompleto = 
    formData.titulo.trim() !== "" && 
    formData.autor.trim() !== "" && 
    formData.id_genero !== "" && 
    formData.estado !== "" && 
    formData.descripcion.trim() !== "" &&
    formData.portada !== null && // Asegura que ya hay una imagen
    !estaSubiendoImagen; // Si la API de imagen está trabajando, el botón sigue deshabilitado
 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación de seguridad: Si no hay usuario en el hook, no permitimos el envío
    if (!usuario || !usuario.id_usuario) {
        alert("Debes iniciar sesión para publicar un libro.");
        return;
    }

    const libroData = {
        id_usuario: usuario.id_usuario, // ID obtenido del hook useUsuario
        titulo: formData.titulo,
        autor: formData.autor,
        foto_portada: formData.portada, // URL de Freeimage
        estado_fisico: formData.estado,
        descripcion: formData.descripcion,
        id_genero: formData.id_genero
    };

    try {
        //API Route de Next.js
        const response = await fetch('/api/subir-libro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(libroData)
        });

        const resultado = await response.json();

        if (resultado.success) {
            setShowSuccess(true);
            limpiarFormulario();
            //limpiar el formulario o redirigir al usuario
        } else {
            alert("Error: " + resultado.error);
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
  };

 
  return (
    
 <div className={stylesElement.formContenedor}> 
   
      <form onSubmit={handleSubmit}>
        
        <div className={stylesElement.contenedorMain}>
       
       <div className={stylesElement.columnaPortada}>

        <Portada 
          name="portada" 
          value={formData.portada}
          onChange={handleChange} 
          setSubiendoPadre={setEstaSubiendoImagen} 
        />
        </div>

    <div className={stylesElement.columnaCampos}>

        <Input 
        nombre = 'titulo'
        placeholder = 'Titulo'
        tipo = 'text'
        value={formData.titulo} 
        onChange={handleChange} 
        />    

        <Input 
        nombre= 'autor'
        placeholder = 'Autor'
        tipo = 'text'
        value={formData.autor} 
        onChange={handleChange} 
        />
      
      <Select 
      nombre = 'id_genero'
      placeholder="Género (Categoría)" 
      opciones={generosBD} // Opciones dinámicas de la BD
      value={formData.id_genero} 
      onChange={handleChange} 
      />

      <Select 
      nombre = 'estado'
      placeholder='Estado del Libro'
      opciones={OPCIONES_ESTADO} 
      value={formData.estado} 
      onChange={handleChange} 
      required 
      />
  
      <AreaTexto 
          name="descripcion" 
          placeholder="Escribe una breve sinopsis..." 
          value={formData.descripcion} 
          onChange={handleChange} 
          rows={6}
        /> 

        <Boton 
        texto = 'Subir libro'
        type = 'submit'
        icono = {Upload}
        disabled={!formularioCompleto} 
              variant={formularioCompleto ? "default" : "disabled"}
        />  
        </div>
        </div>
      </form>

      <PopUp 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)}
        title="¡Enhorabuena!"
      >
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <CheckCircle size={50} color="#63A26C" style={{ marginBottom: '15px' }} />
          <h3>¡Libro publicado exitosamente!</h3>
          <p>Tu libro ya se encuentra disponible para la comunidad.</p>
          <div style={{ marginTop: '20px' }}>
            <Boton 
              texto="Aceptar" 
              onClick={() => setShowSuccess(false)} 
              variant="default"
            />
          </div>
        </div>
      </PopUp>

    </div>
  );
}

export default FormSubirLibro;
