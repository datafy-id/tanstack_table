import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { type Person, makeData } from "../makeData";
import { useRef } from "react";

declare module "@tanstack/react-table" {
  // @ts-expect-error
  interface ColumnMeta<TData extends RowData, TValue> {
    rowSpan?: number;
  }
}

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

export const HeaderGroup01 = () => {
  const allPerson = useRef<Person[]>(makeData(10));

  const table = useReactTable({
    columns: columns,
    data: allPerson.current,
    getCoreRowModel: getCoreRowModel(),
    // debugAll: true,
  });
  return (
    <div>
      <h2 className="my-4 text-xl">Header Group (no custom rowspan)</h2>
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
    </div>
  );
};

export const HeaderGroup02 = () => {
  const allPerson = useRef<Person[]>(makeData(10));

  const table = useReactTable({
    columns: columns,
    data: allPerson.current,
    getCoreRowModel: getCoreRowModel(),
    // debugAll: true,
  });

  return (
    <div>
      <h2 className="my-4 text-xl">Header Group (with correct rowspan)</h2>
      <table className="*:border *:border-red-500">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="*:border *:border-red-500">
              {headerGroup.headers.map((header) => {
                const columnRelativeDepth = header.depth - header.column.depth;
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
  );
};
