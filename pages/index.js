import ContentLoader, { List } from "react-content-loader";
import Layout from "../components/layout";
import Head from "next/head";
import DKScreen from "../components/screen/dk-screen";
import { Typography } from "@mui/material";

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

        <Typography variant="h1" align="center">
          Draw Key
        </Typography>
        <Typography variant="h2" align="center">
          Signature Authentication
        </Typography>

        <center>
          <ContentLoader width="50em">
            <rect x="15" y="15" rx="4" ry="4" width="100%" height="10em" />
          </ContentLoader>
        </center>

        <center>
          <DKScreen />
        </center>

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
