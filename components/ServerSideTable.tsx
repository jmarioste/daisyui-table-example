import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { memo } from "react";
import { userColumnDefs } from "./UserColumnDefs";

import { Person } from "../types/Person";

import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Table = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let url = new URL(`http://localhost:3000/api/users`);
  const sort = sorting.at(0);
  if (sort) {
    url.searchParams.set("sort_by", sort.id);
    url.searchParams.set("sort_order", sort.desc ? "desc" : "asc");
  }
  const { data, isValidating } = useSWR<Person[]>(url.toString(), fetcher);

  const table = useReactTable({
    columns: userColumnDefs,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: true,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;

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
          {isValidating && <span>Loading...</span>}
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

export default memo(Table);
