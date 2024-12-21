import {
  AutoComplete,
  AutoCompleteOption,
} from "@/components/ui/auto-complete";

interface Book extends AutoCompleteOption {
  imageUrl: string;
  id: string;
}

const OPTIONS: Book[] = [
  {
    label: "hello",
    value: "goodbye",
    id: "1",
    imageUrl: "hdijf",
  },
  {
    label: "world",
    value: "earth",
    id: "2",
    imageUrl: "hdijf",
  },
];

export default function Home() {
  return (
    <div className="p-4">
      <AutoComplete
        placeholder="book input"
        emptyMessage="Please choose a book"
        options={OPTIONS}
      />
    </div>
  );
}
