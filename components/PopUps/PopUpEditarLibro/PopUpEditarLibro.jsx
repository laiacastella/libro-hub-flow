import React, { useState, useEffect } from 'react';
import stylesElement from './FormSubirLibro.module.css';
import { Save } from 'lucide-react';
import { CheckCircle } from "lucide-react";

// Componentes UI
import Input from '../../UI/Input/Input';
import Boton from '../../UI/Boton/Boton';
import Select from '../../UI/Select/Select';
import AreaTexto from "../../UI/AreaTexto/AreaTexto";
import Portada from "../../UI/Portada/Portada";
import PopUp from '../../UI/PopUp/PopUp';

const OPCIONES_ESTADO = [
  { value: 'nuevo', label: 'Como Nuevo' },
  { value: 'excelente', label: 'Excelente' },
  { value: 'bueno', label: 'Buen estado' },
  { value: 'aceptable', label: 'Aceptable' },
  { value: 'deteriorado', label: 'Deteriorado' }
];

const PopUpEditarLibro = ({ isOpen, onClose, libroActual, onActualizado }) => {
  const [generosBD, setGenerosBD] = useState([]);
  const [estaSubiendoImagen, setEstaSubiendoImagen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Estado inicial con los datos del libro que pasamos por props
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    id_genero: '',
    estado: '',
    descripcion: '',
    portada: null
  });

  // Efecto para cargar los datos del libro cuando se abre el PopUp
  useEffect(() => {
    if (libroActual && isOpen) {
      setFormData({
        titulo: libroActual.titulo || '',
        autor: libroActual.autor || '',
        id_genero: libroActual.id_genero || '',
        estado: libroActual.estado_fisico || '',
        descripcion: libroActual.descripcion || '',
        portada: libroActual.foto_portada || null
      });
    }
  }, [libroActual, isOpen]);

  // Carga de géneros
  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const res = await fetch('/api/generos');
        const data = await res.json();
        const opcionesFormateadas = data.map(g => ({
          value: g.id,
          label: g.nombre
        }));
        setGenerosBD(opcionesFormateadas);
      } catch (err) {
        console.error("Error cargando géneros:", err);
      }
    };
    cargarGeneros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const libroEditado = {
      id_libro: libroActual.id_libro,
      titulo: formData.titulo,
      autor: formData.autor,
      foto_portada: formData.portada,
      estado_fisico: formData.estado,
      descripcion: formData.descripcion,
      id_genero: formData.id_genero
    };

    try {
      const response = await fetch(`/api/libros/${libroActual.id_libro}`, {
        method: 'PUT', // Usamos PUT para actualizar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libroEditado)
      });

      const resultado = await response.json();

      if (resultado.success) {
        setShowSuccess(true);
        if (onActualizado) onActualizado(); // Callback para refrescar la ficha
      } else {
        alert("Error al actualizar: " + resultado.error);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  return (
    <PopUp isOpen={isOpen} onClose={onClose} title="Editar datos del libro">
      <div className={stylesElement.contenedorMain} style={{ margin: 0, padding: '1rem' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                nombre='titulo' 
                placeholder='Titulo' 
                tipo='text' 
                value={formData.titulo} 
                onChange={handleChange} 
              />
              <Input 
                nombre='autor' 
                placeholder='Autor' 
                tipo='text' 
                value={formData.autor} 
                onChange={handleChange} 
              />
              <Select 
                nombre='id_genero' 
                placeholder="Género (Categoría)" 
                opciones={generosBD} 
                value={formData.id_genero} 
                onChange={handleChange} 
              />
              <Select 
                nombre='estado' 
                placeholder='Estado del Libro' 
                opciones={OPCIONES_ESTADO} 
                value={formData.estado} 
                onChange={handleChange} 
              />
              <AreaTexto 
                name="descripcion" 
                placeholder="Escribe una breve sinopsis..." 
                value={formData.descripcion} 
                onChange={handleChange} 
                rows={5}
              />
              <Boton 
                texto='Guardar cambios' 
                type='submit' 
                icono={Save} 
                disabled={estaSubiendoImagen}
                variant="default"
              />
            </div>
          </div>
        </form>
      </div>

      {/* PopUp de Éxito interno */}
      <PopUp isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CheckCircle size={50} color="#63A26C" style={{ marginBottom: '15px' }} />
          <h3>¡Cambios guardados!</h3>
          <p>La información del libro se ha actualizado correctamente.</p>
          <Boton texto="Aceptar" onClick={() => { setShowSuccess(false); onClose(); }} />
        </div>
      </PopUp>
    </PopUp>
  );
};

export default PopUpEditarLibro;