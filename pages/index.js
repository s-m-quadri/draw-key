import ContentLoader, { List } from "react-content-loader";
import Layout from "../components/layout";
import DKCanvas from "../components/dk-canvas";
import Head from "next/head";
import { useRef, useState } from "react";

function Header({ title }) {
  return <h1 align="center">{title ? title : "Untitled"}</h1>;
}

function Home() {
  return (
    <Layout>
      <Head>
        <title>Draw Key | Signature Authentication</title>
      </Head>

      <div>
        <center>
          <ContentLoader width="50em">
            <rect x="15" y="15" rx="4" ry="4" width="100%" height="10em" />
          </ContentLoader>
        </center>

        <Header title="Draw Key | Signature Authentication" />

        <center>
          <ContentLoader width="50em">
            <rect x="15" y="15" rx="4" ry="4" width="100%" height="10em" />
          </ContentLoader>
        </center>

        <Screen />

        <center>
          <ContentLoader width="50em">
            <rect x="15" y="15" rx="4" ry="4" width="100%" height="10em" />
          </ContentLoader>
        </center>
      </div>
    </Layout>
  );
}

function Screen() {
  const [signatures, setSignatures] = useState(Array(4).fill([]));
  const [signVector, setSignVector] = useState(Array(4).fill([]));

  const [attempt, setAttempt] = useState(1);

  function handleCompletion(action, lines, vector) {
    // Store current attempt as history
    signatures[attempt - 1] = lines;
    setSignatures(signatures);
    signVector[attempt - 1] = vector;
    setSignVector(signVector);

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

  return attempt <= 4 ? (
    <DKCanvas
      key={attempt}
      handleCompletion={handleCompletion}
      nextLine={signatures[attempt - 1]}
    />
  ) : (
    <DKResult reference={signVector} />
  );
}

function DKResult({ reference }) {
  return (
    <>
      <h1>Success</h1>
      <h2>Vectors</h2>
      {reference.map((signature, si) =>
        signature.map((vector, vi) => (
          <p key={vi}>
            Sign: {si + 1}: #{vi + 1} {`${vector}`}
          </p>
        ))
      )}
    </>
  );
}

export default Home;
