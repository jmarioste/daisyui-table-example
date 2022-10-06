import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { userColumnDefs } from "./UserColumnDefs";
import data from "../users.json";
import { Person } from "../types/Person";
import { useRouter } from "next/router";
const Table = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns: userColumnDefs,
    data: data as Person[],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  console.log(sorting);
  return (
    <div>
      <table className="table table-zebra my-4 w-full">
        <thead>
          <tr>
            {headers.map((header) => {
              const direction = header.column.getIsSorted() as string;

              const arrow = !direction
                ? null
                : direction === "asc"
                ? "🔼"
                : "🔽";
              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer flex gap-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span>{arrow}</span>
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
