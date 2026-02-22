// Components
export { default as ComponenteBiblioteca } from "./ComponenteBiblioteca/ComponenteBiblioteca";
export { default as Intercambios } from "./Intercambios/Intercambios";
export { default as Solicitudes } from "./Solicitudes/Solicitudes";
export { default as Valoraciones } from "./Valoraciones/Valoraciones";
export { default as PopUpBiblioteca } from "./PopUpBiblioteca/PopUpBiblioteca";

// UI
export { default as Estrellas } from "./UI/Estrellas/Estrellas";
export { default as Paginacion } from "./UI/Paginacion/Paginacion";
export { default as Enlaces } from "./UI/Enlaces/Enlaces";
export { default as Boton } from "./UI/Boton/Boton";

// Cards
export { default as CardComentario } from "./Cards/CardComentario/CardComentario";
export { default as CardSolicitud } from "./Cards/CardSolicitud/CardSolicitud";
export { default as CardValoracion } from "./Cards/CardValoracion/CardValoracion";
export { default as CardLibro } from "./Cards/CardLibro/CardLibro";

// Layout
export { default as Header } from "./Layout/Header/Header";
export { default as HeaderHome } from "./Layout/HeaderHome/HeaderHome";
export { default as Footer } from "./Layout/Footer/Footer";

// Forms
export { default as FormEditarCuenta } from "./Formularios/FormEditarCuenta/FormEditarCuenta";
export { default as FormIncidencia } from "./Formularios/FormIncidencia/FormIncidencia";
export { default as BarraBusqueda } from "./Formularios/BarraBusqueda/BarraBusqueda";

// Para hacer los imports donde queramos se hace de la siguiente manera:
// import { Header } from "@/components";
// si quieres mas de un componente, lo puedes hacer asi:
// import { Header, Footer, Estrellas } from "@/components";
