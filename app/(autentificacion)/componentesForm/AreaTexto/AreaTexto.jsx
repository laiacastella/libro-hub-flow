import React from 'react';

const AreaTexto = ({ name, placeholder, value, onChange, rows = 4, required = false }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows} 
      required={required}
      
    />
  );
};

export default AreaTexto;