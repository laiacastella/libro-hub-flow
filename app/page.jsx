"use client";

import { HeaderHome, Boton, CardIcono } from "@/components";
import styles from "./page.module.css";
import Contador from "../components/UI/Contador/Contador";
import datos from "../data/libros.json";
import Carrusel from "../components/Carrusel/Carrusel";
import LibroCarrusel from "@/components/Carrusel/LibroCarrusel";
import dataReseñas from "../data/reseñas.json";
import CardReseña from "../components/Cards/CardReseña/CardReseña";

export default function Home() {
    const listaLibros = datos.libros;

    return (
        <main className={styles.main}>
            <HeaderHome />

            <div className={styles.contenedorInfo}>
                <div className={styles.contenedorImg}></div>

                <div className={styles.texto}>
                    Somos <b>LibroHubFlow</b>, la plataforma web de intercambios de libros donde la pasión por la lectura fluye sin límites.
                </div>
                <Boton type="button" texto="Encuentra tu libro" enlace="inicioSesion" />

                <div className={styles.titulo}>Un proceso simple para descubrir tu proxima lectura</div>

                <div className={styles.contenedorCards}>
                    <CardIcono alt="icono añadir" rutaIcono="/square-plus.svg" texto="Añade facilmente los libros que quieres intercambiar" />

                    <CardIcono alt="icono libros" rutaIcono="/books.svg" texto="Explora miles de ejemplares de otros usuarios y solicita los que te interesen con un solo clic" />

                    <CardIcono alt="icono camion entrega" rutaIcono="/truck-delivery.svg" texto="Una vez aceptado el intercambio , coordina el envio con el otro usuario" />

                    <CardIcono alt="icono cara feliz con check" rutaIcono="/mood-check.svg" texto="Intercambiaste, leíste... ¡Ahora inspira! ¿Lo prestas o lo recomiendas?" />
                </div>

                <div className={styles.titulo}>Libros recién publicados</div>

                <Carrusel items={listaLibros} slidesToShow={4} renderItem={(libro) => <LibroCarrusel libro={libro} />} />

                <div className={styles.titulo}>Forma parte de nuestra comunidad</div>

                <Carrusel items={dataReseñas.testimonios} slidesToShow={3} renderItem={(reseña) => <CardReseña testimonio={reseña} />} />

                <div className={styles.titulo}>
                    Más de <Contador valorFinal={1000} /> lectores que ya están haciendo fluir sus historias.
                </div>

                <div className={styles.contenedorImg2}></div>

                <div className={styles.titulo}>Detrás del Hub</div>

                <div className={styles.texto}>En LibroHubFlow creemos que un libro olvidado es una historia pausada. Nuestra misión es simple: que los libros circulen, las ideas se compartan y el planeta respire.</div>

                <div className={styles.contenedorCards}>
                    <CardIcono alt="icono mundo con flecha" rutaIcono="/world-share.svg" titulo="Comparte y Descubre" texto="Tu próxima lectura te está esperando gratis. Conecta estanterías de todo el país y accede a miles de títulos sin barreras." />
                    <CardIcono alt="icono mensajes" rutaIcono="/messages.svg" titulo="Conecta y Debate" texto="Mucho más que un intercambio. Entra en el foro, comparte tus teorías y encuentra a lectores que vibran con tus mismos autores." />
                    <CardIcono rutaIcono="/recycle.svg" titulo="Dale un respiro al Planeta" texto="Leer con conciencia es posible. Al hacer recircular tus libros, reduces el desperdicio y nos ayudas a crear un futuro más sostenible." />
                </div>

                <div className={styles.titulo}>
                    Miles de historias... <br />
                    Un solo punto de partida
                </div>

                {/* <Boton
                 type="button" 
                texto="Registrarse" 
                enlace="inicioSesion"
                /> */}
            </div>
        </main>
    );
}
