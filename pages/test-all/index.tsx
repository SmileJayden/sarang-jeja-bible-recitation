import { useRouter } from "next/router";
import cn from "classnames/bind";
import QuizVerse from "../../components/quiz-verse";
import PageTitle from "../../components/page-title";
import styles from "./index.module.scss";
import { ALL_VERSES } from "../../constants/verses";
import { getShuffledArray } from "../../utils";

const cx = cn.bind(styles);

const getTitle = (count: string | string[] | undefined): string => {
  let label = "암송 시험";
  if (count) label += ` (${count} 문제)`;
  else label = "전체 " + label;

  return "📝 " + label;
};

function AllVerses() {
  const {
    query: { count },
  } = useRouter();

  const verses =
    typeof count === "string"
      ? getShuffledArray(ALL_VERSES).slice(0, parseInt(count))
      : ALL_VERSES;

  return (
    <main className={cx("main")}>
      <div className={cx("container")}>
        <PageTitle label={getTitle(count)} />
        {verses.map((verse, i) => (
          <QuizVerse key={`verse-quiz-${i}`} {...verse} />
        ))}
      </div>
    </main>
  );
}

export default AllVerses;
