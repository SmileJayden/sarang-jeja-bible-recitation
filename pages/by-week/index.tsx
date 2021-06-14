import Verse from "../../components/verse";
import QuizVerse from "../../components/quiz-verse";
import { ALL_VERSES } from "../../constants/verses";
import cn from "classnames/bind";
import { Select } from "@geist-ui/react";
import styles from "./index.module.scss";
import HeadComp from "../../components/head";
import PageTitle from "../../components/page-title";
import { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
const cx = cn.bind(styles);

const semesters = ["1", "2"] as const;

const weeksBySemester = new Map<typeof semesters[number], string[]>([
  [
    "1",
    Array(11)
      .fill(null)
      .map<string>((_, i) => `${i + 1}`),
  ],
  [
    "2",
    Array(12)
      .fill(null)
      .map<string>((_, i) => `${i + 1}`),
  ],
]);

function AllVerses() {
  const [semester, setSemester] =
    useState<typeof semesters[number] | null>(null);
  const [week, setWeek] = useState<string | null>(null);

  const handleSemesterSelect = (selectedSemester) => {
    if (selectedSemester !== semester) setWeek(null);
    setSemester(selectedSemester);
  };
  const handleWeekSelect = (selectedWeek) => {
    setWeek(selectedWeek);
  };
  const filteredVerses = useMemo(() => {
    return ALL_VERSES.filter(
      (verse) =>
        verse.semester === parseInt(semester) && verse.week === parseInt(week)
    );
  }, [week, semester]);

  const isMobile = useMediaQuery({ maxWidth: "600px" });

  return (
    <>
      <HeadComp />
      <main className={cx("main")}>
        <div className={cx("container")}>
          <PageTitle label={"🌈 제자훈련 주차 별\n 말씀 보기"} />
          <Select
            className={cx("select-box")}
            width={"100%"}
            placeholder={"제자훈련 학기를 선택해주세요"}
            onChange={handleSemesterSelect}
            value={semester}
          >
            {semesters.map((semester, i) => (
              <Select.Option value={`${semester}`} key={`${semester}-${i}`}>
                {semester} 학기
              </Select.Option>
            ))}
          </Select>
          <Select
            className={cx(["select-box", "week-select-box"])}
            width={"100%"}
            placeholder={`${
              semester ? `${semester}` : "해당 제자훈련 "
            }학기 중 몇번째 주 말씀인지 선택해 주세요 `}
            onChange={handleWeekSelect}
            disabled={!semester}
            value={week}
          >
            {weeksBySemester.get(semester)?.map((w, i) => (
              <Select.Option value={`${w}`} key={`${w}-${i}`}>
                {w} 주차
              </Select.Option>
            ))}
          </Select>
          {filteredVerses.map((verse, i) => {
            return <Verse {...verse} key={`verse-${i}`} />;
          })}
          {filteredVerses.map((verse, i) => {
            return <QuizVerse {...verse} key={`quiz-verse-${i}`} />;
          })}
        </div>
      </main>
    </>
  );
}

export default AllVerses;
