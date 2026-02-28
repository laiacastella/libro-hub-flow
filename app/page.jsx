"use client";

import { HeaderHome, Boton, CardIcono } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {

    return (
    
        <div className={styles.contenedorPrincipal}>

        <div className={styles.contenedorFijo}>
        
        <div className={styles.fondo}> 
             <HeaderHome/>
        </div>

        </div>
        
        <div className = {styles.contenedorInfo}> 

            <h1 className= {styles.titulo}> LibroHubFlow </h1>
             
                    <div className={styles.descripConBoton}>
                        <div className={styles.descripcion}>
                         La plataforma web de intercambios de libros donde la pasión por la lectura fluye sin límites. <br /> 
                        <br />
                        Descubre nuevas historias, dale una segunda vida a tus libros y comienza tu próximo capítulo con un solo clic.
                            
                        </div>

                        <div className={
                            styles.Boton
                        }> <Link href="/inicioSesion">
                            <Boton type="button" texto="Encuentra tu libro" />
                        </Link>
                        
                         </div> 

                        <h1 className={styles.titulo}>
                            ¿Por qué LibroHubFlow?
                        </h1>

                        <p className = {styles.descripcion}>Un proceso simple para descubrir tu proxima lectura.</p>

                    <div className = {styles.contenedorCards}>
                            
                       <CardIcono
                        rutaIcono = '/icono-card1-home.svg'
                        nombreIcono='Icono1'
                        texto='Añade facilmente los libros que quieres intercambiar'
                       />

                          <CardIcono
                        rutaIcono = '/icono-card2-home.svg'
                        nombreIcono='Icono2'
                        texto='Explora miles de ejemplares de otros usuarios y solicita los que te interesen con un solo clic'
                       />

                          <CardIcono
                        rutaIcono = '/icono-card3-home.svg'
                        nombreIcono='Icono3'
                        texto='Una vez aceptado el intercambio , coordina el envio con el otro usuario'
                       />

                           <CardIcono
                        rutaIcono = '/icono-card4-home.svg'
                        nombreIcono='Icono4'
                        texto='Intercambiaste, leíste... ¡Ahora inspira! ¿Lo prestas o lo recomiendas?'
                       />
                    </div>

                    <h1 className = {styles.titulo}> Miles de historias... <br />
                    Un solo punto de partida</h1>
                </div>

        </div>

        </div>
       
    );
}
