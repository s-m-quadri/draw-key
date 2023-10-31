import { useState } from "react";
import DKScreenRegister from "./dk-screen-register";
import DKScreenResult from "./dk-screen-result";
import DKScreenLogin from "./dk-screen-login";
import { getTemplate, isValidate } from "../../algorithms/dk-vectors";
import { Button } from "@mui/material";

export default function DKScreen() {
  const [allTemplate, setAllTemplate] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  var [allReference, setAllReference] = useState([]);
  const [inputVectors, setInputVector] = useState([]);
  const [curPage, setCurPage] = useState("home");

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

    gotoHome();
  }

  function handleLoginCompletion(vectors) {
    if (!vectors) return;

    console.log(allReference);
    setInputVector(vectors);

    let status = [];
    for (let i = 0; i < allTemplate.length; i++) {
      status.push(isValidate(allTemplate[i], vectors[i]));
    }
    console.log(status);
    setAllStatus(status);

    gotoHome();
  }

  const screens = {
    home: (
      <>
        <Button variant="outlined" onClick={() => gotoRegister()}>
          Register
        </Button>
        <Button variant="contained" onClick={() => gotoLogin()}>
          Login
        </Button>
        <details>
          <summary>Current State</summary>
          <DKScreenResult
            references={allReference}
            input={inputVectors}
            allTemplate={allTemplate}
            allStatus={allStatus}
          />
        </details>
      </>
    ),
    register: <DKScreenRegister handleRegCompletion={handleRegCompletion} />,
    login: <DKScreenLogin handleLoginCompletion={handleLoginCompletion} />,
  };

  function gotoHome() {
    setCurPage("home");
  }

  function gotoRegister() {
    setCurPage("register");
  }

  function gotoLogin() {
    setCurPage("login");
  }

  return screens[curPage];
}
