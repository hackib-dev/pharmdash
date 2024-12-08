"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Column } from "@tanstack/react-table";

import { Button } from "../../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  column: Column<TData>;
  children?: React.ReactNode;
}

export function DataTableRowActions<TData>({
  row,
  children,
  column,
}: DataTableRowActionsProps<TData>) {
  //   const task = taskSchema.parse(row.original);

  // const dan = column?.getFilterFn();
  // dan?.(row, 'id', '12', () => true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {children}
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
