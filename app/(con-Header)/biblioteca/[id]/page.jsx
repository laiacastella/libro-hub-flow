"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import useLibroActivo from "@/hooks/useLibroActivo"; 
import Comentarios from "@/components/Comentarios/Comentarios";
import Valoraciones from "@/components/Valoraciones/Valoraciones";
import styles from "./ficha.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

            fetch(`/api/comentarios?id_libro=${id}`)
                .then((res) => res.json())
                .then((data) => setComentarios(data.data || data))
                .catch(() => setComentarios([]));
        }
    }, [id, guardarLibroActivo]);

    const esMiLibro = libro && usuario && Number(libro.id_usuario) === Number(usuario.id_usuario);

    if (cargando) return <div className="text-center mt-5">Cargando ficha...</div>;
    if (!libro) return <div className="text-center mt-5">Libro no encontrado</div>;

    return (
        <div className={styles.fondoContenedor}>
            {/* Tarjeta principal*/}
            <div className={`container shadow-sm bg-white rounded-4 p-4 p-md-5 ${styles.tarjetaPrincipal}`}>
                
                <div className="row g-4 align-items-start">
                    {/* Portada */}
                    <div className="col-12 col-md-4 text-center">
                        <img 
                            src={libro.foto_portada} 
                            alt={libro.titulo} 
                            className={`img-fluid rounded-3 shadow ${styles.portada}`} 
                        />
                    </div>
                    
                    {/* Info del Libro */}
                    <div className="col-12 col-md-8">
                        <div className="ps-md-3">
                            <h1 className="fw-bold h2">{libro.titulo}</h1>
                            <p className="text-muted mb-4">de {libro.autor}</p>
                            
                            <p className="small mb-1 text-secondary">Género: {libro.genero || "No especificado"}</p>
                            <p className="text-dark mb-4" style={{ textAlign: 'justify', fontSize: '0.95rem' }}>
                                {libro.descripcion}
                            </p>

                            {/* Condicional de botones según diseño */}
                            <div className="mt-4">
                                {esMiLibro ? (
                                    <button className={`btn btn-success px-4 py-2 ${styles.btnPrincipal}`}>
                                        Editar Datos Libro
                                    </button>
                                ) : (
                                    <div className="card border shadow-sm p-3 rounded-4 d-flex flex-row align-items-center justify-content-between gap-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className={styles.avatarMini}></div>
                                            <div>
                                                <p className="mb-0 x-small text-muted" style={{fontSize: '0.7rem'}}>Propietario:</p>
                                                <p className="mb-0 fw-bold small">{libro.nombre_usuario || "Ana García"}</p>
                                                <Valoraciones idUsuario={libro.id_usuario} />
                                            </div>
                                        </div>
                                        <button className={`btn btn-success px-3 ${styles.btnPrincipal}`}>
                                            Solicitar intercambio
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección Reseñas*/}
                <div className={`mt-5 p-4 rounded-4 ${styles.seccionResenas}`}>
                    <h4 className="fw-bold mb-4" style={{fontSize: '1.1rem'}}>Reseñas de la comunidad</h4>
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