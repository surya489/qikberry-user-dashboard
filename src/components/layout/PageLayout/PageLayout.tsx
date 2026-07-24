import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
