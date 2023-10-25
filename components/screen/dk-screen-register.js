import DKGraph from "../graph/dk-graph";
import { useState } from "react";

export default function DKScreenRegister({ handleRegCompletion }) {
  const [allLines, setAllLines] = useState(Array(4).fill([]));
  const [allVectors, setAllVectors] = useState(Array(4).fill([]));

  const [attempt, setAttempt] = useState(1);

  function handleCompletion(action, lines, vectors) {
    // Store current attempt as history
    allLines[attempt - 1] = lines;
    setAllLines(allLines);
    allVectors[attempt - 1] = vectors;
    setAllVectors(allVectors);

    // Calculate next attempt based on action
    let next_attempt = 0;
    switch (action) {
      case "Next":
        next_attempt = attempt + 1;
        break;
      case "Prev":
        next_attempt = attempt === 1 ? 1 : attempt - 1;
        break;
      default:
        alert("Something went wrong!");
        break;
    }

    // Proceed to next attempt
    setAttempt(next_attempt);
  }
  if (attempt <= 3) {
    return (
      <DKGraph
        key={attempt}
        handleCompletion={handleCompletion}
        nextLine={allLines[attempt - 1]}
      />
    );
  } else {
    handleRegCompletion(allVectors);
  }
}
