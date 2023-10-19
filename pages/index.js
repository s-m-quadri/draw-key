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
        <Header title="Draw Key | Signature Authentication" />
        <DKCanvas />
        <ContentLoader height="50em" width="80em" viewBox="0 0 265 230">
          <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
          <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
          <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
          <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
        </ContentLoader>
      </div>
    </Layout>
  );
}

export default Home;
