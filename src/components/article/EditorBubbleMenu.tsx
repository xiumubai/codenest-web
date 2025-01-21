'use client';

import { Editor, BubbleMenu } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link as LinkIcon,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolbarButtonProps {
  onClick?: () => void;
  icon: React.ElementType;
  isActive?: boolean;
  title: string;
}

const ToolbarButton = ({ onClick = () => {}, icon: Icon, isActive, title }: ToolbarButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={`h-8 w-8 ${isActive ? 'bg-accent text-accent-foreground' : ''}`}
    onClick={onClick}
    title={title}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

interface EditorBubbleMenuProps {
  editor: Editor;
  onAddLink?: () => void;
}

export default function EditorBubbleMenu({ editor, onAddLink }: EditorBubbleMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex items-center gap-1 p-1 rounded-lg border shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={Bold}
        isActive={editor.isActive('bold')}
        title="加粗"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={Italic}
        isActive={editor.isActive('italic')}
        title="斜体"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        icon={Strikethrough}
        isActive={editor.isActive('strike')}
        title="删除线"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        icon={Code}
        isActive={editor.isActive('code')}
        title="行内代码"
      />
      <div className="w-px h-4 bg-border mx-1" />
      <ToolbarButton
        onClick={onAddLink}
        icon={LinkIcon}
        isActive={editor.isActive('link')}
        title="插入链接"
      />
      {editor.isActive('link') && (
        <>
          <div className="w-px h-4 bg-border mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            icon={X}
            title="移除链接"
          />
        </>
      )}
    </BubbleMenu>
  );
} 