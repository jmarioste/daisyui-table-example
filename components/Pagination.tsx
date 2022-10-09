import { Table } from "@tanstack/react-table";
import React from "react";

type Props = {
  // table returned from useTable hook.
  table: Table<any>;
};

const Pagination = ({ table }: Props) => {
  // pagination state
  const state = table.getState().pagination;
  //last page helper function
  const goLastPage = () => table.setPageIndex(table.getPageCount() - 1);
  return (
    <div className="my-2">
      <div className="flex items-center gap-2">
        <div className="btn-group btn-sm">
          {/* button to go to first page */}
          <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          {/* button to go previous page */}
          <button
            className="btn btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          {/* button to go next page */}
          <button
            className="btn btn-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          {/* button to go last page */}
          <button
            className="btn btn-sm"
            onClick={goLastPage}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        {/* page info */}
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {state.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        {/* input to skip to a specific page */}
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            defaultValue={state.pageIndex + 1}
            type="number"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="input input-bordered w-20 input-sm mx-2"
          />
        </span>
        {/* select to input page size */}
        <select
          value={state.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="select select-sm select-bordered"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
