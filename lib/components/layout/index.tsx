"use client";

import { useState } from "react";
import cn from "classnames";
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
        <main
          className={cn(
            "relative overflow-scroll h-full",
            "pt-[calc(var(--header-height)+var(--subheader-height))]",
          )}
        >
          {children}
        </main>
      )}
    </>
  );
};

export default Layout;
