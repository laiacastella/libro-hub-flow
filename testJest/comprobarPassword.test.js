import comprobarPassword from "@/hooks/comprobarPassword";

describe('comprobarPassword', () => {

    test('debe pedir repetir contraseña si falta', () => {
        expect(comprobarPassword('1234', ''))
            .toBe('Tienes que introducir la misma Contraseña en Repetir contraseña');
    });

    test('debe devolver error si no coinciden', () => {
        expect(comprobarPassword('1234', '5678'))
            .toBe('Las contraseñas no coinciden');
    });

    test('no debe devolver error si coinciden', () => {
        expect(comprobarPassword('1234', '1234'))
            .toBe(null);
    });

    test('no debe dar error si ambas están vacías', () => {
        expect(comprobarPassword('', ''))
            .toBe(null);
    });

});