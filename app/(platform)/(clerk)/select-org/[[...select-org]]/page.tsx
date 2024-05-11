import { OrganizationList } from "@clerk/nextjs";

const CreateOrganizationPage = () => {
  return (
    <OrganizationList 
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
      skipInvitationScreen
    />
  );
};

export default CreateOrganizationPage;
