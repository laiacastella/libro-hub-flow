import Campo from "../Campo/Campo"
import Boton from "../Boton/Boton"
import Selector from "../Selector/Selector"
import styles from '../disenoForm.module.css'
import AreaTexto from "../AreaTexto/AreaTexto"
import Portada from "../Portada/Portada"

import React, { useState, useEffect } from 'react';
import useUsuario from "@/hooks/useUsuario";

const OPCIONES_ESTADO = [
  { value: 'nuevo', label: 'Como Nuevo' },
  { value: 'excelente', label: 'Excelente' },
  { value: 'bueno', label: 'Buen estado (Leves señales de uso)' },
  { value: 'aceptable', label: 'Aceptable (Desgaste visible)' },
  { value: 'deteriorado', label: 'Deteriorado (Para restauración)' }
];


const FormSubirLibro = () => {
  const usuario = useUsuario();   
  const [generosBD, setGenerosBD] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    id_genero: '',
    estado: '',
    descripcion: '',
    portada: null
  });

  // 1. Cargar géneros de la base de datos al iniciar
  useEffect(() => {
    fetch('/api/generos') // Asumiendo que crearás este endpoint en Next.js
      .then(res => res.json())
      .then(data => {
        const formateados = data.map(g => ({
          value: g.id, 
          label: g.nombre
        }));
        setGenerosBD(formateados);
      })
      .catch(err => console.error("Error al obtener géneros:", err));
  }, []);

  // 2. Manejador de cambios genérico
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // 3. Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

if (!usuario || !usuario.id_usuario) {
            alert("Debes iniciar sesión para publicar un libro.");
            return;

  };

  const libroData = {
            id_usuario: usuario.id_usuario, // <--- Aquí usamos tu Hook
            titulo: formData.titulo,
            autor: formData.autor,
            foto_portada: "url_de_ejemplo.jpg", // Esto lo definiremos luego
            estado_fisico: formData.estado,
            descripcion: formData.descripcion,
            id_genero: formData.id_genero
        };

        try {
            const response = await fetch('/api/libros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(libroData)
            });

            const resultado = await response.json();

            if (resultado.success) {
                alert("¡Libro subido con éxito!");
                // Aquí podrías limpiar el formulario o redireccionar
            } else {
                alert("Error: " + resultado.error);
            }
        } catch (error) {
            console.error("Error al conectar con la API:", error);
        }
    };

  return (
        <div className= {styles.estiloForm}>

    <form onSubmit={handleSubmit} >

      {/* Componente Portada (Arriba para impacto visual) */}
      <Portada 
        name="portada" 
        onChange={handleChange} 
      />

      {/* Campos de Texto */}
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

      {/* Selectores */}
      <div >
        <Selector 
          name="id_genero" 
          placeholder="Género (Categoría)" 
          options={generosBD} 
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
      </div>

      {/* Área de Descripción */}
      <AreaTexto 
        name="descripcion" 
        placeholder="Escribe una breve sinopsis o descripción del libro..." 
        value={formData.descripcion} 
        onChange={handleChange} 
        rows={6}
      />

      <button type="submit" >
        Publicar Libro
      </button>
    </form>

        </div>
    )
}

export default FormSubirLibro