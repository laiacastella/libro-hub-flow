"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import estilos from "./ficha.module.css";

export default function FichaLibro() {
    const { id } = useParams();
    const [libro, setLibro] = useState(null);
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        if (id) {
            // 1. Cargar datos del libro
            fetch(`/api/libros/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    const resultado = Array.isArray(data) ? data[0] : data.data ? (Array.isArray(data.data) ? data.data[0] : data.data) : data;
                    setLibro(resultado);
                });

            // 2. Cargar COMENTARIOS
            fetch(`/api/comentarios?id_libro=${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Error en API Comentarios");
                    return res.json();
                })
                .then((data) => {
                    setComentarios(data.data || data);
                })
                .catch((err) => {
                    console.error("Fallo al cargar comentarios:", err);
                    setComentarios([]);
                });
        }
    }, [id]);

    if (!libro) return <p className={estilos.cargando}>Cargando...</p>;

    return (
        <div className={estilos.fondoContenedor}>
            <div className={estilos.tarjetaPrincipal}>
                <div className={estilos.seccionSuperior}>
                    <img src={libro.foto_portada} alt={libro.titulo} className={estilos.portada} />
                    <div className={estilos.infoBasica}>
                        <h1 className={estilos.titulo}>{libro.titulo}</h1>
                        <p className={estilos.autor}>de {libro.autor}</p>
                        <p className={estilos.descripcion}>{libro.descripcion}</p>
                        {/* Cuadro Propietario */}
                        <div className={estilos.cuadroPropietario}>
                            <div className={estilos.perfilPropietario}>
                                <div className={estilos.avatar}></div>
                                <div>
                                    <p className={estilos.propietarioTxt}>Propietario:</p>
                                    <p className={estilos.nombrePropietario}>Ana García</p>
                                </div>
                            </div>
                            <button className={estilos.btnSolicitar}>Solicitar intercambio</button>
                        </div>
                    </div>
                </div>

                {/* Sección de Comentarios*/}
                <div className={estilos.seccionResenas}>
                    <h3 className={estilos.tituloResenas}>Comentarios de la comunidad</h3>
                    {comentarios && comentarios.length > 0 ? (
                        comentarios.map((c) => (
                            <div key={c.id_comentario} className={estilos.cajaResena}>
                                <div className={estilos.userCircle}></div>
                                <div className={estilos.textoResena}>
                                    <span className={estilos.idUsuario}>Usuario #{c.id_usuario}</span>
                                    <p>{c.comentario}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={estilos.sinComentarios}>todavía hay comentarios</p>
                    )}
                </div>
            </div>
        </div>
    );
}
