import styled from "styled-components";
import "./Color.css";

const DeleteButton = styled.button`
margin: 5px auto;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #EE4E4E;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #C80036;
`;

export default function Color({ color, onDelete }) {
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
      <p>contrast: {color.contrastText}</p>
      <DeleteButton onClick={() => onDelete(color.id)}>Delete</DeleteButton>
    </div>
  );
}
