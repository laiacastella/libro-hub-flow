import logo from "../../assets/imagen/logo-h1Blanco.svg";

export function Header(){
    return (
      <header>
        <img src={logo} alt="logo" />
        <a href="/login" className="ButtonLogin">Iniciar Sesión</a>
        <a href="/register" className="ButtonRegister">Registrarse</a>
    </header>
    )
}