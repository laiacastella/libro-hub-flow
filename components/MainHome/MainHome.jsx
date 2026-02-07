"use client"
import { useRouter } from 'next/navigation';
import estilos from './MainHome.module.css';

export function MainHome() {
  const enrutador = useRouter();

  return (
    <section className={estilos.contenedorPrincipal}>
      <div className={estilos.bloqueTexto}>
        <p>
          <strong>LibroFlowHub</strong> es la plataforma web de intercambios de libros...
          <br />
          <span className={estilos.subtitulo}>Un proceso simple para descubrir tu próxima lectura.</span>
        </p>
      </div>
      
      <button 
        className={estilos.botonAccion}
        onClick={() => enrutador.push('con-marco/biblioteca')}
      >
        ENCUENTRA TU LIBRO
      </button>
    </section>
  );
}