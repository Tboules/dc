import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  onChange: (v: string) => void;
  value: string;
}

export default function ControlledTipTap({ onChange, value }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    content: value,
  });

  return <EditorContent editor={editor} />;
}
