
const Selector = ({ name, value, onChange, options, placeholder, required = false }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}

    >
      
      <option value="" disabled>
        {placeholder}
      </option>
      
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Selector;