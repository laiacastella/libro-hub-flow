import styles from "./ItemsPorPagina.module.css"; 

export default function ItemsPorPagina({
    id,
    nombre,
    label,
    value,
    onChange,
    opciones = [],
    className = styles.select,
}) {

    const handleChange = (e) => {
        const val = e.target.value;
        const numericVal = !isNaN(Number(val)) ? Number(val) : val;
        onChange(numericVal);
    };

    return (
        <div className={styles.field}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <select
                id={id}
                name={nombre}
                className={className}
                value={value}
                onChange={handleChange}
            >
                {opciones.map((op) => (
                    <option key={op.value} value={op.value}>
                        {op.label}
                    </option>
                ))}
            </select>
        </div>
    );
}