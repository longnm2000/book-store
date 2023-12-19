import { Book } from "../types/types";

export const calculateForBook = (data: Book) => {
  const sumScore = data?.comments?.reduce((a, b) => a + b.score, 0);
  const commentsTotal = data?.comments?.length;
  const average =
    sumScore && commentsTotal ? Math.floor(sumScore / commentsTotal) : 0;
  return { sumScore, average, commentsTotal };
};
