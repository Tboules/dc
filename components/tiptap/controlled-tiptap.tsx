import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
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
import { ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps<any, string>;
}

export default function ControlledTipTap({ field }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"],
      }),
    ],
    onUpdate: ({ editor }) => field.onChange(editor.getHTML()),
    content: field.value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "p-2 border border-border rounded-md min-h-64",
      },
    },
  });

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isLeft: ctx.editor.isActive({ textAlign: "left" }),
        isRight: ctx.editor.isActive({ textAlign: "right" }),
        isCenter: ctx.editor.isActive({ textAlign: "center" }),
        isJustify: ctx.editor.isActive({ textAlign: "justify" }),
      };
    },
  });

  return (
    <div className="flex flex-wrap gap-1 py-1 justify-between">
      <div className="flex gap-1">
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("px-2", editorState.isBold ? "bg-secondary!" : "")}
        >
          <Bold />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("px-2", editorState.isItalic ? "bg-secondary!" : "")}
        >
          <Italic />
        </Button>
      </div>

      <div className="flex gap-1">
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn("px-2", editorState.isLeft ? "bg-secondary!" : "")}
        >
          <AlignLeft />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn("px-2", editorState.isCenter ? "bg-secondary!" : "")}
        >
          <AlignCenter />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn("px-2", editorState.isRight ? "bg-secondary!" : "")}
        >
          <AlignRight />
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={cn("px-2", editorState.isJustify ? "bg-secondary!" : "")}
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
