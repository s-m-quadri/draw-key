import { useState } from "react";
import DKScreenRegister from "./dk-screen-register";
import DKScreenResult from "./dk-screen-result";
import DKScreenLogin from "./dk-screen-login";
import { getTemplate, isValidate } from "../../algorithms/dk-vectors";

export default function DKScreen() {
  const [allTemplate, setAllTemplate] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  var [allReference, setAllReference] = useState([]);

  function handleRegCompletion(allVectors) {
    // if (allVectors) setScreen(<DKScreenResult reference={allVectors} />);
    if (!allVectors) return;

    allReference = allVectors;
    setAllReference(allReference);

    for (let i = 0; i < allVectors[0].length; i++) {
      let toMergeVec = [];
      for (let j = 0; j < allVectors.length; j++) {
        toMergeVec = [...toMergeVec, allVectors[j][i]];
      }
      allTemplate.push(getTemplate(toMergeVec));
      setAllTemplate(allTemplate);
    }
    console.log(allVectors);
    console.log(allTemplate);

    setScreen(<DKScreenLogin handleLoginCompletion={handleLoginCompletion} />);
  }

  function handleLoginCompletion(vectors) {
    if (!vectors) return;
    setScreen("Processing ... ");

    console.log("dall");

    console.log(allReference);

    for (let i = 0; i < allTemplate.length; i++) {
      let status = isValidate(allTemplate[i], vectors[i]);
      allStatus.push(status);
      setAllStatus(allStatus);
      console.log(status);
    }
    setScreen(
      <DKScreenResult
        references={allReference}
        input={vectors}
        allTemplate={allTemplate}
        allStatus={allStatus}
      />
    );
    // console.log(vectors);
  }

  const [screen, setScreen] = useState(
    <DKScreenRegister handleRegCompletion={handleRegCompletion} />
  );

  return screen;
}
