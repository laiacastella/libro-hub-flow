export default function comprobarPassword(password, repPassword) {
    if (password && !repPassword) {
        return "Tienes que introducir la misma Contraseña en Repetir contraseña";
    }

    if (password !== repPassword) {
        return "Las contraseñas no coinciden";
    }

    return null;
}