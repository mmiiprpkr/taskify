import { getBoardByBoardId } from "@/queries/board-query";

import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { BoardNavbar } from "./board-navbar";

export async function generateMetadata({
  params
}: {
  params: { boardId: string }
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    }
  }

  const board = await getBoardByBoardId(orgId, params?.boardId);

  return {
    title: board?.title || "Board",
  }
}

type Props = {
  children: React.ReactNode;
  params: {
    boardId: string;
  }
}

const BoardLayout = async ({
  children,
  params: { boardId }
}: Props) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await getBoardByBoardId(orgId, boardId);

  if (!board) {
    notFound();
  }

  return ( 
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolte inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">
        {children}
      </main>
    </div>
   );
};
 
export default BoardLayout;