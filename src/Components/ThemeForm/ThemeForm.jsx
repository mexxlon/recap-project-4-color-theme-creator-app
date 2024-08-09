import { useState, useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 500px;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
`;

const InputField = styled.input`
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  margin: 5px;
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

const Dropdown = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ThemeForm = ({
  themes,
  onAddTheme,
  onEditTheme,
  onDeleteTheme,
  onSwitchTheme,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0]?.id || "");
  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    const theme = themes.find((theme) => theme.id === selectedThemeId);
    if (theme) {
      setThemeName(theme.name);
    }
  }, [selectedThemeId, themes]);

  const handleAddTheme = () => {
    const newTheme = {
      id: nanoid(),
      name: themeName,
      colors: [],
    };
    onAddTheme(newTheme);
    setThemeName("");
  };

  const handleEditTheme = () => {
    const updatedTheme = {
      id: selectedThemeId,
      name: themeName,
      colors: [],
    };
    onEditTheme(updatedTheme);
  };

  const handleDeleteTheme = () => {
    if (selectedThemeId !== "t1") {
      onDeleteTheme(selectedThemeId);
    }
  };

  const handleSwitchTheme = (e) => {
    const themeId = e.target.value;
    setSelectedThemeId(themeId);
    onSwitchTheme(themeId);
  };

  return (
    <FormContainer>
      <h2>Theme Management</h2>
      <Dropdown value={selectedThemeId} onChange={handleSwitchTheme}>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </Dropdown>

      <h3>{selectedThemeId === "t1" ? "Create New Theme" : "Edit Theme"}</h3>
      <InputField
        type="text"
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
        placeholder="Theme Name"
        disabled={selectedThemeId === "t1"}
      />

      <Button onClick={handleAddTheme}>Add New Theme</Button>
      {selectedThemeId !== "t1" && (
        <>
          <Button onClick={handleEditTheme}>Edit Theme</Button>
          <Button onClick={handleDeleteTheme}>Delete Theme</Button>
        </>
      )}
    </FormContainer>
  );
};

export default ThemeForm;
