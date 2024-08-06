import { useState, useEffect } from "react";

export default function ColorInput({ id, value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputChange}
      />
      <input type="color" value={inputValue} onChange={handleInputChange} />
    </>
  );
}
