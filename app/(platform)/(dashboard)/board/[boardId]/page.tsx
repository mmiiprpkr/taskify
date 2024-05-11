import { getListById } from "@/queries/list-query";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./list-container";

type Props = {
  params: {
    boardId: string;
  },
}

const BoardIdPage = async ({ params: { boardId }}: Props) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await getListById(boardId, orgId);

  return ( 
    <div className="p-4 h-full overflow-auto">
      <ListContainer 
        boardId={boardId}
        data={lists}
      />
    </div>
   );
};
 
export default BoardIdPage;