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
  description = 'A classy wallet connector for the dicerning dev 🧑‍💻',
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
      {/* fixit */}
      <meta content="@rainbowdotme" name="twitter:site" />
      <meta content="summary_large_image" name="twitter:card" />

      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

      <meta content={color} name="theme-color" />
    </Head>
  );
}
