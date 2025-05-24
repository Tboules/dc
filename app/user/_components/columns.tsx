"use client";

import SafeHtmlRenderer from "@/components/safe-html-renderer";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Tag = {
  id: string;
  name: string;
};

export type UserExcerpt = {
  id: string;
  title: string;
  body: string;
  dateAdded: Date;
  desertFigureName: string;
  status: string;
  // reference: string | undefined;
  tags: Tag[];
};

export const USER_EXCERPT_COLUMNS: ColumnDef<UserExcerpt>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Body",
    cell: ({ row }) => {
      const body = row.original.body;
      return <SafeHtmlRenderer title={row.original.title} htmlString={body} />;
    },
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ row }) => {
      const date = row.original.dateAdded;
      return <div>{format(date, "PP")}</div>;
    },
  },
  {
    accessorKey: "desertFigureName",
    header: "Desert Figure",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags;

      return (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge variant="outline" className="text-center" key={tag.id}>
              {tag.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
];
