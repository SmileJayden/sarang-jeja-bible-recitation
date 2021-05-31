import { useState } from "react";
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
const cx = cn.bind(styles);

function TestRandom() {
  const [targetVerseIdx, setTargetVerseIdx] = useState(() =>
    Math.floor(Math.random() * ALL_VERSES.length)
  );

  const getNextQuizIdx = (currIdx) => {
    let nextIdx = Math.floor(Math.random() * ALL_VERSES.length);
    while (nextIdx === currIdx) {
      nextIdx = Math.floor(Math.random() * ALL_VERSES.length);
    }
    return nextIdx;
  };

  const handleNextQuiz = () => {
    setTargetVerseIdx(getNextQuizIdx(targetVerseIdx));
  };

  const isMobile = useMediaQuery({
    query: "(max-width :830px)",
  });

  return (
    <>
      <HeadComp />
      <main className={cx("main")}>
        <PageTitle label={"☝️ 한 문제씩 풀어보기"} />
        {isMobile ? (
          <div className={cx("mobile-view")}>
            <p>아직 모바일화면은 제공하지 않습니다 🙏</p>
            <p>데스크탑으로 이용해 주세요 👨‍💻</p>
          </div>
        ) : (
          <>
            <QuizVerse {...ALL_VERSES[targetVerseIdx]} />
            <Button
              className={cx("next-button")}
              type={"secondary"}
              onClick={() => handleNextQuiz()}
            >
              다음 문제 풀기
            </Button>
          </>
        )}
      </main>
    </>
  );
}

export default TestRandom;
