import { Comment } from "../types/types";

export const calculateForBook = (data: Comment[]) => {
  const sumScore = data.reduce((a, b) => a + b.score, 0);
  const totalComments = data.length;
  const average =
    sumScore && totalComments ? Math.floor(sumScore / totalComments) : 0;
  return { sumScore, average, totalComments };
};
