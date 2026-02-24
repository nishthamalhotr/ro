import React from "react";
import { cn } from "@/lib/utils";

interface Column {
  header: string;
  accessor: string;
  className?: string;
  isHeader?: boolean;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  testId?: string;
}

export default function ResponsiveTable({
  columns,
  data,
  title,
  testId,
}: ResponsiveTableProps) {
  return (
    <div className="my-12 space-y-4" data-testid={testId}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">
          {title}
        </h2>
      )}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            {/* Header */}
            <thead className="bg-white/5 text-neutral-400">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={cn("px-6 py-4 font-medium", col.className)}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  {columns.map((col, colIdx) => {
                    const content = row[col.accessor];

                    if (col.isHeader) {
                      return (
                        <th
                          key={colIdx}
                          className="px-6 py-4 font-medium text-white"
                        >
                          {content}
                        </th>
                      );
                    }

                    return (
                      <td
                        key={colIdx}
                        className={cn(
                          "px-6 py-4 text-white/90",
                          col.className
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
