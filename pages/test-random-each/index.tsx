import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@geist-ui/react";
import cn from "classnames/bind";
import { ALL_VERSES } from "../../constants/verses";
import HeadComp from "../../components/head";
const QuizVerse = dynamic(() => import("../../components/quiz-verse"), {
  ssr: false,
});
import PageTitle from "../../components/page-title";
import styles from "./index.module.scss";
import { useMediaQuery } from "react-responsive";
import { getShuffledArray } from "../../utils";
const cx = cn.bind(styles);

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

  const isMobile = useMediaQuery({
    query: "(max-width :830px)",
  });

  const getPageTitle = useMemo<string>(() => {
    let title = "☝️ 한 문제씩 무작위로 풀어보기";
    if (targetVerseIdx < shuffledVerses.length)
      title += ` (${targetVerseIdx + 1}/${shuffledVerses.length})`;
    return title;
  }, [targetVerseIdx]);

  return (
    <>
      <HeadComp />
      <main className={cx("main")}>
        <PageTitle label={getPageTitle} />
        {isMobile ? (
          <div className={cx("mobile-view")}>
            <p>아직 모바일화면은 제공하지 않습니다 🙏</p>
            <p>데스크탑으로 이용해 주세요 👨‍💻</p>
          </div>
        ) : targetVerseIdx >= shuffledVerses.length ? (
          <>
            <div>모든 문제를 다 풀었습니다! 😀 👍</div>
            <Button
              className={cx("reset-button")}
              type={"secondary"}
              onClick={() => handleReset()}
            >
              다시 시작하기
            </Button>
          </>
        ) : (
          <>
            <QuizVerse {...shuffledVerses[targetVerseIdx]} />
            <div className={cx("button-wrapper")}>
              <Button
                className={cx("prev-button")}
                type={"secondary"}
                onClick={() => handlePrevQuiz()}
                disabled={targetVerseIdx <= 0}
              >
                이전 문제 풀기
              </Button>
              <Button
                className={cx("next-button")}
                type={"secondary"}
                onClick={() => handleNextQuiz()}
              >
                다음 문제 풀기
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default TestRandom;
