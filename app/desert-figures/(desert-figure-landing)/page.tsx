import DesertFigureCard from "@/components/desert_figure_card";
import { selectDesertFigures } from "@/lib/database/handlers/desert-figures";
import {
  globalSearchParamsLoader,
  PagePropsWithParams,
} from "@/lib/utils/params";

export default async function DesertFiguresRoot({
  searchParams,
}: PagePropsWithParams) {
  const params = await globalSearchParamsLoader(searchParams);

  const df = await selectDesertFigures(params);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center hover:brightness-90">
      {df.map((d) => (
        <DesertFigureCard key={d.id} {...d} />
      ))}
    </div>
  );
}
