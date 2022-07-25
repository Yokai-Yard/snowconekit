import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type TitleAndMetaTagsProps = {
  description?: string;
  image?: string;
  pathname?: string;
  title?: string;
  url?: string;
  color?: string;
};

export function TitleAndMetaTags({
  color = 'white',
  description = 'Web3 connector for the discerning dev 👨‍💻',
  image,
  pathname,
  title = 'SnowConeKit',
  url = 'https://SnowConeKit.com',
}: TitleAndMetaTagsProps) {
  const router = useRouter();

  const imageUrl = `${url}/social/${image || 'default.png'}`;
  const path = pathname || router.pathname;

  return (
    <Head>
      <title>{title}</title>

      <meta content={description} name="description" />

      <meta content={`${url}${path}`} property="og:url" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />

      <meta content="@snowconedao" name="twitter:site" />
      <meta content="summary_large_image" name="twitter:card" />

      <link
        href="/favicon/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicon/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/favicon/site.webmanifest" rel="manifest" />
      <link
        color="#5bbad5"
        href="/favicon/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <meta content="#2b5797" name="msapplication-TileColor" />
      <meta content="#8cabcf" name="theme-color" />

      <meta content={color} name="theme-color" />
    </Head>
  );
}
