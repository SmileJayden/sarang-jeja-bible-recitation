import { Fragment, useMemo } from "react";
import { Page, Spacer, Text } from "@geist-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ALL_VERSES } from "../../constants/verses";
import { getShuffledArray } from "../../utils";
const QuizVerse = dynamic(() => import("../../components/quiz-verse"), {
  ssr: false,
});

export default function AllVerses() {
  const {
    query: { count },
  } = useRouter();

  const verses =
    typeof count === "string"
      ? getShuffledArray(ALL_VERSES).slice(0, parseInt(count))
      : ALL_VERSES;

  const caption = useMemo(() => {
    if (count) return `무작위의 ${count}개 말씀 구절`;
    return "전체 암송 말씀 구절";
  }, [count]);

  return (
    <Page.Content className={"contents-main"}>
      <Text h3 style={{ textAlign: "center" }}>
        {caption}
      </Text>
      {verses.map((verse, i) => (
        <Fragment key={`verse-quiz-${i}`}>
          <QuizVerse {...verse} />
          <Spacer y={2} />
        </Fragment>
      ))}
    </Page.Content>
  );
}
