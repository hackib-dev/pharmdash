"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Medicine } from "./types";
import { DataTableColumnHeader } from "@/components/ui/Table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Medicine Name
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="min-w-[150px]">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "manufacturer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
    cell: ({ row }) => <div>{row.getValue("manufacturer")}</div>,
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity in Stock" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[120px]">{row.getValue("quantityInStock")}</div>
    ),
  },
  {
    accessorKey: "pricePerUnit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price ($)" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[120px]">{`$${row.getValue("pricePerUnit")}`}</div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiry Date" />
    ),
    cell: ({ row }) => {
      const expiryDate = row.getValue("expiryDate");
      const parsedDate =
        expiryDate && typeof expiryDate === "string"
          ? new Date(expiryDate)
          : expiryDate instanceof Date
          ? expiryDate
          : null;

      return (
        <div className="min-w-[120px]">
          {parsedDate ? format(parsedDate, "dd/MM/yyyy") : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "prescriptionNeeded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prescription Needed" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        {row.getValue("prescriptionNeeded") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div>
        <span
          className={`${
            row.getValue("status") === "Expired"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        {format(new Date(row.getValue("lastUpdated")), "dd/MM/yyyy HH:mm")}
      </div>
    ),
  },
];
