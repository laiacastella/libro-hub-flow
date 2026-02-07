import estilos from './TarjetaWhy.module.css';

export function TarjetaWhy({ icono, texto }) {
  return (
    <article className={estilos.tarjeta}>
      <div className={estilos.circuloVerde}>
        <img src={icono} alt="Icono informativo" />
      </div>
      <p>{texto}</p>
    </article>
  );
}