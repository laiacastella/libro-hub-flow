"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { 
    Estrellas,
    ComponenteBiblioteca,
    Solicitudes,
    Valoraciones, 
    Boton, 
    Contador, 
    EscribirTexto } from "@/components";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import styles from "./page.module.css";

export default function PerfilUsuario() {
    
    const usuarioLogueado = useUsuario();
    const searchParams = useSearchParams();
    const targetId = searchParams.get("id");
    
    const [usuarioMostrado, setUsuarioMostrado] = useState(null);
    const [isMismoUsuario, setIsMismoUsuario] = useState(true);
    const [tieneValoraciones, setTieneValoraciones] = useState(false); // Estado para saber si hay valoraciones

    const [numLibros, setNumLibros] = useState(0);
    const [numSolicitudes, setNumSolicitudes] = useState(0);
    const [numIntercambios, setNumIntercambios] = useState(0);
    
    const tabParam = searchParams.get("tab");
    const [paginaActiva, setPaginaActiva] = useState(tabParam || "biblioteca");

    useEffect(() => {
        if (tabParam === "solicitudes" && !isMismoUsuario) {
            setPaginaActiva("biblioteca");
        } else {
            setPaginaActiva(tabParam || "biblioteca");
        }
    }, [tabParam, isMismoUsuario]);
    
    const esActivo = (tab) => paginaActiva === tab;

    const colorTextoColor = (tab) =>
        esActivo(tab)
            ? { inicio: "#ffffff", fin: "#ffffff" }
            : { inicio: "#333333", fin: "#333333" };

    const colorLibros = colorTextoColor("biblioteca");
    const colorSolicitud = colorTextoColor("solicitudes");
    const colorValoracion = colorTextoColor("valoraciones");

    useEffect(() => {
        setUsuarioMostrado(null);
        const idActual = paginaActiva === "solicitudes" 
            ? usuarioLogueado?.id_usuario 
            : (targetId || usuarioLogueado?.id_usuario);

        if (!idActual || idActual === "undefined" || idActual === "null") return;

        fetch(`/api/usuarios/${idActual}`)
            .then(r => r.json())
            .then(data => {
                setUsuarioMostrado(data);
                setIsMismoUsuario(usuarioLogueado?.id_usuario ? Number(idActual) === Number(usuarioLogueado.id_usuario) : false);
            });

        // NUEVO: Verificamos si tiene valoraciones reales
        fetch(`/api/valoraciones/usuario/${idActual}`)
            .then(r => r.json())
            .then(data => {
                setTieneValoraciones(Array.isArray(data) && data.length > 0);
            })
            .catch(() => setTieneValoraciones(false));

    }, [usuarioLogueado, targetId, paginaActiva]);

    useEffect(() => {
        if (!usuarioLogueado?.id_usuario) return;
        const idActual = isMismoUsuario ? usuarioLogueado.id_usuario : targetId;
        if (!idActual) return;

        Promise.all([
            fetch(`/api/intercambios/finalizados?user=${idActual}`).then(r => r.json()),
            fetch(`/api/intercambios?mode=count&user=${idActual}`).then(r => r.json()),
            fetch(`/api/libros/count?user=${idActual}`).then(r => r.json())
        ])
        .then(([intercambiosData, solicitudesData, librosData]) => {
            setNumIntercambios(intercambiosData?.total || 0);
            setNumSolicitudes(solicitudesData?.total || 0);
            setNumLibros(librosData?.total || 0);
        });
    }, [isMismoUsuario, usuarioLogueado, targetId]);

    if (!usuarioMostrado) return <div className="text-center my-5">Cargando perfil...</div>;

    return (
        <main className={`container-fluid my-4 ${styles.fondo}`}>
            <div className={`row align-items-center ${styles.perfil}`}>
                <div className={`col-12 col-md-3 text-center ${styles.foto}`}>
                    <Image src={usuarioMostrado?.foto_perfil || "/perfilUsuario.svg"} alt="perfil" width={200} height={200} className={styles.fotoPerfil} unoptimized />
                </div>
                <div className={`col-12 col-md-7 text-center text-md-start ${styles.datos}`}>
                    <EscribirTexto texto={`${usuarioMostrado?.nombre || ''} ${usuarioMostrado?.apellidos || ''} (${usuarioMostrado?.nick_usuario || ''})`} Tipo="h2" velocidad="30" />
                    {isMismoUsuario && <EscribirTexto texto={usuarioMostrado?.email || ""} Tipo="h3" velocidad="30" />}
                    <EscribirTexto texto={`${usuarioMostrado?.poblacion || ''}, ${usuarioMostrado?.provincia || ''}`} Tipo="h3" velocidad="30" />
                    {usuarioMostrado?.codigo_postal && (<EscribirTexto texto={`Código Postal: ${usuarioMostrado.codigo_postal}`} Tipo="h3" velocidad="30" />)}
                    {isMismoUsuario && usuarioMostrado?.telefono && (<EscribirTexto texto={`Teléfono: ${usuarioMostrado.telefono}`} Tipo="h3" velocidad="30" />)}
                    <div className="d-flex align-items-baseline gap-2 justify-content-center justify-content-md-start">
                        <Contador key={`intercambios-${numIntercambios}`} valorFinal={numIntercambios || 0} colorInicio="#407c42" colorFin="#000000" duracion="300" />
                        <EscribirTexto texto="Intercambios completados" Tipo="h3" velocidad="30" />
                    </div>
                </div>
                {isMismoUsuario && (
                    <div className={`col-12 col-md-2 ${styles.editarDatos}`}>
                        <Boton type="button" texto="Editar datos" enlace="editarCuenta" />
                    </div>
                )}
            </div>

            <div className={`row text-center d-flex ${styles.navegacion}`}>
                <div className={`col-12 ${isMismoUsuario ? "col-md-4" : "col-md-6"} mb-2`}>        
                    <div tabIndex={0} className={`${styles.paginas} ${paginaActiva === "biblioteca" ? styles.activo : ""}`} onClick={() => setPaginaActiva("biblioteca")}>
                        <h1><Contador key={`libros-${paginaActiva}-${numLibros}`} valorFinal={numLibros || 0} colorInicio={colorLibros.inicio} colorFin={colorLibros.fin} duracion="500" /></h1>
                        <h2>Libros disponibles</h2>
                    </div>
                </div>

                {isMismoUsuario && (
                    <div className="col-12 col-md-4 mb-2">
                        <div tabIndex={0} className={`${styles.paginas} ${paginaActiva === "solicitudes" ? styles.activo : ""}`} onClick={() => setPaginaActiva("solicitudes")}>
                            <h1><Contador key={`solicitudes-${paginaActiva}-${numSolicitudes}`} valorFinal={numSolicitudes || 0} colorInicio={colorSolicitud.inicio} colorFin={colorSolicitud.fin} duracion="500" /></h1>
                            <h2>Solicitudes de intercambio</h2>
                        </div>
                    </div>
                )}

                <div className={`col-12 ${isMismoUsuario ? "col-md-4" : "col-md-6"} mb-2`}>
                    <div tabIndex={0} className={`${styles.paginas} ${paginaActiva === "valoraciones" ? styles.activo : ""}`} onClick={() => setPaginaActiva("valoraciones")}>
                        <h1>
                            {/* Solo mostramos el número si hay valoraciones reales */}
                            {tieneValoraciones && (
                                <Contador
                                    key={`valoracion-${paginaActiva}-${usuarioMostrado?.puntuacion_promedio}`}
                                    valorFinal={usuarioMostrado?.puntuacion_promedio ?? 0}
                                    colorInicio={colorValoracion.inicio}
                                    colorFin={colorValoracion.fin}
                                    duracion="500"
                                />
                            )}
                            <Estrellas valoracion={`${usuarioMostrado?.puntuacion_promedio ?? 0}`} />
                        </h1>
                        <h2>Valoración media</h2>
                    </div>
                </div>
            </div>

            <div className={`row ${styles.contenido}`}>
                <div className="col-12">
                    {paginaActiva === "biblioteca" && <ComponenteBiblioteca id_usuario={isMismoUsuario ? usuarioLogueado?.id_usuario : targetId} esPerfil={true} />}
                    {isMismoUsuario && paginaActiva === "solicitudes" && <Solicitudes />}
                    {paginaActiva === "valoraciones" && <Valoraciones userId={usuarioMostrado?.id_usuario} />}
                </div>
            </div>
        </main>
    );
}