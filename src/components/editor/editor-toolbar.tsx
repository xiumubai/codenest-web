'use client';

import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  X,
  CheckSquare,
  Palette,
  FileCode,
  Type,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

interface EditorToolbarProps {
  editor: Editor;
  onAddImage?: () => void;
  onAddTable?: () => void;
  onAddLink?: () => void;
}

export default function EditorToolbar({ editor, onAddImage, onAddTable, onAddLink }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const addCodeBlock = (language = 'plaintext') => {
    editor
      .chain()
      .focus()
      .setCodeBlock({ language })
      .updateAttributes('codeBlock', {
        'data-language': language,
      })
      .focus()
      .run();
  };

  const languages = [
    { label: '纯文本', value: 'plaintext' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'SQL', value: 'sql' },
    { label: 'JSON', value: 'json' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'YAML', value: 'yaml' },
    { label: 'Shell', value: 'shell' },
  ];

  return (
    <div className="border-b sticky top-[57px] z-10">
      <div className="h-12 flex flex-wrap items-center gap-1.5">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Type className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <Heading1 className="h-4 w-4 mr-2" />
              标题 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 className="h-4 w-4 mr-2" />
              标题 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              <Type className="h-4 w-4 mr-2" />
              标题 3
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
              <Type className="h-4 w-4 mr-2" />
              标题 4
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
              <Type className="h-4 w-4 mr-2" />
              标题 5
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          isActive={editor.isActive('bulletList')}
          title="无序列表"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
          isActive={editor.isActive('orderedList')}
          title="有序列表"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          icon={Quote}
          isActive={editor.isActive('blockquote')}
          title="引用"
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          icon={AlignLeft}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="左对齐"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          icon={AlignCenter}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="居中对齐"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          icon={AlignRight}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="右对齐"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          icon={AlignJustify}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="两端对齐"
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton
          onClick={onAddImage}
          icon={ImageIcon}
          title="插入图片"
        />
        <ToolbarButton
          onClick={onAddTable}
          icon={TableIcon}
          title="插入表格"
        />
        <ToolbarButton
          onClick={onAddLink}
          icon={LinkIcon}
          isActive={editor.isActive('link')}
          title="插入链接"
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={Undo}
          title="撤销"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={Redo}
          title="重做"
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          icon={CheckSquare}
          isActive={editor.isActive('taskList')}
          title="任务列表"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="文本颜色">
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map((color) => (
              <DropdownMenuItem
                key={color}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="flex items-center gap-2"
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                {color}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="w-px h-4 bg-border mx-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="插入代码块">
              <FileCode className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {languages.map(({ label, value }) => (
              <DropdownMenuItem
                key={value}
                onClick={() => addCodeBlock(value)}
                className="flex items-center gap-2"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}