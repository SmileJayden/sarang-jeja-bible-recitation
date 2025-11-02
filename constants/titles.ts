import { LinkPath } from "./links";

export enum PageTitle {
  HOME = "💒 사랑의교회 제자훈련️ ❤️",
  ALL_VERSES = "📖 전체 암송구절",
  BY_WEEK = "🌈 제자훈련 주차별\n 말씀 보기",
  TEST_RANDOM_EACH = "☝️ 한 말씀씩 암송 하기",
  TEST_ALL = "📝 전체 암송 시험",
  GUEST_BOARD = "📜 방명록",
  XEE_VERSES = "✝️ XEE 말씀 구절",
}

export enum PageSubTitle {
  HOME = "대학 4부 드림이 제자훈련 암송시험 준비",
  ALL_VERSES = "전체 암송구절 보기",
  BY_WEEK = "주차별로 말씀 보기",
  TEST_RANDOM_EACH = "",
  TEST_ALL = "",
  GUEST_BOARD = "❤️ 사랑을 담아 하고싶은 말을 적어보아요 ❤️",
  XEE_VERSES = "XEE 말씀 구절 보기",
}

export const titleByLinkPath = new Map<LinkPath, PageTitle>([
  [LinkPath.HOME, PageTitle.HOME],
  [LinkPath.ALL_VERSES, PageTitle.ALL_VERSES],
  [LinkPath.BY_WEEK, PageTitle.BY_WEEK],
  [LinkPath.GUEST_BOARD, PageTitle.GUEST_BOARD],
  [LinkPath.TEST_RANDOM_EACH, PageTitle.TEST_RANDOM_EACH],
  [LinkPath.TEST_ALL, PageTitle.TEST_ALL],
  [LinkPath.XEE_VERSES, PageTitle.XEE_VERSES],
]);

export const subTitleByLinkPath = new Map<LinkPath, PageSubTitle>([
  [LinkPath.HOME, PageSubTitle.HOME],
  [LinkPath.ALL_VERSES, PageSubTitle.ALL_VERSES],
  [LinkPath.BY_WEEK, PageSubTitle.BY_WEEK],
  [LinkPath.GUEST_BOARD, PageSubTitle.GUEST_BOARD],
  [LinkPath.TEST_RANDOM_EACH, PageSubTitle.TEST_RANDOM_EACH],
  [LinkPath.TEST_ALL, PageSubTitle.TEST_ALL],
  [LinkPath.XEE_VERSES, PageSubTitle.XEE_VERSES],
]);
