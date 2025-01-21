'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Link from '@tiptap/extension-link';
import ArticleOutline from './ArticleOutline';
import CommentList from './CommentList';

const lowlight = createLowlight(common);

interface ArticleViewerProps {
  content: string;
}

export default function ArticleViewer({ content }: ArticleViewerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    editable: false,
  });

  return (
    <div className="flex gap-8">
      <ArticleOutline editor={editor} />
      <div className="flex-1 prose prose-neutral dark:prose-invert max-w-none">
        <div className="[&_.ProseMirror]:outline-none [&_.ProseMirror]:p-0">
          <EditorContent 
            editor={editor} 
            className="[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-6
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-5
              [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-muted-foreground
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
              [&_li]:mb-2
              [&_blockquote]:border-l-4 [&_blockquote]:border-primary/20 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-4 [&_blockquote]:bg-muted/50
              [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:my-4 [&_pre]:overflow-x-auto
              [&_code]:font-mono [&_code]:text-sm
              [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80
              [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto
              [&_hr]:my-8 [&_hr]:border-border"
          />
        </div>
      </div>
      <CommentList />
    </div>
  );
} 