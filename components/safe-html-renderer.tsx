import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { truncateString } from "@/lib/utils";

const HTML_STRING_MAX_LENGTH = 100;

export default function SafeHtmlRenderer({
  htmlString,
  title,
}: {
  htmlString: string;
  title: string;
}) {
  const truncatedString = truncateString(htmlString, HTML_STRING_MAX_LENGTH);

  const markup = {
    __html: truncatedString,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-left hover:bg-secondary rounded-sm p-4">
          <div
            className="text-lg min-w-80 text-wrap cursor-pointer"
            dangerouslySetInnerHTML={markup}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-(--breakpoint-md) overflow-y-scroll max-h-[80%]">
        <DialogTitle>{title}</DialogTitle>
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </DialogContent>
    </Dialog>
  );
}
