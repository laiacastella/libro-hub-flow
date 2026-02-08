"use client";
import { useState, useEffect } from 'react';
import { BarraBusqueda } from '@/components/BarraBusqueda/BarraBusqueda.jsx';
import { LibroCard } from '@/components/LibroCard/LibroCard.jsx';
import estilos from './biblioteca.module.css';

export default function PaginaPrincipal() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');

    useEffect(() => {
    fetch('/api/libros')
      .then(async res => {
        if (!res.ok) {
          const texto = await res.text(); // Leemos el HTML del error
          console.error("Servidor devolvió HTML en lugar de JSON. El inicio del texto es:", texto.substring(0, 50));
          throw new Error("El servidor no respondió con datos.");
        }
        return res.json();
      })
      .then(data => {
        console.log("Datos recibidos:", data);
        if (Array.isArray(data)) setLibros(data);
      })
      .catch(err => console.error("Error final:", err));
  }, []);


  const librosFiltrados = libros.filter(libro => {

    const terminoBusqueda = filtro.toLowerCase().trim();

      if (!terminoBusqueda) return true;

      const titulo = (libro.titulo || "").toLowerCase();
      const autor = (libro.autor || "").toLowerCase();
      return titulo.includes(terminoBusqueda) || autor.includes(terminoBusqueda);
});

  return (
    <div className={estilos.envoltorio}>
      <main className={estilos.contenedorBiblioteca}>
        <div className={estilos.seccionBusqueda}>
          <BarraBusqueda alBuscar={(texto) => setFiltro(texto)} />
        </div>

        <section className={estilos.cuadriculaLibros}>
          {librosFiltrados.map((libro) => (
            <LibroCard 
              key={libro.id_libro} 
              titulo={libro.titulo} 
              autor={libro.autor} 
              imagen={libro.foto_portada}
            />
          ))}
        </section>

        {filtro && filtro.trim().length > 0 && (
          <div className={estilos.contenedorBotonFinal}>
            <button 
              className={estilos.botonVolverFinal} 
              onClick={() => {
                setFiltro("");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              MOSTRAR TODOS LOS LIBROS
            </button>
          </div>
        )}

        {librosFiltrados.length === 0 && (
          <p className={estilos.mensaje}>No hay libros disponibles que coincidan con la búsqueda.</p>
        )}
      </main>
    </div>
  );
}