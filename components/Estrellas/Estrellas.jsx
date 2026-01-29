import styles from "./Estrellas.module.css";

function Star({ fill = 0 }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            {/* estrella vacía */}
            <path
                d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9l6.6-.9L12 2z"
                fill="#ddd"
            />

            {/* estrella rellena */}
            <path
                d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17l-5.9 3 1.2-6.5L2.5 8.9l6.6-.9L12 2z"
                fill="gold"
                style={{
                    clipPath: `inset(0 ${100 - fill}% 0 0)`
                }}
            />
        </svg>
    );
}

function calcularEstrellas(valoracion) {
    return Array.from({ length: 5 }, (_, i) => {
        const diferencia = valoracion - i;

        if (diferencia >= 1) return 100;   // llena
        if (diferencia >= 0.5) return 50;  // media
        return 0;                          // vacía
    });
}

export default function Estrellas({ valoracion }) {
    const estrellas = calcularEstrellas(valoracion);

    return (
        <div className={styles.estrellas}>
            {estrellas.map((fill, i) => (
                <Star key={i} fill={fill} />
            ))}
        </div>
    );
}