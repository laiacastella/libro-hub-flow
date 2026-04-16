import styles from './Campo.module.css'

const Campo = ({ type = "text", name, placeholder, value, onChange, required = false }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={styles.input}
    />
  );
};

export default Campo;
