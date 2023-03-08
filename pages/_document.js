import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="light">
      <Head />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />

        <title>Tasky</title>
      </head>
      <body className="bg-slate-50d [#eff0f8]d bg-[#f3f4fc]d bg-[#F8F9FF] dark:bg-[#1A1A27] overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
