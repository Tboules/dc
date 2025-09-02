import { DesertFigure } from "@/lib/database/schema";
import { User } from "lucide-react";
import Link from "next/link";
import { RouteLiteral } from "nextjs-routes";

type DesertFigureCardProps = Pick<
  DesertFigure,
  "id" | "fullName" | "thumbnail"
>;

export default function DesertFigureCard({
  fullName,
  id,
  thumbnail,
}: DesertFigureCardProps) {
  return (
    <Link
      className="block w-72 border border-border rounded overflow-hidden bg-card hover:bg-accent"
      href={`/desert-figures/${id}` as RouteLiteral}
    >
      {thumbnail ? (
        <img className="w-full h-80 object-cover object-top" src={thumbnail} />
      ) : (
        <div className="w-full h-80 flex justify-center items-center">
          <User className="bg-accent rounded w-[calc(100%-2rem)] h-[calc(100%-2rem)] p-12" />
        </div>
      )}
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium">{fullName}</h3>
      </div>
    </Link>
  );
}
