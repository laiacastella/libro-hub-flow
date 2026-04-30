import React from 'react';
import Styles from './AreaTexto.module.css'

const AreaTexto = ({ name, placeholder, value, onChange, rows = 4, required = false }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows} 
      required={required}
      className={Styles.textarea}
    />
  );
};

export default AreaTexto;