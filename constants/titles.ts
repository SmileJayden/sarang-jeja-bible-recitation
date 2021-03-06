import { LinkPath } from "./links";

export enum PageTitle {
  HOME = "π μ¬λμκ΅ν μ μνλ ¨οΈ β€οΈ",
  ALL_VERSES = "π μ μ²΄ μμ‘κ΅¬μ ",
  BY_WEEK = "π μ μνλ ¨ μ£Όμ°¨λ³\n λ§μ λ³΄κΈ°",
  TEST_RANDOM_EACH = "βοΈ ν λ§μμ© μμ‘ νκΈ°",
  TEST_ALL = "π μ μ²΄ μμ‘ μν",
  GUEST_BOARD = "π λ°©λͺλ‘",
}

export enum PageSubTitle {
  HOME = "λν 4λΆ μ μνλ ¨ μμ‘μν μ€λΉ ννμ΄μ§",
  ALL_VERSES = "μ μ²΄ μμ‘κ΅¬μ  λ³΄κΈ°",
  BY_WEEK = "μ£Όμ°¨λ³λ‘ λ§μ λ³΄κΈ°",
  TEST_RANDOM_EACH = "",
  TEST_ALL = "",
  GUEST_BOARD = "β€οΈ μ¬λμ λ΄μ νκ³ μΆμ λ§μ μ μ΄λ³΄μμ β€οΈ",
}

export const titleByLinkPath = new Map<LinkPath, PageTitle>([
  [LinkPath.HOME, PageTitle.HOME],
  [LinkPath.ALL_VERSES, PageTitle.ALL_VERSES],
  [LinkPath.BY_WEEK, PageTitle.BY_WEEK],
  [LinkPath.GUEST_BOARD, PageTitle.GUEST_BOARD],
  [LinkPath.TEST_RANDOM_EACH, PageTitle.TEST_RANDOM_EACH],
  [LinkPath.TEST_ALL, PageTitle.TEST_ALL],
]);

export const subTitleByLinkPath = new Map<LinkPath, PageSubTitle>([
  [LinkPath.HOME, PageSubTitle.HOME],
  [LinkPath.ALL_VERSES, PageSubTitle.ALL_VERSES],
  [LinkPath.BY_WEEK, PageSubTitle.BY_WEEK],
  [LinkPath.GUEST_BOARD, PageSubTitle.GUEST_BOARD],
  [LinkPath.TEST_RANDOM_EACH, PageSubTitle.TEST_RANDOM_EACH],
  [LinkPath.TEST_ALL, PageSubTitle.TEST_ALL],
]);
