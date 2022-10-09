import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  // 1. add necessary import
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { userColumnDefs } from "./UserColumnDefs";
import data from "../users.json";
import { Person } from "../types/Person";
import Pagination from "./Pagination";
const Table = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns: userColumnDefs,
    data: data as Person[],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //2.  add getPaginationRowModel
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  return (
    <div className="overflow-auto">
      <table className="table table-zebra my-4 w-full">
        <thead>
          <tr>
            {headers.map((header) => {
              const direction = header.column.getIsSorted();
              const arrow: any = {
                asc: "🔼",
                desc: "🔽",
              };
              const sort_indicator = direction && arrow[direction];
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
                      {direction && <span>{sort_indicator}</span>}
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
              {row.getVisibleCells().map((cell, index) => {
                return index === 0 ? (
                  <th key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </th>
                ) : (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
};

export default Table;
