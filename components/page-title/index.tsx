import Link from "next/link";
import cn from "classnames/bind";
import styles from "./index.module.scss";
const cx = cn.bind(styles);

interface PageTitleProps {
  label: string;
}

export default function PageTitle({ label }: PageTitleProps) {
  return (
    <div>
      <Link href={"/"}>
        <a className={cx("home-link")}>
          <h3>💒 사랑의 교회 제자훈련 ️❤️</h3>
        </a>
      </Link>
      <h1 className={cx("title")}>{label}</h1>
    </div>
  );
}
