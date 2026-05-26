"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './PopUpEditarLibro.module.css';
import { Save, X, CheckCircle } from 'lucide-react';
import { Input, Boton, Select, AreaTexto, PopUp } from "@/components";
import { useRouter } from 'next/navigation';

const OPCIONES_ESTADO = [
  { value: 'nuevo', label: 'Como Nuevo' },
  { value: 'excelente', label: 'Excelente' },
  { value: 'bueno', label: 'Buen estado' },
  { value: 'aceptable', label: 'Aceptable' },
  { value: 'deteriorado', label: 'Deteriorado' }
];

const PopUpEditarLibro = ({ isOpen, onClose, libroActual, onActualizado }) => {
  const [generosBD, setGenerosBD] = useState([]);
  const router = useRouter();
  const [estaSubiendoImagen, setEstaSubiendoImagen] = useState(false);
  
  const fileInputRef = useRef(null);

  // Modales de control de flujo
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    id_genero: '',
    estado: '',
    descripcion: '',
    portada: null // portada nueva 
  });

  // Datos predefinidos
  useEffect(() => {
    if (libroActual && isOpen) {
      setFormData({
        titulo: libroActual.titulo || '',
        autor: libroActual.autor || '',
        id_genero: libroActual.id_genero || '',
        estado: libroActual.estado_fisico || '',
        descripcion: libroActual.descripcion || '',
        portada: null // Resetear al abrir
      });
    }
  }, [libroActual, isOpen]);

  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const res = await fetch('/api/generos');
        const data = await res.json();
        setGenerosBD(data.map(g => ({ value: g.id, label: g.nombre })));
      } catch (err) { console.error(err); }
    };
    if (isOpen) cargarGeneros();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name || e.target.getAttribute('nombre');
    if (fieldName) {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const handlePortadaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, portada: e.target.files[0] }));
    }
  };

  const preHandleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleFinalSubmit = async () => {
    setShowConfirm(false);

    try {
      let foto_portada_final = libroActual.foto_portada;

      if (formData.portada && formData.portada instanceof File) {
        setEstaSubiendoImagen(true);
        const formDataUpload = new FormData();
        formDataUpload.append("archivo", formData.portada);

        const resUpload = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });
        
        const dataUpload = await resUpload.json();
        
        if (dataUpload.status_code === 200 || resUpload.ok) {
          foto_portada_final = dataUpload.image.display_url;
        } else {
          alert("Error al subir la nueva portada");
          setEstaSubiendoImagen(false);
          return;
        }
      }

      const libroEditado = {
        id_libro: Number(libroActual.id_libro),
        titulo: formData.titulo?.trim() ? formData.titulo.trim() : libroActual.titulo,
        autor: formData.autor?.trim() ? formData.autor.trim() : libroActual.autor,
        foto_portada: foto_portada_final, 
        estado_fisico: formData.estado ? formData.estado : libroActual.estado_fisico,
        descripcion: formData.descripcion?.trim() ? formData.descripcion.trim() : libroActual.descripcion,
        id_genero: formData.id_genero ? Number(formData.id_genero) : Number(libroActual.id_genero)
      };

      const response = await fetch(`/api/libros/${libroActual.id_libro}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libroEditado)
      });

      if (response.ok) {
        setShowSuccess(true); 
      } else {
        alert("El servidor rechazó la actualización. Revisa los campos obligatorios.");
      }
    } catch (error) {
      console.error("Error en la petición de actualización:", error);
      alert("Error de conexión de red.");
    } finally {
      setEstaSubiendoImagen(false);
      router.refresh();
    }
  };

  const handleCierreExitoso = () => {
    setShowSuccess(false); 
    onClose();            
    if (onActualizado) {
      onActualizado();    
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 999,
        padding: '1.5rem 1rem', overflowY: 'auto'
      }}>
        
        <div className={styles.formCard} style={{ width: '800px', maxWidth: '100%', position: 'relative' }}>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#374151', margin: 0 }}>
              Editar datos del libro
            </h3>
            <X onClick={onClose} style={{ cursor: 'pointer', color: '#9ca3af' }} size={24} />
          </div>

          <form onSubmit={preHandleSubmit}>
            <div className={styles.contenedorMain}>
              
              {/*columna de portada*/}
              <div className="d-flex flex-column align-items-center">
                <div className={styles.columnaPortada} onClick={() => fileInputRef.current?.click()}>
                  <div className={styles.wrapperImagen}>
                    <img 
                      src={formData.portada && formData.portada instanceof File ? URL.createObjectURL(formData.portada) : libroActual.foto_portada} 
                      alt="Portada del libro" 
                      className={styles.imagenActual} 
                    />
                    <div className={styles.textoModificarCentrado}>
                      Modificar Portada
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handlePortadaChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
                <p className={styles.textoInformativoImagen}>JPG o PNG hasta 10MB. (Opcional)</p>
              </div>

              {/*columna de campos*/}
              <div className={styles.columnaCampos}>
                <Input nombre='titulo' placeholder='Título' value={formData.titulo} onChange={handleChange} />
                <Input nombre='autor' placeholder='Autor' value={formData.autor} onChange={handleChange} />
                <Select nombre='id_genero' opciones={generosBD} value={formData.id_genero} onChange={handleChange} />
                <Select nombre='estado' opciones={OPCIONES_ESTADO} value={formData.estado} onChange={handleChange} />
                <AreaTexto nombre="descripcion" value={formData.descripcion} onChange={handleChange} rows={6} />
                
                <div className={styles.acciones}>
                  <Boton texto="Guardar cambios" icono={Save} type="submit" disabled={estaSubiendoImagen} />
                  <Boton texto="Cancelar" variant="red" onClick={onClose} type="button" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/*popUp: confirmación*/}
      <PopUp isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirmar cambios">
        <div className="p-2">
          <p className="mb-4">¿Estás seguro de que deseas modificar los datos de este libro? Esta acción actualizará la ficha pública.</p>
          <div className="d-flex justify-content-end gap-2">
            <Boton texto="Sí, guardar" onClick={handleFinalSubmit} type="button" />
            <Boton texto="No, revisar" variant="red" onClick={() => setShowConfirm(false)} type="button" />
          </div>
        </div>
      </PopUp>

      {/*popUp: éxito*/}
      <PopUp isOpen={showSuccess} onClose={handleCierreExitoso} title="¡Guardado!">
        <div className="text-center p-3">
          <CheckCircle size={60} color="#407c42" className="mb-3" />
          <p className="mb-4">Los cambios se han guardado exitosamente.</p>
          <Boton texto="Aceptar" onClick={handleCierreExitoso} type="button" />
        </div>
      </PopUp>
    </>
  );
};

export default PopUpEditarLibro;