import { DesertFigure } from "@/lib/database/schema";
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
      className="block w-64 border border-border rounded overflow-hidden bg-card hover:bg-accent"
      href={`/desert-figures/${id}` as RouteLiteral}
    >
      {thumbnail && (
        <img className="w-full h-80 object-cover object-top" src={thumbnail} />
      )}
      <div className="p-4 text-center">
        <h3>{fullName}</h3>
      </div>
    </Link>
  );
}
