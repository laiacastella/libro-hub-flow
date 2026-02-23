import BootstrapProvider from "@/components/BootstrapProvider";
import { Header } from "@/components/index";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <BootstrapProvider>{children}</BootstrapProvider>
            </body>
        </html>
    );
}
