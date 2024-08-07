import styled from "styled-components";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";

const EditButton = styled.button`
  margin: 5px auto;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #4a90e2;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #357abd;
  }
`;

const DeleteButton = styled.button`
  margin: 5px auto;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ee4e4e;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #c80036;
  }
`;

export default function Color({ color, onDelete, onEdit }) {
  return (
    <div
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3>{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>Contrast: {color.contrastText}</p>
      <ContrastChecker hex={color.hex} contrastText={color.contrastText} />
      <div>
        <EditButton onClick={() => onEdit(color.id)}>Edit</EditButton>
        <DeleteButton onClick={() => onDelete(color.id)}>Delete</DeleteButton>
        <CopyToClipboard text={color.hex} />
      </div>
    </div>
  );
}
