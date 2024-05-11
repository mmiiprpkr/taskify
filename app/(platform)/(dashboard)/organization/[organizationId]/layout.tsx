import { startCase } from "lodash";

import { OrgControl } from "./org-control";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  }
}

type Props = {
  children: React.ReactNode;
}

const OrganizationIdLayout = ({ children }: Props) => {
  return ( 
    <>
      <OrgControl />
      {children}
    </>
   );
}
 
export default OrganizationIdLayout;