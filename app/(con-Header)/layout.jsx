import BootstrapProvider from "@/components/BootstrapProvider";
import { Header } from "@/components/index";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
    return (
        <>
        <Header />
            <BootstrapProvider>
                {children}
            </BootstrapProvider>
        </>
    );
}
