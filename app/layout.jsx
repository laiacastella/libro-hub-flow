import BootstrapProvider from "@/components/BootstrapProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <BootstrapProvider>{children}</BootstrapProvider>
            </body>
        </html>
    );
}
