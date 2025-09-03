import { Separator } from "@/components/ui/separator";

export function ResponsiveSeperators() {
  return (
    <>
      <Separator
        className="hidden md:block h-[calc(100lvh-var(--nav-height))]!"
        orientation="vertical"
      />
      <Separator className="block md:hidden" />
    </>
  );
}
