"use client";

import { Suspense } from "react";
import PerfilUsuarioPropioContent from "./PerfilUsuarioPropioContent";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
        <PerfilUsuarioPropioContent />
        </Suspense>
    );
}