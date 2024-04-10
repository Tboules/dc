import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  message?: string;
  errorMessage?: string;
  wrapperClass?: string;
};

export default function FormHeader({
  title,
  message,
  errorMessage,
  wrapperClass,
}: Props) {
  return (
    <div className={cn("w-full", wrapperClass)}>
      <h1 className="font-bold text-xl">{title}</h1>
      <h3>{message}</h3>
      <h3 className="text-destructive">{errorMessage}</h3>
      <Separator className="w-full mt-4" />
    </div>
  );
}
