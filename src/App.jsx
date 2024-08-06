import { useState } from "react";
import styled from "styled-components";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import { ColorForm } from "./Components/AddColorForm/AddColorForm";
import "./App.css";

const NoColorsMessage = styled.p`
  text-align: center;
  color: #888;
  font-style: italic;
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #a2ca71;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #387f39;
  }
`;

function App() {
  const [colors, setColors] = useState(initialColors);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleAddColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  const handleEditColor = (updatedColor) => {
    setColors(
      colors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
    setEditId(null);
  };

  function handleCancelEdit() {
    setEditId(null);
  }

  const handleDeleteColor = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setColors(colors.filter((color) => color.id !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const colorToEdit = colors.find((color) => color.id === editId);

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm
        onAddColor={handleAddColor}
        onEditColor={handleEditColor}
        initialColor={colorToEdit}
        onCancelEdit={handleCancelEdit}
      />
      {colors.length === 0 && (
        <NoColorsMessage>
          No colors in the theme. Please add a new color!
        </NoColorsMessage>
      )}
      {colors.map((color) => (
        <Color
          key={color.id}
          color={color}
          onEdit={() => setEditId(color.id)}
          onDelete={() => handleDeleteColor(color.id)}
        />
      ))}
      {deleteId && (
        <ConfirmationDialog>
          <p>Are you sure you want to delete this color?</p>
          <Button onClick={confirmDelete}>Yes</Button>
          <Button onClick={cancelDelete}>No</Button>
        </ConfirmationDialog>
      )}
    </>
  );
}

export default App;
