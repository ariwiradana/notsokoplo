import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Socials } from "@/constants/social";
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

const Seo: FC<SEOProps> = ({ title, description, keywords, image }) => {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fullUrl = `${window.location.origin}${router.asPath}`;
    setUrl(fullUrl);
  }, [router]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Not So Koplo" />
      <meta name="robots" content="index, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      {/* Canonical Tag */}
      <link rel="canonical" href={url || `${window.location.origin}/`} />

      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="keywords" content="keyword1, keyword2, keyword3" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link rel="icon" href="/logo.png" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Not So Koplo Official",
          url: url || `${window.location.origin}/`,
          sameAs: Socials.map((social) => social.link),
        })}
      </script>
    </Head>
  );
};

export default Seo;
