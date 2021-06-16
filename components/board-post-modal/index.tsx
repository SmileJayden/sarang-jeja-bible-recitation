import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Modal,
  Row,
  Spacer,
  Text,
  Textarea,
  Tooltip,
  useModal,
  useToasts,
} from "@geist-ui/react";
import { Info } from "@geist-ui/react-icons";

type BoardPostFormData = {
  title: string;
  author: string;
  contents: string;
  password: string;
};

export default function BoardPostModal() {
  const { visible, setVisible, bindings } = useModal();
  const [, setToast] = useToasts();
  const defaultValues: BoardPostFormData = {
    author:
      (typeof window !== "undefined" &&
        window?.localStorage?.getItem("author")) ||
      "",
    title: "",
    contents: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BoardPostFormData>({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = useCallback(
    handleSubmit(({ author, contents, title, password }) => {
      window.localStorage.setItem("author", author);
      reset({ ...defaultValues, author });
      setVisible(false);
      setToast({
        text: "방명록 생성에 성공하였습니다!",
        type: "success",
      });
    }),
    [reset, setToast]
  );

  return (
    <>
      <button
        onClick={() =>
          setToast({
            text: "방명록 생성에 성공하였습니다!",
            type: "success",
          })
        }
      >
        hihi
      </button>
      <Button auto onClick={() => setVisible(true)}>
        Show Modal
      </Button>
      <form id={"post-board-form"} onSubmit={onSubmit} autoComplete={"off"}>
        <Modal {...bindings} width={"60rem"}>
          <Modal.Title>방명록 쓰기</Modal.Title>
          <Modal.Subtitle>방명록 한번 써 보실라우?</Modal.Subtitle>
          <Modal.Content>
            <Input
              {...register("author", { required: true })}
              width={"240px"}
              placeholder="이름이나 별명을 입력해 주세요"
              status={errors.author ? "error" : "default"}
            >
              글 쓴이
            </Input>
            <Spacer y={0.5} />
            <Input
              {...register("title", { required: true })}
              width={"240px"}
              placeholder="방명록 제목을 입력해주세요"
              status={errors.title ? "error" : "default"}
            >
              제목
            </Input>
            <Text
              p
              style={{ color: "#444", marginBottom: "8pt", lineHeight: "1.5" }}
            >
              내용
            </Text>
            <Textarea
              {...register("contents", { required: true })}
              width={"100%"}
              minHeight={"240px"}
              placeholder="방명록에 쓸 내용을 입력해주세요"
              status={errors.contents ? "error" : "default"}
            />
            <Spacer y={0.5} />
            <Input.Password
              {...register("password", { required: true })}
              placeholder="비밀번호를 입력해주세요"
              width={"240px"}
              status={errors.password ? "error" : "default"}
              autoComplete={"new-password"}
            >
              <Row>
                비밀번호
                <Spacer x={0.3} />
                <Tooltip
                  text={
                    "해당 게시물을 수정하거나 삭제하려면 이 비밀번호를 기억해야 합니다"
                  }
                  type={"dark"}
                  placement={"rightStart"}
                >
                  <Info size={14} />
                </Tooltip>
              </Row>
            </Input.Password>
          </Modal.Content>
          <Modal.Action passive onClick={() => setVisible(false)}>
            취소하기
          </Modal.Action>
          <Modal.Action form={"post-board-form"} htmlType={"submit"}>
            제출하기
          </Modal.Action>
        </Modal>
      </form>
    </>
  );
}
