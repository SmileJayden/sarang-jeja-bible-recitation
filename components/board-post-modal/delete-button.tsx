import { Button, Input, Modal, Spacer, useToasts } from "@geist-ui/react";
import { ChangeEvent, useState } from "react";
import { Trash2 } from "@geist-ui/react-icons";
import { useMediaQuery } from "react-responsive";
import { useMutation } from "react-query";
import { baseUrl, HttpMethod, MutationKeys } from "../../constants/http";

type DeletePostBody = {
  postId: string;
  password: string;
};

type Props = {
  postId: string;
  onSuccess?: () => void;
};

export default function PostDeleteButton({ postId, onSuccess }: Props) {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const [, setToast] = useToasts();

  const {
    mutate: deletePostMutation,
    isError,
    isLoading,
  } = useMutation<{}, {}, DeletePostBody>(
    MutationKeys.DELETE_POST,
    ({ postId, password }) =>
      fetch(`${baseUrl}/api/post`, {
        method: HttpMethod.DELETE,
        body: JSON.stringify({ postId, password }),
      }).then((res) => res.json())
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickDeleteButton = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setPassword("");
  };

  const handleSubmit = () => {
    deletePostMutation(
      { postId, password },
      {
        onSuccess: () => {
          setToast({
            text: "게시글 삭제에 성공하였습니다",
            type: "success",
          });
          onSuccess?.();
        },
        onError: () => {
          setToast({
            text: "비밀번호가 틀렸습니다. 게시글 삭제에 실패했습니다.",
            type: "error",
          });
        },
      }
    );
  };

  return (
    <>
      <Button
        size={isMobile ? "mini" : "small"}
        type="error"
        ghost
        auto
        onClick={() => handleClickDeleteButton()}
      >
        삭제 하기 <Spacer x={0.3} /> <Trash2 size={"1rem"} />
      </Button>
      <Modal
        open={visible}
        onClose={() => handleClose()}
        onOpen={() => handleOpen()}
      >
        <Modal.Title>해당 게시글을 삭제하시겠습니까?</Modal.Title>
        <Modal.Subtitle>
          해당 게시글의 비빌번호를 입력한 후, 게시물 삭제 버튼을 눌러주세요
        </Modal.Subtitle>
        <Modal.Content>
          <Input.Password
            placeholder="비밀번호를 입력해주세요"
            width={"100%"}
            autoComplete={"new-password"}
            value={password}
            onChange={handleChangeInput}
            type={isError ? "error" : "default"}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          취소하기
        </Modal.Action>
        <Modal.Action onClick={() => handleSubmit()} loading={isLoading}>
          게시물 삭제
        </Modal.Action>
      </Modal>
    </>
  );
}
