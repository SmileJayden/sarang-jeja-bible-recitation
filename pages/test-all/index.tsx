import { useRouter } from "next/router";
import cn from "classnames/bind";
import HeadComp from "../../components/head";
import QuizVerse from "../../components/quiz-verse";
import PageTitle from "../../components/page-title";
import styles from "./index.module.scss";
import { ALL_VERSES } from "../../constants/verses";
import { getShuffledArray } from "../../utils";
import { useMediaQuery } from "react-responsive";

const cx = cn.bind(styles);

const getTitle = (count: string | string[] | undefined): string => {
  let label = "암송 시험";
  if (count) label += ` (${count} 문제)`;
  else label = "전체 " + label;

  return "📖 " + label;
};

function AllVerses() {
  const {
    query: { count },
  } = useRouter();

  const verses =
    typeof count === "string"
      ? getShuffledArray(ALL_VERSES).slice(0, parseInt(count))
      : ALL_VERSES;

  const isMobile = useMediaQuery({
    query: "(max-width :830px)",
  });

  return (
    <>
      <HeadComp />
      <main className={cx("main")}>
        <div className={cx("container")}>
          <PageTitle label={getTitle(count)} />
          {isMobile ? (
            <div className={cx("mobile-view")}>
              <p>아직 모바일화면은 제공하지 않습니다 🙏</p>
              <p>데스크탑으로 이용해 주세요 👨‍💻</p>
            </div>
          ) : (
            verses.map((verse, i) => (
              <QuizVerse key={`verse-quiz-${i}`} {...verse} />
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default AllVerses;
