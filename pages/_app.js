import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // TODO: swap tho our own

import "../styles/globals.css";
import MainLayout from "../components/layout/PagesLayout";
import { client } from "../lib/ApolloClient";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   localStorage.setItem("theme", "light");
  // }, []);

  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default MyApp;
