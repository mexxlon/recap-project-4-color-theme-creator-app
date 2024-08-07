import { useEffect, useState } from "react";
import styled from "styled-components";

const ResultParagraph = styled.p`
  display: inline-block;
  color: ${(props) => (props.score === "Yup" ? "white" : "black")};
  font-weight: bold;
  background: ${(props) =>
    props.score === "Nope"
      ? "red"
      : props.score === "Yup"
      ? "green"
      : props.score === "Kinda"
      ? "orange"
      : "none"};
  padding: 5px;
  border-radius: 4px;
`;

const ContrastChecker = ({ checkHex, checkContrast }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchContrastScore = async () => {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({ colors: [checkHex, checkContrast] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        if (json && json.overall) {
          setScore(json.overall);
        } else {
          console.error("API response does not contain 'overall' field.");
          setScore("Currently unavailable, try later.");
        }
      } catch (error) {
        console.error("Error fetching the contrast score:", error);
        setScore("Currently unavailable, try later.");
      }
    };

    if (checkHex && checkContrast) {
      fetchContrastScore();
    }
  }, [checkHex, checkContrast]);

  return (
    <ResultParagraph score={score}>
      Overall Contrast Score: {score || "Loading..."}
    </ResultParagraph>
  );
};

export default ContrastChecker;
