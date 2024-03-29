import { useEffect, useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { event } from "nextjs-google-analytics";
import {
  Button,
  Card,
  Textarea,
  Text,
  Spacer,
  Divider,
  Row,
} from "@geist-ui/react";
import { XSquare, Delete } from "@geist-ui/react-icons";
import { IVerse } from "../../types";
import {
  checkIsAnswerCorrect,
  getAnswerDiff,
  getChapterLabel,
} from "../../utils";
import { useMediaQuery } from "react-responsive";

enum QuizStatus {
  CORRECT = "correct",
  WRONG = "wrong",
  NOT_SUBMITTED = "not_submitted",
}

type Answer = { submissionAnswer: string };

const QUIZ_SUBMIT_DURATION = 150;

function QuizVerse({ book, chapter, verse, contents }: IVerse) {
  const { register, handleSubmit, reset, resetField } = useForm<Answer>();

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

  const onSubmit = (data: Answer) => {
    event("submission_answer", {
      category: "submissionAnswer",
      label: data.submissionAnswer,
    });
    setAnswer(data.submissionAnswer);
    setStatusHighlighted(true);
    setTimeout(() => {
      setStatusHighlighted(false);
    }, QUIZ_SUBMIT_DURATION);
    setQuizStatus(
      checkIsAnswerCorrect(data.submissionAnswer, contents)
        ? QuizStatus.CORRECT
        : QuizStatus.WRONG
    );
  };

  const renderStatusComp = (quizStatus: QuizStatus) => {
    if (quizStatus === QuizStatus.NOT_SUBMITTED) return <></>;

    const contentByStatus = {
      [QuizStatus.CORRECT]: (
        <Text
          blockquote
          style={{
            backgroundColor: statusHighlighted ? "#dce9fc" : "#ebf3ff",
            borderColor: "#b0c0ff",
            paddingRight: "32px",
          }}
        >
          🙆‍♂️ 정답입니다! 😃 👍 👍 👍 👍 👍
        </Text>
      ),
      [QuizStatus.WRONG]: (
        <Text
          blockquote
          style={{
            backgroundColor: statusHighlighted ? "#fff0ed" : "#fff8f7",
            borderColor: "#ffc2cf",
            paddingRight: "32px",
          }}
        >
          <Text>🙅‍♀️ 오답입니다! 🥲</Text>
          <Text>📕 오답노트 ⬇️</Text>
          <Text
            dangerouslySetInnerHTML={{
              __html: getAnswerDiff(answer, contents),
            }}
          />
        </Text>
      ),
    };
    const borderColorByStatus = {
      [QuizStatus.CORRECT]: "blue",
      [QuizStatus.WRONG]: "red",
    };

    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: "7px",
            top: "7px",
            cursor: "pointer",
          }}
          onClick={() => setQuizStatus(QuizStatus.NOT_SUBMITTED)}
        >
          <XSquare color={borderColorByStatus[quizStatus] || "black"} />
        </div>
        {contentByStatus[quizStatus] || <></>}
      </div>
    );
  };

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const keyCode = e.key;
    if (keyCode === "Enter" && e.ctrlKey) {
      handleSubmit(onSubmit)();
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <Card>
      <Card.Content>
        <Text b h4>{`${book} ${chapter}${getChapterLabel(
          book
        )} ${verse}절`}</Text>
      </Card.Content>
      <Divider y={0} />
      <Card.Content>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
          <div style={{ position: "relative" }}>
            <button
              style={{
                position: "absolute",
                right: "7px",
                top: "7px",
                cursor: "pointer",
                padding: 0,
                border: "none",
                outline: "none",
                font: "inherit",
                color: "inherit",
                background: "none",
              }}
              type="reset"
              onClick={() => reset()}
            >
              <Delete />
            </button>
            <Textarea
              {...register("submissionAnswer")}
              width={"100%"}
              minHeight={"200px"}
              style={{ paddingRight: "32px" }}
            />
          </div>
          <Spacer y={1.25} />
          <Row justify={"end"}>
            <Button
              style={isMobile ? { width: "100%" } : {}}
              type={"success-light"}
              htmlType={"submit"}
            >
              제출 하기 (Ctrl + Enter)
            </Button>
          </Row>
        </form>
        {renderStatusComp(quizStatus)}
        <Spacer y={1.25} />
        <Row justify={"end"}>
          <Button
            style={isMobile ? { width: "100%" } : {}}
            type={"error"}
            onClick={() => setAnswerOpened((prev) => !prev)}
          >
            {answerOpened ? "정답 가리기" : "정답 보기"}
          </Button>
        </Row>
        {answerOpened && (
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: "7px",
                top: "7px",
                cursor: "pointer",
              }}
              onClick={() => setAnswerOpened(false)}
            >
              <XSquare />
            </div>
            <Text
              blockquote
              dangerouslySetInnerHTML={{ __html: contents }}
              style={{ whiteSpace: "pre-wrap", paddingRight: "32px" }}
            />
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

export default QuizVerse;
