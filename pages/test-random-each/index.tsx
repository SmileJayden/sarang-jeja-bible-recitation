import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button, Spacer, Page, Row, Text } from "@geist-ui/react";
import { ALL_VERSES } from "../../constants/verses";
const QuizVerse = dynamic(() => import("../../components/quiz-verse"), {
  ssr: false,
});
const NextPrevButtons = dynamic(
  () => import("../../components/next-prev-buttons"),
  {
    ssr: false,
  }
);
import { getShuffledArray } from "../../utils";
import { useMediaQuery } from "react-responsive";

function TestRandom() {
  const [targetVerseIdx, setTargetVerseIdx] = useState(0);
  const [shuffleTrigger, setShuffleTrigger] = useState(false);

  const shuffledVerses = useMemo(() => {
    return getShuffledArray(ALL_VERSES);
  }, [shuffleTrigger]);

  const handleNextQuiz = () => {
    setTargetVerseIdx((prevIdx) => prevIdx + 1);
  };

  const handlePrevQuiz = () => {
    setTargetVerseIdx((prevIdx) => prevIdx - 1);
  };

  const handleReset = () => {
    setTargetVerseIdx(0);
    setShuffleTrigger((prev) => !prev);
  };

  return (
    <Page.Content className={"contents-main"}>
      {targetVerseIdx >= shuffledVerses.length ? (
        <Row style={{ flexDirection: "column" }} align={"middle"}>
          <Text>모든 문제를 다 풀었습니다! 😀 👍</Text>
          <Button type={"secondary"} onClick={() => handleReset()}>
            다시 시작하기
          </Button>
        </Row>
      ) : (
        <>
          <Text
            style={{ textAlign: "right", marginTop: 0, position: "relative" }}
          >
            {targetVerseIdx + 1} 번째 말씀 / 총 {ALL_VERSES.length} 말씀
          </Text>
          <QuizVerse {...shuffledVerses[targetVerseIdx]} />
          <Spacer y={1.25} />
          <NextPrevButtons
            onPrevClick={handlePrevQuiz}
            onNextClick={handleNextQuiz}
            prevDisabled={targetVerseIdx <= 0}
          />
        </>
      )}
    </Page.Content>
  );
}

export default TestRandom;
