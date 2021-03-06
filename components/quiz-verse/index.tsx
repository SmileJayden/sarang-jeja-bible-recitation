import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Textarea,
  Text,
  Spacer,
  Divider,
  Row,
} from "@geist-ui/react";
import { XSquare } from "@geist-ui/react-icons";
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

const QUIZ_SUBMIT_DURATION = 150;

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

  const checkKeyDown = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode === 13 && e.ctrlKey) {
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
          <Textarea
            {...register("submissionAnswer")}
            width={"100%"}
            minHeight={"200px"}
          />
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
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

export default QuizVerse;
