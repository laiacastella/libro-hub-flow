import styles from "./Select.module.css"; 
// puedes usar el mismo CSS si el estilo es igual

export default function Select({
    id,
    nombre,
    label,
    value,
    onChange,
    opciones = [],
    placeholder = "Selecciona una opción",
    disabled = false,
    className = styles.select,
}) {

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
                onChange={onChange}
                disabled={disabled}
            >
                <option value="">{placeholder}</option>

                {opciones.map((op) => (
                    <option key={op.value} value={op.value}>
                        {op.label}
                    </option>
                ))}
            </select>

        </div>
    );
}