"use client";

import cn from "classnames";
import { useRouter } from "next/navigation";
import { type CSSProperties } from "react";

interface TableColumn {
  title: string;
  width?: CSSProperties["width"];
}

interface TableRow {
  data: React.ReactNode[];
  href?: string;
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  className?: string;
}

const Table = ({ columns, rows, className }: TableProps) => {
  const router = useRouter();

  return (
    <div className={cn("relative overflow-x-auto", className)}>
      <table className="container border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-white/85 backdrop-blur-xs">
          <tr className="">
            {columns.map(({ title, width }, index) => (
              <th
                style={{ width, minWidth: width }}
                key={index}
                className={cn(
                  "px-2 py-1.5 text-text-1 border-b border-neutral-3 text-left whitespace-nowrap",
                  { "box-content": !!width },
                )}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const { href } = row;

            return (
              <tr
                key={rowIndex}
                tabIndex={0}
                onClick={() => {
                  if (href) {
                    router.push(href);
                  }
                }}
                className={cn(
                  "group hover:bg-neutral-3 focus-visible:outline-none focus:outline-none transition-colors",
                  { "cursor-pointer": !!href },
                )}
              >
                {row.data?.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "relative px-2 py-1.5 border-b border-neutral-3 border-t border-t-transparent text-left whitespace-nowrap",
                      "group-focus:border-outline group-focus-visible:border-outline",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
