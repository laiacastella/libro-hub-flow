"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useAuthRedirect() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const usuario = localStorage.getItem("usuarioLogueado");

        const rutasPublicas = ["/", "/inicioSesion", "/registro"];

        if (usuario) {
            // Usuario logueado
            if (rutasPublicas.includes(pathname)) {
                router.push("/biblioteca");
            }
        } else {
            // Usuario NO logueado
            if (!rutasPublicas.includes(pathname)) {
                router.push("/");
            }
        }
    }, [pathname]);
}