'use client';

import { useEditor, EditorContent, BubbleMenu, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { cn } from '@/lib/utils';
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
  Type,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCallback } from 'react';

const lowlight = createLowlight(common);

interface OutlineItem {
  id: string;
  level: number;
  text: string;
}

interface ArticleEditorProps {
  content: string;
  onChange?: (content: string) => void;
  onOutlineChange?: (outline: OutlineItem[]) => void;
}

interface HeadingAttributes {
  level?: number;
  pos?: number;
}

export default function ArticleEditor({ content, onChange, onOutlineChange }: ArticleEditorProps) {
  const updateOutline = useCallback((editor: Editor) => {
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
  }, [onOutlineChange]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'scroll-mt-20',
            renderHTML: (attributes: HeadingAttributes) => {
              if (attributes.level && attributes.pos) {
                return {
                  'data-heading-id': `heading-${attributes.pos}`,
                };
              }
              return {};
            },
          },
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-md bg-muted p-4 font-mono text-sm',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-4 hover:text-primary/80',
        },
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg border border-border max-w-full',
        },
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableHeader,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border p-2',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return '请输入标题...'
          }
          return '请输入正文...'
        },
        emptyEditorClass: 'cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-muted-foreground before:opacity-50 before:pointer-events-none',
      }),
    ],
    content,
    editable: true,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      updateOutline(editor);
    },
    onCreate: ({ editor }) => {
      updateOutline(editor);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[500px] px-8 py-6',
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const image = items.find(item => item.type.startsWith('image'));
        
        if (image) {
          event.preventDefault();
          const file = image.getAsFile();
          if (file) {
            // 这里应该调用实际的图片上传API
            // 现在我们用 base64 演示
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              view.dispatch(view.state.tr.replaceSelectionWith(
                view.state.schema.nodes.image.create({ src: base64 })
              ));
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
            // 同上，这里应该调用实际的图片上传API
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              const { tr } = view.state;
              const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
              if (pos) {
                view.dispatch(tr.insert(pos, view.state.schema.nodes.image.create({ src: base64 })));
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

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // 同上，这里应该调用实际的图片上传API
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          editor.chain().focus().setImage({ src: base64 }).run();
          toast.success('图片已插入');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addLink = () => {
    const url = window.prompt('输入链接地址');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    isActive = false,
    title
  }: { 
    onClick: () => void; 
    icon: any;
    isActive?: boolean;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8",
        isActive && "bg-accent text-accent-foreground"
      )}
      onClick={onClick}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  const scrollToHeading = (id: string) => {
    const headingId = id.replace('heading-', '');
    const pos = parseInt(headingId, 10);
    const dom = editor?.view.domAtPos(pos);
    if (dom?.node) {
      (dom.node as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-[800px] w-full max-w-screen-lg mx-auto bg-background">
      {/* 工具栏 */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="flex flex-wrap items-center gap-1 p-2">
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
          <div className="w-px h-4 bg-border mx-2" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            icon={Heading1}
            isActive={editor.isActive('heading', { level: 1 })}
            title="一级标题"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            icon={Heading2}
            isActive={editor.isActive('heading', { level: 2 })}
            title="二级标题"
          />
          <div className="w-px h-4 bg-border mx-2" />
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
          <div className="w-px h-4 bg-border mx-2" />
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
          <div className="w-px h-4 bg-border mx-2" />
          <ToolbarButton
            onClick={addImage}
            icon={ImageIcon}
            title="插入图片"
          />
          <ToolbarButton
            onClick={addTable}
            icon={TableIcon}
            title="插入表格"
          />
          <ToolbarButton
            onClick={addLink}
            icon={LinkIcon}
            isActive={editor.isActive('link')}
            title="插入链接"
          />
          <div className="w-px h-4 bg-border mx-2" />
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
          <div className="w-px h-4 bg-border mx-2" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            icon={CheckSquare}
            isActive={editor.isActive('taskList')}
            title="任务列表"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="字体大小">
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {['12px', '14px', '16px', '18px', '20px'].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => editor.chain().focus().setFontSize(size).run()}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
        </div>
      </div>

      {/* 编辑器内容 */}
      <div className="relative my-4 min-h-[800px] bg-background">
        <EditorContent editor={editor} />
      </div>

      {/* 气泡菜单 */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex items-center gap-1 p-1 rounded-lg border bg-background shadow-lg"
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
            onClick={addLink}
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
      )}
    </div>
  );
} 