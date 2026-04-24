export default function comprobarPassword(password, repPassword) {
    if (password && !repPassword) {
        return "Tienes que introducir la misma Contraseña en Repetir contraseña";
    }

    if (password !== repPassword) {
        return "Las contraseñas no coinciden";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
    }

    return null;
}