export function Header(){
    return (
      <header>
        <img src="../../public/logo-h1Negro.svg" alt="logo"/>
        <nav>
          <link href="../../app/home" className="btn-home">Inicio</link>
          <link href="../../app/biblioteca" className="btn-biblioteca">Biblioteca</link>
          <link href="../../app/perfil" className="btn-perfil">Perfil</link>
          <link href="../../app/subir-libro " className="btn-subir-libro">Subir tu libro</link>
        </nav>
    </header>
    )
}