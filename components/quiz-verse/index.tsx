import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Textarea } from "@geist-ui/react";
import cn from "classnames/bind";
import { IVerse } from "../../types";
import styles from "./index.module.scss";
import { checkAnswer, gitAnswerDiff, parseAnswer } from "../../utils";
import { useMediaQuery } from "react-responsive";
const cx = cn.bind(styles);

enum QuizStatus {
  CORRECT = "correct",
  WRONG = "wrong",
  NOT_SUBMITTED = "not_submitted",
}

function QuizVerse({ book, chapter, verse, contents }: IVerse) {
  const { register, handleSubmit, reset } = useForm();

  const [answer, setAnswer] = useState<string>("");
  const [answerOpened, setAnswerOpened] = useState(false);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(
    QuizStatus.NOT_SUBMITTED
  );

  useEffect(() => {
    reset();
    setAnswerOpened(false);
    setQuizStatus(QuizStatus.NOT_SUBMITTED);
  }, [contents]);

  const onSubmit = (data) => {
    setAnswer(data.submissionAnswer);
    setQuizStatus(
      checkAnswer(data.submissionAnswer, contents)
        ? QuizStatus.CORRECT
        : QuizStatus.WRONG
    );
  };

  const renderStatusComp = (quizStatus: QuizStatus) => {
    switch (quizStatus) {
      case QuizStatus.CORRECT:
        return (
          <div
            className={cx(["quiz-status"])}
            style={{ backgroundColor: "#e6ebf5" }}
          >
            <p>🙆‍♂️ 정답입니다! 😃 👍 👍 👍 👍 👍</p>
          </div>
        );
      case QuizStatus.WRONG:
        return (
          <div
            className={cx(["quiz-status"])}
            style={{ backgroundColor: "#fff8f7" }}
          >
            <p>🙅‍♀️ 오답입니다! 🥲</p>
            <p>📕 오답노트 ⬇️</p>
            <p
              dangerouslySetInnerHTML={{
                __html: gitAnswerDiff(answer, contents),
              }}
            />
          </div>
        );
      case QuizStatus.NOT_SUBMITTED:
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div className={cx(["wrapper"])}>
      <p className={cx(["title"])}>{`${book} ${chapter}장 ${verse}절`}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register("submissionAnswer")}
          width={"718px"}
          minHeight={"200px"}
          className={cx("answer-textarea")}
        />
        <Button type={"secondary"} htmlType={"submit"}>
          {quizStatus !== QuizStatus.NOT_SUBMITTED && "다시"} 제출 하기
        </Button>
      </form>
      {renderStatusComp(quizStatus)}
      <Button
        type={"error"}
        onClick={() => setAnswerOpened((prev) => !prev)}
        className={cx("show-answer-btn")}
      >
        {answerOpened ? "정답 가리기" : "정답 보기"}
      </Button>
      {answerOpened && (
        <p
          className={cx("answer")}
          dangerouslySetInnerHTML={{ __html: contents }}
        />
      )}
    </div>
  );
}

export default QuizVerse;
