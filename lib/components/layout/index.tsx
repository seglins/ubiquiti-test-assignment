"use client";

import { useState } from "react";
import Header from "./header";
import Subheader from "./subheader";

interface LayoutProps {
  subheader?: React.ReactNode;
  subheaderClassName?: string;
  children: React.ReactNode;
}

const Layout = ({ subheader, subheaderClassName, children }: LayoutProps) => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Header />

      <Subheader className={subheaderClassName} onReady={setReady}>
        {subheader}
      </Subheader>

      {ready && (
        <main className="overflow-scroll pt-[calc(var(--header-height)+var(--subheader-height)))] h-dvh">
          {children}
        </main>
      )}
    </>
  );
};

export default Layout;
