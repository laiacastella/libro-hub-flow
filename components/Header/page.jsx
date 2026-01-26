export default function Home(){
    return (
      <header>

        <div className="logo">
          <img src="/logo-h1Blanco.svg" alt="logo" />
        </div>
        
        <div className="sesion">
          <a href="/EditarCuenta" className="ButtonLogin">Iniciar Sesión</a>
          <a href="/register" className="ButtonRegister"> Registrarse</a>
        </div>
        
      </header>
    )
}