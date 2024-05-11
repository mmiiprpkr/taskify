import { db } from "@/lib/db";
import { cache } from "react";

export const getListById = cache(async (boardId: string, orgId: string) => {
  const list = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      }
    },
    include: {
      cards: {
        orderBy: {
          order: "asc"
        },
      },
    },
    orderBy: {
      order: "asc"
    }
  });

  return list;
});