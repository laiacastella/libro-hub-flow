import { calcularEstrellas } from "@/components/UI/Estrellas/Estrellas";

test('valoración 5 devuelve todas llenas', () => {
    expect(calcularEstrellas(5)).toEqual([100, 100, 100, 100, 100]);
});

test('valoración 3.5 devuelve 3 llenas, 1 media y 1 vacía', () => {
    expect(calcularEstrellas(3.5)).toEqual([100, 100, 100, 50, 0]);
});

test('valoración 0 devuelve todas vacías', () => {
    expect(calcularEstrellas(0)).toEqual([0, 0, 0, 0, 0]);
});