// Components
export { default as ComponenteBiblioteca } from "./ComponenteBiblioteca/ComponenteBiblioteca";
export { default as Intercambios } from "./Intercambios/Intercambios";
export { default as Solicitudes } from "./Solicitudes/Solicitudes";
export { default as Valoraciones } from "./Valoraciones/Valoraciones";
export { default as Comentarios } from "./Comentarios/Comentarios";

// UI
export { default as Estrellas } from "./UI/Estrellas/Estrellas";
export { default as Paginacion } from "./UI/Paginacion/Paginacion";
export { default as Enlaces } from "./UI/Enlaces/Enlaces";
export { default as Boton } from "./UI/Boton/Boton";
export { default as Input } from "./UI/Input/Input";
export { default as Select } from "./UI/Select/Select";
export { default as Contador } from "./UI/Contador/Contador";
export { default as EscribirTexto } from "./UI/EscribirTexto/EscribirTexto";
export { default as ItemsPorPagina } from "./UI/ItemsPorPagina/ItemsPorPagina";
export { default as PopUp } from "./UI/PopUp/PopUp";

// Cards
export { default as CardComentario } from "./Cards/CardComentario/CardComentario";
export { default as CardSolicitud } from "./Cards/CardSolicitud/CardSolicitud";
export { default as CardValoracion } from "./Cards/CardValoracion/CardValoracion";
export { default as CardLibro } from "./Cards/CardLibro/CardLibro";
export { default as CardIcono } from "./Cards/CardIcono/CardIcono";
export { default as CardReseña } from "./Cards/CardReseña/CardReseña";

// Layout
export { default as Header } from "./Layout/Header/Header";
export { default as HeaderHome } from "./Layout/HeaderHome/HeaderHome";
export { default as Footer } from "./Layout/Footer/Footer";

// Forms
export { default as FormEditarCuenta } from "./Formularios/FormEditarCuenta/FormEditarCuenta";
export { default as FormIncidencia } from "./Formularios/FormIncidencia/FormIncidencia";
export { default as BarraBusqueda } from "./Formularios/BarraBusqueda/BarraBusqueda";
export { default as FormRegistro } from "./Formularios/FormRegistro/FormRegistro";
export { default as FormLogin } from "./Formularios/FormLogin/FormLogin";

// PopUps
export { default as PopUpBiblioteca } from "./PopUps/PopUpBiblioteca/PopUpBiblioteca";
export { default as PopUpIncidencia } from "./PopUps/PopUpIncidencia/PopUpIncidencia";
export { default as PopUpCambiarFoto } from "./PopUps/PopUpCambiarFoto/PopUpCambiarFoto";
export { default as PopUpValoracion } from "./PopUps/PopUpValoracion/PopUpValoracion";

// Carrusel
export { default as Carrusel } from "./Carrusel/Carrusel";
export { default as LibroCarrusel } from "./Carrusel/LibroCarrusel";

// Para hacer los imports donde queramos se hace de la siguiente manera:
// import { Header } from "@/components";
// si quieres mas de un componente, lo puedes hacer asi:
// import { Header, Footer, Estrellas } from "@/components";
