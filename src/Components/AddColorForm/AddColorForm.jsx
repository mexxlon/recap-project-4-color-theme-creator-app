import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput";

const FormContainer = styled.div`
  margin: 20px auto;
  max-width: 500px;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
`;

const SubmitButton = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ColorForm = ({ onAddColor }) => {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("#ffffff");
  const [contrastText, setContrastText] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColor = {
      role,
      hex,
      contrastText,
      id: nanoid(),
    };
    onAddColor(newColor);
    setRole("");
    setHex("#ffffff");
    setContrastText("#000000");
  };

  return (
    <FormContainer>
      <form className="color-form" onSubmit={handleSubmit}>
        <label htmlFor="role">
          Role
          <br />
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="hex">
          Hex
          <br />
          <ColorInput
            id="hex"
            value={hex}
            onChange={(value) => setHex(value)}
            color={hex}
          />
        </label>
        <br />
        <label htmlFor="contrastText">
          Contrast Text
          <br />
          <ColorInput
            id="contrastText"
            value={contrastText}
            onChange={(value) => setContrastText(value)}
            color={contrastText}
          />
        </label>
        <br />
        <SubmitButton type="submit">Add Color</SubmitButton>
      </form>
    </FormContainer>
  );
};
