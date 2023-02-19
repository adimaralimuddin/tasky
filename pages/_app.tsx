import { UserProvider } from "@auth0/nextjs-auth0";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // const Layout = Component.Layout || ((page) => page);
  const Layout = Component.getLayout || ((page) => page);
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
