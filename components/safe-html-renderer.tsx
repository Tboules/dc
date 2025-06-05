import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HTML_STRING_MAX_LENGTH = 100;

export default function SafeHtmlRenderer({
  htmlString,
  title,
}: {
  htmlString: string;
  title: string;
}) {
  const truncatedString =
    htmlString.length > HTML_STRING_MAX_LENGTH
      ? htmlString.substring(0, HTML_STRING_MAX_LENGTH) + "..."
      : htmlString;

  const markup = {
    __html: truncatedString,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-left hover:bg-secondary rounded-sm p-4">
          <div className="text-lg" dangerouslySetInnerHTML={markup} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md overflow-y-scroll max-h-[80%]">
        <DialogTitle>{title}</DialogTitle>
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </DialogContent>
    </Dialog>
  );
}
