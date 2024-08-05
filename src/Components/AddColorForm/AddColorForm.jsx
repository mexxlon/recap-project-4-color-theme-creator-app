import React, { useState, useEffect } from "react";
import styled from "styled-compontents";
import { nanoid } from "nanoid";

const FormContainer = styled.div`
  margin: 20px auto;
  max-width: 500px;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ColorForm = ({}) => {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("");
  const [contrast, setContrast] = useState("");
};
