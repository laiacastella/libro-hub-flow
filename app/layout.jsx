"use client"

import BootstrapProvider from "@/components/BootstrapProvider";
import { Footer } from "@/components/index";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
    useAuthRedirect();
    
    return (
        <html lang="es">
            <head>
                <title>LibroHubFlow</title>
                <meta name="description" content="Una plataforma para intercambiar libros de manera fácil y segura." />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=6" />
                <link rel="icon" href="/logo.svg" />
            </head>
            <body>
                <BootstrapProvider>{children}</BootstrapProvider>
                <Footer />
            </body>
        </html>
    );
}
