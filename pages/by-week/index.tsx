import { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import { Page, Select, Spacer } from "@geist-ui/react";
import Verse from "../../components/verse";
const QuizVerse = dynamic(() => import("../../components/quiz-verse"), {
  ssr: false,
});
import { ALL_VERSES } from "../../constants/verses";

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

function isSemester(val: string): val is typeof semesters[number] {
  return Boolean(semesters.find((lit) => val === lit));
}

export default function AllVerses() {
  const [semester, setSemester] =
    useState<typeof semesters[number] | undefined>(undefined);
  const [week, setWeek] = useState<string | undefined>(undefined);

  const handleSemesterSelect = (val: string) => {
    if (isSemester(val)) {
      if (val !== semester) setWeek(undefined);
      setSemester(val);
    }
  };
  const handleWeekSelect = (selectedWeek: string) => {
    setWeek(selectedWeek);
  };
  const filteredVerses = (() => {
    if (semester == null || week == null) {
      return [];
    }
    return ALL_VERSES.filter(
      (verse) =>
        verse.semester === parseInt(semester) && verse.week === parseInt(week)
    );
  })();

  return (
    <Page.Content className={"contents-main"}>
      <Select
        width={"100%"}
        placeholder={"제자훈련 학기를 선택해주세요"}
        onChange={(v) => {
          if (typeof v === "string") handleSemesterSelect(v);
        }}
        value={semester}
        style={{ maxWidth: "unset" }}
      >
        {semesters.map((semester, i) => (
          <Select.Option value={`${semester}`} key={`${semester}-${i}`}>
            {semester} 학기
          </Select.Option>
        ))}
      </Select>
      <Spacer y={0.75} />
      <Select
        width={"100%"}
        placeholder={`${
          semester ? `${semester}` : "해당 제자훈련 "
        }학기 중 몇번째 주 말씀인지 선택해 주세요 `}
        onChange={(v) => {
          if (typeof v === "string") handleWeekSelect(v);
        }}
        disabled={!semester}
        value={week}
        style={{ maxWidth: "unset" }}
      >
        {semester != null
          ? weeksBySemester.get(semester)?.map((w, i) => (
              <Select.Option value={`${w}`} key={`${w}-${i}`}>
                {w} 주차
              </Select.Option>
            ))
          : null}
      </Select>
      <Spacer y={0.75} />
      {filteredVerses.map((verse, i) => (
        <Fragment key={`verse-${i}`}>
          <Verse {...verse} />
          <Spacer y={0.75} />
        </Fragment>
      ))}
      {filteredVerses.map((verse, i) => (
        <Fragment key={`quiz-verse-${i}`}>
          <QuizVerse {...verse} />
          <Spacer y={0.75} />
        </Fragment>
      ))}
    </Page.Content>
  );
}
