import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="light">
      <Head />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />

        <title>Tasky</title>
      </head>
      <body className="bg-slate-50 dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
