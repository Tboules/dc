import { Book } from "lucide-react";

type Props = {
  url: string | undefined | null;
};

export default function BookThumbnailHandler({ url }: Props) {
  if (!url) {
    return (
      <div className="flex items-center justify-center bg-secondary w-12 h-16 rounded">
        <Book />
      </div>
    );
  }

  return <img src={url} alt="Book Thumbnail" className="w-12" />;
}
