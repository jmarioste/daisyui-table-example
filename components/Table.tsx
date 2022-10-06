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
const Table = () => {
  //1. add a sorting state using useState hook, this will allow us to keep track of the state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns: userColumnDefs,
    data: data as Person[],
    getCoreRowModel: getCoreRowModel(),
    //2. add getSortedRowModel into the pipeline. this will calculate the sorted rows when the sort state changes
    getSortedRowModel: getSortedRowModel(),
    //3. add state to our table we use the  sorting state from step 1
    state: {
      sorting,
    },
    //4. add a handler for onSortingChange using the setSorting from step 1
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
              //5. check if the column is sorted
              const direction = header.column.getIsSorted();

              //6. create a map to get the sorting indicator
              const arrow: any = {
                asc: "🔼",
                desc: "🔽",
              };

              //6. get the sorting indicator if header is sorted
              const sort_indicator = direction && arrow[direction];
              return (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    //7. add an onClick handler using header.column.getToggleSortingHandler
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      // 8. add a class to render the sorting indicator properly
                      className="cursor-pointer flex gap-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* 9. render the sorting indicator */}
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
