import Head from "next/head";
import React from "react";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title || ""}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <meta name="description" content="Notsokoplo's gigs and gallery" />
      <meta name="keywords" content="Notsokoplo" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default Seo;
