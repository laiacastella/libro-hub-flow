"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import useLibroActivo from "@/hooks/useLibroActivo"; 
import Comentarios from "@/components/Comentarios/Comentarios";
import Valoraciones from "@/components/Valoraciones/Valoraciones";
import styles from "./ficha.module.css";

export default function FichaLibro() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    const usuario = useUsuario(); 
    const { guardarLibroActivo } = useLibroActivo();

    useEffect(() => {
        if (id) {
            setCargando(true);
            // Cargar datos del libro
            fetch(`/api/libros/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    const resultado = Array.isArray(data) ? data[0] : (data.data ? (Array.isArray(data.data) ? data.data[0] : data.data) : data);
                    if (resultado) {
                        setLibro(resultado);
                        guardarLibroActivo(resultado);
                    }
                })
                .catch(err => console.error("Error cargando libro:", err))
                .finally(() => setCargando(false));

            // Cargar comentarios
            fetch(`/api/comentarios?id_libro=${id}`)
                .then((res) => res.json())
                .then((data) => setComentarios(data.data || data))
                .catch(() => setComentarios([]));
        }
    }, [id, guardarLibroActivo]);

    const esMiLibro = libro && usuario && Number(libro.id_usuario) === Number(usuario.id_usuario);

    if (cargando) return <p className={styles.cargando}>Cargando ficha del libro...</p>;
    if (!libro) return <p className={styles.cargando}>No se ha encontrado el libro.</p>;

    return (
        <div className={styles.fondoContenedor}>
            <div className={styles.tarjetaPrincipal}>
                <div className={styles.seccionSuperior}>
                    <img 
                        src={libro.foto_portada} 
                        alt={libro.titulo} 
                        className={styles.portada} 
                    />
                    
                    <div className={styles.infoBasica}>
                        <h1 className={styles.titulo}>{libro.titulo}</h1>
                        <p className={styles.autor}>de {libro.autor}</p>
                        <p className={styles.descripcion}>{libro.descripcion}</p>

                        {esMiLibro ? (
                            <div className={styles.cuadroGestion}>
                                <p className={styles.propietarioTxt}>Opciones de propietario:</p>
                                <div className={styles.botonesDuenio}>
                                    <button className={styles.btnEditar}>Editar información</button>
                                    <button className={styles.btnEliminar}>Eliminar de mi biblioteca</button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.cuadroPropietario}>
                                <div className={styles.perfilPropietario}>
                                    <div className={styles.avatar}></div>
                                    <div className={styles.detallesVendedor}>
                                        <p className={styles.propietarioTxt}>Propietario:</p>
                                        <p className={styles.nombrePropietario}>{libro.nombre_usuario || "Usuario"}</p>
                                        <div className={styles.estrellasContenedor}>
                                            <Valoraciones idUsuario={libro.id_usuario} />
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.btnSolicitar}>Solicitar intercambio</button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className={styles.separador} />

                <div className={styles.seccionResenas}>
                    <h3 className={styles.tituloResenas}>Reseñas sobre este ejemplar</h3>
                    
                    {/* Cogo los datos del componente para que él haga el mapeo 
                        usando las CardComentario con estilo. */}
                    <Comentarios 
                        idLibro={id} 
                        listaComentarios={comentarios} 
                        setComentarios={setComentarios} 
                    />
                    
                </div>
            </div>
        </div>
    );
}