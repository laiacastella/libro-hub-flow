function FormularioCambiarDatos() {
  /*const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cambios guardados");
  };*/

  

  return (
    <form className="formulario" /*onSubmit={handleSubmit}*/>
      <h2>Editar perfil</h2>

      <div className="columnas">
        {/* Columna izquierda */}
        <div className="columna">
          <label>
            Nombre
            <input type="text" />
          </label>

          <label>
            Email
            <input type="email" />
          </label>

          <label>
            Teléfono
            <input type="text" />
          </label>
        </div>

        {/* Columna derecha */}
        <div className="columna">
          <label>
            Dirección
            <input type="text" />
          </label>

          <label>
            Ciudad
            <input type="text" />
          </label>

          <label>
            Código postal
            <input type="text" />
          </label>
        </div>
      </div>

      <div className="botones">
        <button type="button" className="cancelar">
          Cancelar
        </button>

        <button type="submit" className="guardar">
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
