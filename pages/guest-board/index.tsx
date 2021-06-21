import { Page } from "@geist-ui/react";
import BoardPostModal from "../../components/board-post-modal";

function GuestBoard() {
  return (
    <Page.Content className={"contents-main"}>
      <BoardPostModal />
    </Page.Content>
  );
}

export default GuestBoard;
