import {Header} from './components/Header/Header.js';
import {BarraBusqueda} from './components/BarraBusqueda/BarraBusqueda.js';
import {LibroCard} from './components/LibroCard/LibroCard.js';
import estilos from './biblioteca.module.css';

//ejemplo para los libros
const LISTA_LIBROS = [
  { id: 1, titulo: 'BELLEZA OSCURA', autor: 'JESSICA RIVAS', portada: '/portada1.jpg' },
  { id: 2, titulo: 'EL BOSQUE MÁGICO', autor: 'NAIRA GAMBOA', portada: '/portada2.jpg' },
  { id: 3, titulo: 'LAS VIDAS DENTRO DE TU CABEZA', autor: 'BLANCA MUÑOZ', portada: '/portada3.jpg' },
  { id: 4, titulo: 'HASTA QUE EL VERANO SE ACABE', autor: 'CONNOR HAMILTON', portada: '/portada4.jpg' },
  { id: 5, titulo: 'EL LEÓN, LA BRUJA Y EL ROPERO', autor: 'C. S. LEWIS', portada: '/portada5.jpg' },
  { id: 6, titulo: 'LO QUE NUNCA TE DIJE', autor: 'LAURA FERGUE', portada: '/portada6.jpg' },
  { id: 7, titulo: 'THE ABANDONED CLUNKER', autor: 'THEODORE ASH', portada: '/portada7.jpg' },
  { id: 8, titulo: 'LAS ENANAS DE ÁTROPOS', autor: 'CHLOE DELAUME', portada: '/portada8.jpg' },
];

export default function PaginaPrincipal() {
  return (
    <div className={estilos.envoltorio}>
      <Header />

      <main className={estilos.contenedorBiblioteca}>
        <div className={estilos.seccionBusqueda}>
          <BarraBusqueda />
        </div>

        <section className={estilos.cuadriculaLibros}>
          {LISTA_LIBROS.map((libro) => (
            <LibroCard 
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              imagen={libro.portada}
            />
          ))}
        </section>
      </main>
    </div>
  );
}