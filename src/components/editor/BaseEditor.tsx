import { useEditor, EditorContent } from '@tiptap/react';
import { getBaseExtensions } from './extensions';
import { baseEditorStyles } from './styles';
import { cn } from '@/lib/utils';
import type { Editor } from '@tiptap/react';

interface BaseEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  className?: string;
  minHeight?: string;
  editor?: Editor;
}

export default function BaseEditor({
  content,
  onChange,
  editable = true,
  className,
  minHeight = '6rem',
  editor,
}: BaseEditorProps) {
  const internalEditor = useEditor({
    extensions: getBaseExtensions(editable),
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const styles = baseEditorStyles
    .replace(/min-height:\s*[^;]+;/, '')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <EditorContent
      editor={editor || internalEditor}
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        styles,
        className
      )}
      style={{ minHeight }}
    />
  );
} 