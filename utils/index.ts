import { IVerse } from "../types";

const ALL_CHAR_REGEX = /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;

export const parseAnswer = (answer: string): string =>
  answer.replace(ALL_CHAR_REGEX, "");

export const checkAnswer = (submission: string, answer: string): boolean =>
  parseAnswer(submission) === parseAnswer(answer);

export const gitAnswerDiff = (submission: string, answer: string): string => {
  const parsedSubmission = parseAnswer(submission);
  const splitAnswer = answer.split(ALL_CHAR_REGEX);

  let diffIndex = -1;
  let submissionSubStr = parsedSubmission;
  splitAnswer.forEach((elem, i) => {
    if (diffIndex > -1) return;

    if (i === splitAnswer.length - 1) {
      if (submissionSubStr !== elem) {
        diffIndex = i;
        return;
      }
    }

    if (submissionSubStr.startsWith(elem)) {
      submissionSubStr = submissionSubStr.substr(elem.length);
      return;
    }

    diffIndex = i;
  });

  splitAnswer[diffIndex] = `<span >${splitAnswer[diffIndex]}</span>`;

  return splitAnswer.join(" ");
};

export const shuffleArray = (array) => {
  const resArray = [...array];
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    const x = resArray[i];
    resArray[i] = resArray[j];
    resArray[j] = x;
  }
  return resArray;
};

export const HEBREWS_9_27: IVerse = {
  book: "히브리서",
  chapter: "9",
  verse: "27",
  contents:
    "한 번 죽는 것은 사람에게 정해진 것이요 그 후에는 심판이 있으리니"
};
