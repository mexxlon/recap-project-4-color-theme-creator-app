import { useState, useEffect } from "react";
import styled from "styled-components";

const CopyButton = styled.button`
  margin: 5px auto;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ccc;
  color: black;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #999;
  }
`;

const CopyMessage = styled.div`
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

export const CopyToClipboard = () => {
  const [copy, setCopy] = useState(false);

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopy(true);
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  }

  useEffect(() => {
    if (copy) {
      const timer = setTimeout(() => setCopy(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copy]);

  return (
    <>
      <CopyButton onClick={handleCopy}>Copy Color</CopyButton>
      {copy && <CopyMessage>Color copied to clipboard!</CopyMessage>}
    </>
  );
};
