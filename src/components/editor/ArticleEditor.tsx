"use client";

import { useEffect, useState } from 'react';
import { useEditor } from '@tiptap/react';
import BaseEditor from './BaseEditor';
import EditorToolbar from './EditorToolbar';
import EditorBubbleMenu from './EditorBubbleMenu';
import ArticleOutline from '../article/ArticleOutline';
import { getBaseExtensions } from './extensions';
import { toast } from 'sonner';

interface ArticleEditorProps {
  content: string;
  onChange?: (content: string) => void;
  onOutlineChange?: (outline: OutlineItem[]) => void;
}

interface OutlineItem {
  id: string;
  level: number;
  text: string;
}

export default function ArticleEditor({
  content,
  onChange,
  onOutlineChange,
}: ArticleEditorProps) {
  const [showOutline, setShowOutline] = useState(true);

  // 创建编辑器实例
  const editor = useEditor({
    extensions: getBaseExtensions(true),
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      updateOutline(editor);
    },
    editorProps: {
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const image = items.find((item) => item.type.startsWith('image'));

        if (image) {
          event.preventDefault();
          const file = image.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              view.dispatch(
                view.state.tr.replaceSelectionWith(
                  view.state.schema.nodes.image.create({ src: base64 })
                )
              );
              toast.success('图片已插入');
            };
            reader.readAsDataURL(file);
          }
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              const { tr } = view.state;
              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })?.pos;
              if (pos) {
                view.dispatch(
                  tr.insert(
                    pos,
                    view.state.schema.nodes.image.create({ src: base64 })
                  )
                );
                toast.success('图片已插入');
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  const updateOutline = (editor: any) => {
    if (!onOutlineChange) return;

    const headings: OutlineItem[] = [];
    editor.state.doc.descendants((node: any, pos: number) => {
      if (node.type.name === 'heading') {
        const id = `heading-${pos}`;
        headings.push({
          id,
          level: node.attrs.level,
          text: node.textContent,
        });
      }
    });
    onOutlineChange(headings);
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          editor?.chain().focus().setImage({ src: base64 }).run();
          toast.success('图片已插入');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const handleAddLink = () => {
    const url = window.prompt('输入链接地址');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      {/* 工具栏 */}
      <EditorToolbar
        editor={editor}
        onAddImage={handleAddImage}
        onAddTable={handleAddTable}
        onAddLink={handleAddLink}
      />

      {/* 编辑器内容区域 */}
      <div className="flex gap-8 flex-1 py-8">
        {showOutline && <ArticleOutline editor={editor} />}
        <div className="flex-1 max-w-3xl mx-auto px-8">
          <BaseEditor
            content={content}
            onChange={onChange}
            editable={true}
            editor={editor}
          />
        </div>
      </div>

      {/* 气泡菜单 */}
      <EditorBubbleMenu editor={editor} onAddLink={handleAddLink} />
    </div>
  );
}
