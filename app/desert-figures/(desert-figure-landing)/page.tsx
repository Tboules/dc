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

  const desertFigures = await selectDesertFigures(params);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-8 place-items-center">
      {desertFigures.map((desertFigure) => (
        <DesertFigureCard key={desertFigure.id} {...desertFigure} />
      ))}
    </div>
  );
}
