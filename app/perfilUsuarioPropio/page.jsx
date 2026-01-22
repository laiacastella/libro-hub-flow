import Biblioteca from "@/components/Biblioteca/Biblioteca.jsx";
import styles from "./page.module.css";

export default function PerfilUsuarioPropio() {
    return (
        <main>
            <div className={styles.fondoPerfil}>
                <h2 className={styles.titular}>Biblioteca</h2>
                <div className={styles.biblioteca}>
                    <Biblioteca />
                </div>
            </div>
        </main>
    );
}
