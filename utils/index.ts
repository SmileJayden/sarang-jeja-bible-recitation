import { IVerse } from "../types";

const ALL_SPECIAL_CHAR_REGEX = /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;

export const parseAnswer = (answer: string): string =>
  answer.replace(ALL_SPECIAL_CHAR_REGEX, "");

export const checkIsAnswerCorrect = (
  submission: string,
  answer: string
): boolean => parseAnswer(submission) === parseAnswer(answer);

export const getAnswerDiff = (submission: string, answer: string): string => {
  const parsedSubmission = parseAnswer(submission);
  const splitAnswer = answer.split(ALL_SPECIAL_CHAR_REGEX);

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

export const getShuffledArray = (array: unknown[]) => {
  const resArray = [...array];
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = resArray[i];
    resArray[i] = resArray[j];
    resArray[j] = temp;
  }
  return resArray;
};
