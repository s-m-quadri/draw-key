import "../styles/global.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#550000",
    },
    secondary: {
      main: "#ff0000",
    },
    error: {
      main: "#d32f2f",
    },
  },
};
export const dktheme = createTheme(themeOptions);

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={dktheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
