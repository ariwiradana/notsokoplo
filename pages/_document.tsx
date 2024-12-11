import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          async
        ></script>
      </Head>
      <body id="body" className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
