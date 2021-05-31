import { ALL_VERSES } from "../../constants/verses";
import Verse from "../../components/verse";
import cn from "classnames/bind";
import styles from "./index.module.scss";
import HeadComp from "../../components/head";
import PageTitle from "../../components/page-title";
const cx = cn.bind(styles);

function AllVerses() {
  return (
    <>
      <HeadComp />
      <main className={cx("main")}>
        <div className={cx("container")}>
          <PageTitle label={"📖 전체 암송구절"} />
          {ALL_VERSES.map((verse, i) => {
            return <Verse key={i} {...verse} />;
          })}
        </div>
      </main>
    </>
  );
}

export default AllVerses;
