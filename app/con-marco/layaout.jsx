import {Header} from "@/components/Header/Header.jsx"
import {Footer} from "@/components/Footer/Footer.jsx"
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <Header></Header>
                    {children}
                <Footer></Footer>
            </body>
        </html>
    );
}
