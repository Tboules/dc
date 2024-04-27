import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "../ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Redo,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onChange: (v: string) => void;
  value: string;
}

export default function ControlledTipTap({ onChange, value }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"],
      }),
    ],
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    content: value,
    editorProps: {
      attributes: {
        class: "p-2 border border-border rounded-md min-h-36",
      },
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 py-1 justify-between">
      <div className="flex gap-1">
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("px-2", editor.isActive("bold") ? "bg-secondary" : "")}
        >
          <Bold />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "px-2",
            editor.isActive("italic") ? "bg-secondary" : "",
          )}
        >
          <Italic />
        </Button>
      </div>

      <div className="flex gap-1">
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "px-2",
            editor.isActive({ textAlign: "left" }) ? "bg-secondary" : "",
          )}
        >
          <AlignLeft />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "px-2",
            editor.isActive({ textAlign: "center" }) ? "bg-secondary" : "",
          )}
        >
          <AlignCenter />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "px-2",
            editor.isActive({ textAlign: "right" }) ? "bg-secondary" : "",
          )}
        >
          <AlignRight />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={cn(
            "px-2",
            editor.isActive({ textAlign: "justify" }) ? "bg-secondary" : "",
          )}
        >
          <AlignJustify />
        </Button>
      </div>

      <div className="hidden sm:flex gap-1">
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={"px-2"}
        >
          <Undo />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2"
        >
          <Redo />
        </Button>
      </div>
    </div>
  );
}
