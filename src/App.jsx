import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </>
  );
}

export default App;
