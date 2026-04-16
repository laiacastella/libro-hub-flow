import React, { useState, useEffect } from 'react';
import useUsuario from "@/hooks/useUsuario";
import stylesElement from './FormSubirLibro.module.css'

// componentes 
import Campo from "../Campo/Campo"
import Boton from "../Boton/Boton"
import Selector from "../Selector/Selector"
import AreaTexto from "../AreaTexto/AreaTexto"
import Portada from "../Portada/Portada"

// Estilos modulares
import styles from '../disenoForm.module.css'

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
  
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    id_genero: '',
    estado: '',
    descripcion: '',
    portada: null // Almacenar la URL que devuelva la API de imagen
  });

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
            alert("¡Libro subido con éxito!");
            //limpiar el formulario o redirigir al usuario
        } else {
            alert("Error: " + resultado.error);
        }
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
  };

 
  return (
    
 <div className={styles.estiloForm}> 
   
      <form onSubmit={handleSubmit}>
        
        <div className={stylesElement.contenedorMain}>
       
       <div className={stylesElement.columnaPortada}>
        <Portada 
          name="portada" 
          onChange={handleChange} 
          setSubiendoPadre={setEstaSubiendoImagen} 
        />
        </div>


    <div className={stylesElement.columnaCampos}>
        <Campo 
          name="titulo" 
          placeholder="Título del Libro" 
          value={formData.titulo} 
          onChange={handleChange} 
          required 
        />

        <Campo 
          name="autor" 
          placeholder="Autor" 
          value={formData.autor} 
          onChange={handleChange} 
          required 
        />

       
      
          <Selector 
            name="id_genero" 
            placeholder="Género (Categoría)" 
            options={generosBD} // Opciones dinámicas de la BD
            value={formData.id_genero} 
            onChange={handleChange} 
            required 
          />

          <Selector 
            name="estado" 
            placeholder="Estado del libro" 
            options={OPCIONES_ESTADO} 
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

        {/* Boton: disabled bloquea el clic si estaSubiendoImagen es true */}
        <Boton 
            tipo="submit"
            nomBoton={estaSubiendoImagen ? "Subiendo..." : "Publicar Libro"}
            // ruta="/iconos/save.svg" 
            textoIcono="Icono de guardar"
            disabled={estaSubiendoImagen} 
        />
        </div>
        </div>
      </form>
    </div>
  );
}

export default FormSubirLibro;