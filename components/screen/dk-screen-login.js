import { useState } from "react";
import DKGraph from "../graph/dk-graph";

export default function DKScreenLogin({ handleLoginCompletion }) {
  const [allVectors, setAllVectors] = useState(Array(3).fill([]));

  function handleCompletion(action, lines, vectors) {
    handleLoginCompletion(vectors);
  }

  return (
    <DKGraph
      handleCompletion={handleCompletion}
      nextLine={[]}
      title="Draw to Login"
    />
  );
}
