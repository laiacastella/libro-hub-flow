"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components";
import styles from "./BarraBusqueda.module.css";

export default function BarraBusqueda({ alBuscar }) {
    const [texto, setTexto] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (texto !== "") {
                alBuscar(texto);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [texto]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <Input 
                        tipo="text" 
                        className={styles.input} 
                        placeholder="Ej: título o autor" 
                        value={texto} 
                        onFocus={() => {
                            setTexto(""); // limpia input al enfocar
                            alBuscar(""); // resetea filtro y página
                        }}
                        onChange={(e) => setTexto(e.target.value)} 
                    />
                </div>
                {/*<div className="col-12 col-md-3 text-center">
                    <Boton icono={Search} texto=" Buscar" />
                </div>*/}  
            </div>  
        </div>
    );
}
