import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Person } from "../types/Person";

const columnHelper = createColumnHelper<Person>();

export const userColumnDefs = [
  columnHelper.accessor((row) => row.first_name, {
    id: "first_name",
    cell: (info) => info.getValue(),
    header: (info) => <span>First Name</span>,
  }),
  columnHelper.accessor((row) => row.last_name, {
    id: "last_name",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor((row) => row.gender, {
    id: "gender",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Gender</span>,
  }),
  columnHelper.accessor((row) => row.email, {
    id: "email",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor((row) => row.ip_address, {
    id: "ip_address",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>IP Address</span>,
  }),
  columnHelper.accessor((row) => row.countryCode, {
    id: "countryCode",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Country Code</span>,
  }),
  columnHelper.accessor((row) => row.city, {
    id: "city",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>City</span>,
  }),
];
