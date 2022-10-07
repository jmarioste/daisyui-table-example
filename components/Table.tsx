import {
  //used for rendering rows
  flexRender,
  //returns the rendered rows for the table
  getCoreRowModel,
  //react table hook
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { userColumnDefs } from "./UserColumnDefs";
import data from "../users.json";
import { Person } from "../types/Person";
const Table = () => {
  const table = useReactTable({
    columns: userColumnDefs,
    data: data as Person[],
    getCoreRowModel: getCoreRowModel(),
  });
  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;
  return (
    <div>
      <table className="table table-zebra my-4 w-full">
        <thead>
          <tr>
            {headers.map((header) => {
              return (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
