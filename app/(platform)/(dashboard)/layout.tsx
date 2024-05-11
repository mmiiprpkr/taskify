import { Navbar } from "./navbar";

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return ( 
    <div className="h-full">
      <Navbar />
      {children}
    </div>
   );
}
 
export default DashboardLayout;