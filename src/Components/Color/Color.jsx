import styled from "styled-components";

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
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>Contrast: {color.contrastText}</p>
      <div>
        <EditButton onClick={() => onEdit(color.id)}>Edit</EditButton>
        <DeleteButton onClick={() => onDelete(color.id)}>Delete</DeleteButton>
      </div>
    </div>
  );
}
