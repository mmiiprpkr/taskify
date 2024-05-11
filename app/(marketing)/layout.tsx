import { Footer } from "./footer";
import { Navbar } from "./navbar";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
