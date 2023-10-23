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
  const [signatures, setSignatures] = useState({
    1: [],
    2: [],
    3: [],
  });
  const [attempt, setAttempt] = useState(1);
  const [canvas, setCanvas] = useState(
    <DKCanvas key={attempt} handleCompletion={handleCompletion} />
  );

  function handleCompletion(action, lines) {
    // Store current attempt as history
    signatures[attempt] = lines;
    setSignatures(signatures);
    console.log(signatures);

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

  return attempt <= 3 ? (
    <DKCanvas
      key={attempt}
      handleCompletion={handleCompletion}
      nextLine={signatures[attempt]}
    />
  ) : (
    <h1>Success</h1>
  );
}

export default Home;
