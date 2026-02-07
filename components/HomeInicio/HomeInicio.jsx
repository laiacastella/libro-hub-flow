import {MainHome} from "@/components/MainHome/MainHome.jsx";
import {TarjetaWhy} from "@/components/TarjetaWhy/TarjetaWhy.jsx";
import estilos from "./HomeInicio.module.css";

export default function HomeInicio() {
  return (
    <div className={estilos.pagina}>
      {/* Sección Superior con imagen de fondo */}
      <div className={estilos.seccionSuperior}>
        <MainHome />
      </div>

      {/* Sección Inferior Oscura */}
      <section className={estilos.seccionInferior}>
        <h2>¿Por qué LibroHubFlow?</h2>
        <div className={estilos.contenedorTarjetas}>
          <TarjetaWhy 
            icono="/icono-card1-home.svg" 
            texto="Añade fácilmente los libros que quieres intercambiar" 
          />
          <TarjetaWhy 
            icono="/icono-card2-home.svg" 
            texto="Explora miles de ejemplares y solicita con un clic" 
          />
          <TarjetaWhy 
            icono="/icono-card3-home.svg" 
            texto="Una vez aceptado, coordina el envío con el otro usuario" 
          />
          <TarjetaWhy 
            icono="/icono-card4-home.svg" 
            texto="Intercambiaste, leíste... ¡Ahora inspira!" 
          />
        </div>
      </section>
    </div>
  );
}