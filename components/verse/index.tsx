import { IVerse } from "../../types";
import styles from "./index.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

function Verse({ book, chapter, verse, contents }: IVerse) {
  return (
    <div className={cx("verse-wrapper")}>
      <p>{`${book} ${chapter}장 ${verse}절`}</p>
      <p dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  );
}

export default Verse;
