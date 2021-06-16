import cn from "classnames/bind";
import styles from "./index.module.scss";
import PageTitle from "../../components/page-title";
import BoardPostModal from "../../components/board-post-modal";
import { FireStoreProvider } from "../../firebase";

const cx = cn.bind(styles);

function GuestBoard() {
  return (
    <FireStoreProvider>
      <main className={cx("main")}>
        <PageTitle label={"📜 방명록"} />
        <BoardPostModal />
      </main>
    </FireStoreProvider>
  );
}

export default GuestBoard;
