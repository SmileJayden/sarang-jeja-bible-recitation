import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Textarea } from "@geist-ui/react";
import cn from "classnames/bind";
import { IVerse } from "../../types";
import styles from "./index.module.scss";
import { checkIsAnswerCorrect, getAnswerDiff } from "../../utils";
const cx = cn.bind(styles);

enum QuizStatus {
  CORRECT = "correct",
  WRONG = "wrong",
  NOT_SUBMITTED = "not_submitted",
}

function QuizVerse({ book, chapter, verse, contents }: IVerse) {
  const { register, handleSubmit, reset } = useForm();

  const [answer, setAnswer] = useState<string>("");
  const [answerOpened, setAnswerOpened] = useState<boolean>(false);
  const [statusHighlighted, setStatusHighlighted] = useState<boolean>(false);
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
    setStatusHighlighted(true);
    setTimeout(() => {
      setStatusHighlighted(false);
    }, 100);
    setQuizStatus(
      checkIsAnswerCorrect(data.submissionAnswer, contents)
        ? QuizStatus.CORRECT
        : QuizStatus.WRONG
    );
  };

  const renderStatusComp = (quizStatus: QuizStatus) => {
    switch (quizStatus) {
      case QuizStatus.CORRECT:
        return (
          <div
            className={cx([
              "quiz-status",
              "correct",
              { highlighted: statusHighlighted },
            ])}
          >
            <p>🙆‍♂️ 정답입니다! 😃 👍 👍 👍 👍 👍</p>
          </div>
        );
      case QuizStatus.WRONG:
        return (
          <div
            className={cx([
              "quiz-status",
              "incorrect",
              { highlighted: statusHighlighted },
            ])}
          >
            <p>{statusHighlighted}🙅‍♀️ 오답입니다! 🥲</p>
            <p>📕 오답노트 ⬇️</p>
            <p
              dangerouslySetInnerHTML={{
                __html: getAnswerDiff(answer, contents),
              }}
            />
          </div>
        );
      case QuizStatus.NOT_SUBMITTED:
      default:
        return <></>;
    }
  };

  const checkKeyDown = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode === 13 && e.ctrlKey) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={cx(["wrapper"])}>
      <p className={cx(["title"])}>{`${book} ${chapter}장 ${verse}절`}</p>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
        <Textarea
          {...register("submissionAnswer")}
          width={"100%"}
          minHeight={"200px"}
          className={cx("answer-textarea")}
        />
        <Button type={"success-light"} htmlType={"submit"}>
          제출 하기 (Ctrl + Enter)
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
