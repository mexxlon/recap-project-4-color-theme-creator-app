import { useState, useEffect } from "react";
import styled from "styled-components";
import ThemeForm from "./Components/ThemeForm/ThemeForm";
import Color from "./Components/Color/Color";
import { ColorForm } from "./Components/AddColorForm/AddColorForm";
import { initialThemes } from "./lib/colors";
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
  const [themes, setThemes] = useState(() => {
    const savedThemes = localStorage.getItem("themes");
    return savedThemes ? JSON.parse(savedThemes) : initialThemes;
  });

  const [selectedThemeId, setSelectedThemeId] = useState(themes[0]?.id || "");
  const [colors, setColors] = useState(() => {
    const initialTheme = themes.find((theme) => theme.id === selectedThemeId);
    return initialTheme ? initialTheme.colors : [];
  });

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    const currentTheme = themes.find((theme) => theme.id === selectedThemeId);
    if (currentTheme) {
      setColors(currentTheme.colors);
    }
  }, [selectedThemeId, themes]);

  const updateThemeColors = (updatedColors) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: updatedColors }
          : theme
      )
    );
  };

  const handleAddColor = (newColor) => {
    const updatedColors = [newColor, ...colors];
    setColors(updatedColors);
    updateThemeColors(updatedColors);
  };

  const handleEditColor = (updatedColor) => {
    const updatedColors = colors.map((color) =>
      color.id === updatedColor.id ? updatedColor : color
    );
    setColors(updatedColors);
    updateThemeColors(updatedColors);
    setEditId(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const handleDeleteColor = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    const updatedColors = colors.filter((color) => color.id !== deleteId);
    setColors(updatedColors);
    updateThemeColors(updatedColors);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const colorToEdit = colors.find((color) => color.id === editId);

  const handleAddTheme = (newTheme) => {
    setThemes((prevThemes) => [...prevThemes, newTheme]);
    setSelectedThemeId(newTheme.id);
    setColors(newTheme.colors);
  };

  const handleEditTheme = (updatedTheme) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === updatedTheme.id ? updatedTheme : theme
      )
    );
  };

  const handleDeleteTheme = (id) => {
    setThemes((prevThemes) => prevThemes.filter((theme) => theme.id !== id));
    if (selectedThemeId === id) {
      setSelectedThemeId(initialThemes[0].id);
    }
  };

  const handleSwitchTheme = (themeId) => {
    setSelectedThemeId(themeId);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeForm
        themes={themes}
        onAddTheme={handleAddTheme}
        onEditTheme={handleEditTheme}
        onDeleteTheme={handleDeleteTheme}
        onSwitchTheme={handleSwitchTheme}
      />
      <ColorForm
        onAddColor={handleAddColor}
        onEditColor={handleEditColor}
        initialColor={colorToEdit}
        onCancelEdit={handleCancelEdit}
      />
      {colors.length === 0 && (
        <NoColorsMessage>No colors available. Add a color!</NoColorsMessage>
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
