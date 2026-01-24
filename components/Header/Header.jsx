export function Header(){
    return (
      <header>
        <img src="../../public/logo-h1Negro.svg" alt="logo"/>
        <nav>
          <a href="../../app/home" className="btn-home">Inicio</a>
        <a href="../../app/biblioteca" className="btn-biblioteca">Biblioteca</a>
        <a href="../../app/perfil" className="btn-perfil">Perfil</a>
        <a href="../../app/subir-libro " className="btn-subir-libro">Subir tu libro</a>
        </nav>
    </header>
    )
}