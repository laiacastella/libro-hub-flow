// Components
export { default as Biblioteca } from "./Biblioteca/Biblioteca";
export { default as Estrellas } from "./Estrellas/Estrellas";
export { default as Intercambios } from "./Intercambios/Intercambios";
export { default as Solicitudes } from "./Solicitudes/Solicitudes";
export { default as Valoraciones } from "./Valoraciones/Valoraciones";

// Cards
export { default as CardComentario } from "./CardComentario/CardComentario";
export { default as CardSolicitud } from "./CardSolicitud/CardSolicitud";
export { default as CardValoracion } from "./CardValoracion/CardValoracion";
export { default as CardLibro } from "./CardLibro/CardLibro";

// Layout
export { default as Header } from "./Header/Header";
export { default as HeaderHome } from "./HeaderHome/HeaderHome";
export { default as Footer } from "./Footer/Footer";

// Forms
export { default as FormEditarCuenta } from "./FormEditarCuenta/FormEditarCuenta";

// Para hacer los imports donde queramos se hace de la siguiente manera:
// import { Header } from "@/components";
// si quieres mas de un componente, lo puedes hacer asi:
// import { Header, Footer, Estrellas } from "@/components";
