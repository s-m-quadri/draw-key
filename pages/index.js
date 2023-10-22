import ContentLoader, { List } from "react-content-loader";
import Layout from "../components/layout";
import DKCanvas from "../components/dk-canvas";
import Head from "next/head";

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

        <DKCanvas />

        <center>
          <ContentLoader width="50em">
            <rect x="15" y="15" rx="4" ry="4" width="100%" height="10em" />
          </ContentLoader>
        </center>
      </div>
    </Layout>
  );
}

export default Home;
