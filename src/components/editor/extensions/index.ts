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
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { CustomCodeBlock } from './CodeBlockExtension';

const lowlight = createLowlight(common);

export const getBaseExtensions = (isEditable = true) => [
  StarterKit.configure({
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
    openOnClick: !isEditable,
    HTMLAttributes: {
      class:
        'text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary/60',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class:
        'rounded-lg border border-gray-200 dark:border-gray-800 my-6 max-w-full',
    },
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full my-6',
    },
  }),
  TableRow,
  TableHeader.configure({
    HTMLAttributes: {
      class:
        'border border-gray-200 dark:border-gray-800 px-4 py-2 bg-gray-50 dark:bg-gray-900 font-medium',
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-gray-200 dark:border-gray-800 px-4 py-2',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose pl-0 list-none',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start my-4',
    },
    nested: true,
  }),
  TextStyle,
  Color,
];