import Head from "next/head";

function HeadComp() {
  return (
    <Head>
      <title>제자훈련 암송시험</title>
      <meta
        name="description"
        content="사랑의교회 제자훈련 암송시험 말씀모음, 예비시험"
      />
      <link rel="icon" href="/holy-bible-256.ico" />
      <meta name="title" content="AITRICS" />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://sarang-jeja-bible-recitation.vercel.app/"
      />
      <meta property="og:title" content="제자훈련 말씀암송" />
      <meta
        property="og:description"
        content={"사랑의교회 제자훈련 암송시험 말씀모음, 모의시험"}
      />
      <meta property="og:image" content="/bible-study.jpeg" />
    </Head>
  );
}

export default HeadComp;
