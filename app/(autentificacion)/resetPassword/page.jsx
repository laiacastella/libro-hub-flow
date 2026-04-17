"use client";

import { Suspense } from "react";
import resetPasswordContent from "./resetPasswordContent";

export default function Page() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
        <resetPasswordContent />
        </Suspense>
    );
}