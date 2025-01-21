"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { cn } from "@/lib/utils";
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
  Share,
  History,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import EditorToolbar from "./EditorToolbar";
import EditorBubbleMenu from "./EditorBubbleMenu";
import CodeBlockComponent from './CodeBlockComponent';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CustomCodeBlock } from './extensions/CodeBlockExtension';

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

export default function ArticleEditor({
  content,
  onChange,
  onOutlineChange,
}: ArticleEditorProps) {
  const [showOutline, setShowOutline] = useState(true);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      toast.error("请输入文章标题");
      return;
    }
    if (!content.trim()) {
      toast.error("请输入文章内容");
      return;
    }
    toast.success("草稿保存成功");
  };

  const handleOutlineClick = (id: string) => {
    const element = document.querySelector(`[data-heading-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const updateOutline = useCallback(
    (editor: Editor) => {
      if (!onOutlineChange) return;

      const headings: OutlineItem[] = [];
      editor.state.doc.descendants((node: any, pos: number) => {
        if (node.type.name === "heading") {
          const id = `heading-${pos}`;
          headings.push({
            id,
            level: node.attrs.level,
            text: node.textContent,
          });
        }
      });
      onOutlineChange(headings);
    },
    [onOutlineChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
          HTMLAttributes: {
            class: "scroll-mt-20",
            renderHTML: (attributes: HeadingAttributes) => {
              if (attributes.level && attributes.pos) {
                return {
                  "data-heading-id": `heading-${attributes.pos}`,
                };
              }
              return {};
            },
          },
        },
        codeBlock: false,
      }),
      CustomCodeBlock.configure({
        lowlight,
        languageClassPrefix: 'language-',
        HTMLAttributes: {
          class: 'relative font-mono text-sm !mt-6 !mb-6 rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden [&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_code]:block [&_code]:!p-4 [&_code]:!bg-transparent [&_code]:overflow-auto [&_.hljs-comment]:text-gray-500 [&_.hljs-keyword]:text-purple-500 [&_.hljs-built_in]:text-indigo-500 [&_.hljs-function]:text-blue-500 [&_.hljs-string]:text-green-500 [&_.hljs-number]:text-orange-500 [&_.hljs-title]:text-blue-600 [&_.hljs-attr]:text-emerald-500 [&_.hljs-selector]:text-emerald-600 [&_.hljs-meta]:text-yellow-500 [&_.hljs-operator]:text-violet-500 [&_.hljs-variable]:text-rose-500 [&_.hljs-regexp]:text-red-500',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class:
            "text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary/60",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        openOnClick: true,
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            "rounded-lg border border-gray-200 dark:border-gray-800 my-6 max-w-full",
        },
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-6",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class:
            "border border-gray-200 dark:border-gray-800 px-4 py-2 bg-gray-50 dark:bg-gray-900 font-medium",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-gray-200 dark:border-gray-800 px-4 py-2",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-0 list-none",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start my-4",
        },
        nested: true,
      }),
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "请输入标题...";
          }
          return "请输入正文...";
        },
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        includeChildren: false,
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "is-node-empty",
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
        class:
          "prose dark:prose-invert max-w-none focus:outline-none prose-headings:font-semibold prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-4 prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-4 prose-h5:text-base prose-h5:mt-6 prose-h5:mb-4 prose-p:my-4 prose-p:leading-7 prose-blockquote:border-l-2 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:my-6 prose-blockquote:not-italic prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote-p:my-0 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-2 prose-table:my-6 prose-thead:bg-gray-50 dark:prose-thead:bg-gray-900 prose-tr:border-b prose-tr:border-gray-200 dark:prose-tr:border-gray-800 prose-th:px-4 prose-th:py-2 prose-th:font-medium prose-td:px-4 prose-td:py-2 prose-img:my-6 prose-img:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-code:font-normal prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-pre:p-0 prose-pre:bg-transparent prose-hr:my-8 prose-hr:border-gray-200 dark:prose-hr:border-gray-800",
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const image = items.find((item) => item.type.startsWith("image"));

        if (image) {
          event.preventDefault();
          const file = image.getAsFile();
          if (file) {
            // 这里应该调用实际的图片上传API
            // 现在我们用 base64 演示
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              view.dispatch(
                view.state.tr.replaceSelectionWith(
                  view.state.schema.nodes.image.create({ src: base64 })
                )
              );
              toast.success("图片已插入");
            };
            reader.readAsDataURL(file);
          }
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            // 同上，这里应该调用实际的图片上传API
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
                toast.success("图片已插入");
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
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          editor?.chain().focus().setImage({ src: base64 }).run();
          toast.success("图片已插入");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addLink = () => {
    const url = window.prompt("输入链接地址");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 工具栏 */}
      <EditorToolbar
        editor={editor}
        onAddImage={addImage}
        onAddTable={addTable}
        onAddLink={addLink}
      />

      {/* 编辑器内容区域 */}
      <div className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-8">
          <EditorContent
            editor={editor}
            className="min-h-[calc(100vh-12rem)] [&_.ProseMirror]:min-h-[calc(100vh-12rem)] [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-0 [&_h1:first-child]:text-4xl [&_h1:first-child]:font-bold [&_h1:first-child]:mb-8 [&_h1:first-child]:mt-4 [&_h1:first-child]:tracking-tight [&_h1:first-child]:text-foreground
            [&_h1:not(:first-child)]:text-3xl [&_h1:not(:first-child)]:font-bold [&_h1:not(:first-child)]:mb-6 [&_h1:not(:first-child)]:mt-8
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-6
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-5
            [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-4 [&_h4]:mt-6
            [&_h5]:text-base [&_h5]:font-bold [&_h5]:mb-4 [&_h5]:mt-6
            [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-muted-foreground
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/20 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:bg-muted/50 [&_blockquote]:rounded-r-lg [&_blockquote]:py-4 [&_blockquote_p]:my-0 [&_blockquote_p]:leading-7
            [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:my-4 [&_pre]:overflow-x-auto
            [&_code]:font-mono [&_code]:text-sm [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:p-1 [&_code:not(pre_code)]:rounded
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80
            [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto
            [&_hr]:my-8 [&_hr]:border-border
            [&.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&.is-editor-empty:first-child]:before:text-muted-foreground/50 [&.is-editor-empty:first-child]:before:float-left [&.is-editor-empty:first-child]:before:pointer-events-none
            [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
            [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted/50
            [&_td]:border [&_td]:border-border [&_td]:p-2
            [&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]]:p-0
            [&_ul[data-type=taskList]_li]:flex [&_ul[data-type=taskList]_li]:items-center [&_ul[data-type=taskList]_li]:gap-2 [&_ul[data-type=taskList]_li]:my-2
            [&_ul[data-type=taskList]_li_label]:flex [&_ul[data-type=taskList]_li_label]:items-center [&_ul[data-type=taskList]_li_label]:gap-2
            [&_ul[data-type=taskList]_li_input]:h-4 [&_ul[data-type=taskList]_li_input]:w-4 [&_ul[data-type=taskList]_li_input]:rounded-sm [&_ul[data-type=taskList]_li_input]:border [&_ul[data-type=taskList]_li_input]:border-primary [&_ul[data-type=taskList]_li_input]:checked:bg-primary [&_ul[data-type=taskList]_li_input]:checked:border-primary [&_ul[data-type=taskList]_li_input]:focus-visible:ring-1 [&_ul[data-type=taskList]_li_input]:focus-visible:ring-primary
            [&_ul[data-type=taskList]_li_div]:min-w-0
            [&_ul[data-type=taskList]_li_p]:my-0
            [&_p:empty]:before:content-['\00a0'] [&_p:empty]:block [&_p:empty]:min-h-[1.5em]"
          />
        </div>
      </div>

      {/* 气泡菜单 */}
      {editor && <EditorBubbleMenu editor={editor} onAddLink={addLink} />}
    </div>
  );
}
