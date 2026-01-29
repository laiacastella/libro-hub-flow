import Header from "@/components/Header/Header";
export default function Home() {
    return (
        <>
            <Header />
            <main>
                <section>
                    <p>
                        <strong>LibroFlowHub</strong> es la plataforma web de intercambios de libros donde la pasión por la lectura fluye sin límites. Descubre nuevas historias, dale una segunda vida a tus libros y comienza tu próximo capítulo con un solo clic.
                        <b>Un proceso simple para descubrir tu proxima lectura.</b>
                    </p>
                    <a href="">Encuentra tu libro</a>
                </section>
                <section>
                    <h3>¿Por qué LibroHubFlow</h3>
                    <article className="card-one">
                        <img src="/icono-card1-home.svg" alt="card-one" />
                        <p>Añade facilmente los libros que quieres intercambiar</p>
                    </article>
                    <article className="card-two">
                        <img src="/icono-card2-home.svg" alt="card-two" />
                        <p>Explora miles de ejemplares de otros usuarios y solicita los que te interesen con un solo clic</p>
                    </article>
                    <article className="card-three">
                        <img src="/icono-card3-home.svg" alt="card-three" />
                        <p>Una vez aceptado el intercambio , coordina el envio con el otro usuario</p>
                    </article>
                    <article className="card-four">
                        <img src="/icono-card4-home.svg" alt="card-four" />
                        <p>Intercambiaste, leíste... ¡Ahora inspira! ¿Lo prestas o lo recomiendas?</p>
                    </article>
                </section>
            </main>
            <footer>
                <p>Desarrolladores:</p>
            </footer>
        </>
    );
}
