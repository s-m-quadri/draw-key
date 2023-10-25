import { useState } from "react";
import DKScreenRegister from "./dk-screen-register";
import DKScreenResult from "./dk-screen-result";

export default function DKScreen() {
  function handleRegCompletion(allVectors) {
    if (allVectors) setScreen(<DKScreenResult reference={allVectors} />);
    console.log(allVectors);
  }

  const [screen, setScreen] = useState(
    <DKScreenRegister handleRegCompletion={handleRegCompletion} />
  );

  return screen;
}
