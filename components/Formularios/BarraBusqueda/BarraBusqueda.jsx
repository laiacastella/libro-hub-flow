"use client";
import { useState, useEffect } from "react";
import { Input, Boton } from "@/components";
import styles from "./BarraBusqueda.module.css";
import { Search } from "lucide-react";

export default function BarraBusqueda({ alBuscar, setFiltro }) {
    const [texto, setTexto] = useState("");

    useEffect(() => {
        if (alBuscar) {
            alBuscar(texto);
        }
    }, [texto, alBuscar]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <Input 
                        tipo="text" 
                        className={styles.input} 
                        placeholder="Ej: titulo o autor" 
                        value={texto} 
                        onFocus={() => (setFiltro(""), setTexto(""))} 
                        onChange={(e) => setTexto(e.target.value)} 
                    />
                </div>

                <div className="col-12 col-md-3 text-center">
                    <Boton icono={Search} texto=" Buscar" />
                </div>
            </div>
        </div>
    );
}
