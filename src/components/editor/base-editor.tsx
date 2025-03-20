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
  editor,
  content,
  className,
  editable = true,
  minHeight = '6rem',
  onChange,
}: BaseEditorProps) {
  console.log('content', content);
  
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