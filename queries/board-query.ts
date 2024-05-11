import { db } from "@/lib/db";
import { cache } from "react";

export const getBoard = cache(async (orgId: string) => {
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return boards;
});

export const getBoardByBoardId = cache(async (orgId: string, boardId: string) => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId
    },
  });

  return board;
})