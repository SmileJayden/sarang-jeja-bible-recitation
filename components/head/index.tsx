import Head from "next/head";

const APP_NAME = "드림이 제자훈련";
const APP_DESCRIPTION = "드림이 제자훈련 암송시험 말씀모음, 모의시험";

function HeadComp() {
  return (
    <Head>
      <title>{APP_NAME}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="description" content={APP_DESCRIPTION} />
      <meta name="title" content="AITRICS" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://sarang-jeja-bible-recitation.vercel.app/"
      />
      <meta property="og:title" content={APP_NAME} />
      <meta property="og:description" content={APP_DESCRIPTION} />
      <meta property="og:image" content="/bible.png" />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="shortcut icon" href="/bible.png" />
      <link rel="apple-touch-icon" href="/icon/maskable_icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}

export default HeadComp;
