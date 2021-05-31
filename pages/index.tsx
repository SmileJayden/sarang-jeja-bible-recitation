import Link from "next/link";
import styles from "../styles/Home.module.css";
import HeadComp from "../components/head";

export default function Home() {
  return (
    <div className={styles.container}>
      <HeadComp />
      <main className={styles.main}>
        <h1 className={styles.title}>💒 사랑의 교회 제자훈련 ️❤️</h1>
        <p className={styles.description}>암송시험 준비 홈페이지</p>
        <div className={styles.grid}>
          <Link href={{ pathname: "/all-verses" }}>
            <a className={styles.card}>
              <h2>전체 말씀 &rarr;</h2>
              <p>전체 말씀 보기</p>
            </a>
          </Link>
          <Link href={{ pathname: "/test-random-each" }}>
            <a className={styles.card}>
              <h2>한 말씀 씩 시험 &rarr;</h2>
              <p>한 말씀 씩 외워보기</p>
            </a>
          </Link>
          <Link href={{ pathname: "/test-all" }}>
            <a className={styles.card}>
              <h2>전체 말씀 시험&rarr;</h2>
              <p>전체 말씀 외워보기 &rarr;</p>
            </a>
          </Link>
          <Link href={{ pathname: "/test-all", query: { count: 20 } }}>
            <a className={styles.card}>
              <h2>모의 시험 &rarr;</h2>
              <p>전체 말씀 중 랜덤하게 20개 풀어보기</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="mailto:wkdwodud07@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by
          <span className={styles.logo}>SmileJayden</span>
          <span>🙂</span>
        </a>
      </footer>
    </div>
  );
}
