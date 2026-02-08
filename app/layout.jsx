import {HeaderHome} from "@/components/HeaderHome/HeaderHome.jsx"
import {Footer} from "@/components/Footer/Footer.jsx"
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <HeaderHome></HeaderHome>
                    {children}
                <Footer></Footer>
            </body>
        </html>
    );
}
