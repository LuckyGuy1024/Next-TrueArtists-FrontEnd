// External
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from "react-query";

// Material Components
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { AuthContext, AppContext, DashboardContext } from "../contexts";

import theme from "../theme";
import "../scss/index.scss";

const queryCache = new QueryCache();
const mutationCache = new MutationCache();
const queryClient = new QueryClient({ queryCache, mutationCache });

export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>True Artists</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppContext>
            <AuthContext>
              <DashboardContext>
                <Component {...pageProps} />
              </DashboardContext>
            </AuthContext>
          </AppContext>
        </ThemeProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
