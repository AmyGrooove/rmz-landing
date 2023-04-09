import type { AppProps } from "next/app";
import { ReactElement } from "react";
import store from "../store";
import { Provider } from "react-redux";
import "../source/styles.css";
import "../source/fonts.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../source";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
