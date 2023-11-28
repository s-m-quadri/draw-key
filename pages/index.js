import ContentLoader from "react-content-loader";
import Layout from "../components/layout";
import Head from "next/head";
import DKScreen from "../components/screen/dk-screen";
import {
  List,
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useEffect, useState } from "react";
import Image from "next/image";

function Home() {
  return (
    <Layout>
      <Head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <title>Draw Key | Signature Authentication</title>
      </Head>

      <Body />
    </Layout>
  );
}

function Body() {
  const [curPage, setCurPage] = useState("home");
  const [curContent, setCurContent] = useState();

  useEffect(() => {
    switch (curPage) {
      case "home":
        setCurContent(
          <Box sx={{ p: 3 }}>
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
          </Box>
        );
        break;

      default:
        return <p>That's invalid</p>;
    }
  }, [curPage]);

  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <CssBaseline />

      <DrawerAppBar />

      <Box component="main" sx={{ p: 3 }} display={"block"}>
        <Toolbar />
        {curContent}
      </Box>
    </Box>
  );
}

function DrawerAppBar() {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Draw Key
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <Link href="https://s-m-quadri.gitbook.io/drawkey/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Documentation" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="https://github.com/s-m-quadri/draw-key">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Source Repo." />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Image src={"/logo.png"} width={36} height={36} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Draw Key
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>Home</Button>
            <Link href="https://s-m-quadri.gitbook.io/drawkey/">
              <Button sx={{ color: "#fff" }}>Documentation</Button>
            </Link>
            <Link href="https://github.com/s-m-quadri/draw-key">
              <Button sx={{ color: "#fff" }}>Source Repo.</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

export default Home;
