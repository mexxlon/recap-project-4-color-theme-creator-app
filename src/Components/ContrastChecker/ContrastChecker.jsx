import { useState, useEffect } from "react";
import styled from "styled-components";

const ResultParagraph = styled.p`
  margin: 5px 0;
  color: ${(props) => (props.valid ? "green" : "red")};
`;

const ContrastChecker = ({ hex, contrastText }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkContrastRatio = async () => {
      if (hex && contrastText) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://www.aremycolorsaccessible.com/api/are-they",
            {
              mode: "cors",
              method: "POST",
              body: JSON.stringify({ colors: [hex, contrastText] }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          setResults({ Overall: "Fail", Contrast: "Error" });
        } finally {
          setLoading(false);
        }
      }
    };

    checkContrastRatio();
  }, [hex, contrastText]);

  if (results) {
    return (
      <ResultParagraph valid={results.Overall === "Yup"}>
        Overall: {results.Overall}
      </ResultParagraph>
    );
  }

  return null;
};

export default ContrastChecker;
