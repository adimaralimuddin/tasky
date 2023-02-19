import { UserProvider } from "@auth0/nextjs-auth0";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.css";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.getLayout ?? ((page) => page);
  return (
    <UserProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider enableSystem={true} attribute="class">
            {/* <Layout> */}
            {Layout(<Component {...pageProps} />)}
            {/* </Layout> */}
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
