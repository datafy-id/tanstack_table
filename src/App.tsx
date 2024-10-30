import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { makeData } from "./makeData";
import { useEffect, useRef } from "react";

declare module "@tanstack/react-table" {
  // @ts-expect-error
  interface ColumnMeta<TData extends RowData, TValue> {
    rowSpan?: number;
  }
}

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const allPerson: Person[] = [
  {
    firstName: "ridho",
    lastName: "ridho",
    age: 44,
    visits: 0,
    status: "In Relationship",
    progress: 0,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: "no",
    header: "No.",
    cell: (info) => info.row.index + 1,
    footer: (props) => props.column.id,
    meta: {
      rowSpan: 3,
    },
  }),
  columnHelper.group({
    id: "hello",
    header: () => <span>Hello</span>,
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          rowSpan: 2,
        },
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        meta: {
          rowSpan: 2,
        },
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
        meta: {
          rowSpan: 2,
        },
      }),
      columnHelper.group({
        header: "More Info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("status", {
            header: "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

export default function App() {
  const allPerson = useRef<Person[]>(makeData(100));

  const table = useReactTable({
    columns: columns,
    data: allPerson.current,
    getCoreRowModel: getCoreRowModel(),
    // debugAll: true,
  });
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Tanstack Table Example</h1>

      <h2 className="text-2xl">Header Group</h2>

      <h3 className="text-xl">Without rowSpan</h3>

      {/* WITHOUT ROWSPAN */}
      {/* <div className="p-2">
        <table className="*:border *:border-red-500">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="*:border *:border-red-500">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="*:border *:border-red-500">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id} className="*:border *:border-red-500">
                {footerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div> */}

      <h3 className="text-xl">With rowSpan</h3>

      {/* WITH ROWSPAN */}
      <div className="p-2">
        <table className="*:border *:border-red-500">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="*:border *:border-red-500">
                {headerGroup.headers.map((header) => {
                  const columnRelativeDepth =
                    header.depth - header.column.depth;
                  if (columnRelativeDepth > 1) {
                    return null;
                  }
                  const rowSpan = header.column.columnDef.meta?.rowSpan || 1;
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      rowSpan={rowSpan}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.depth}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="*:border *:border-red-500">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id} className="*:border *:border-red-500">
                {footerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      {/* <code className="text-sm">
        <pre>{JSON.stringify(makeData(3, 3), null, 2)}</pre>
      </code> */}
    </div>
  );
}
