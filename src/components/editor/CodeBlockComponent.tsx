import { Check, Copy, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CODE_LANGUAGES } from './constants';

export default function CodeBlockComponent(props: NodeViewProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // 自动聚焦到代码块
    if (props.editor.isEditable) {
      props.editor.commands.focus();
    }
  }, [props.editor]);

  const currentLanguage = CODE_LANGUAGES.find((lang) => lang.value === props.node.attrs.language) || CODE_LANGUAGES[0];

  const copyCode = () => {
    if (preRef.current) {
      const code = preRef.current.textContent || '';
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <NodeViewWrapper className="relative not-prose group select-none">
      <div className="absolute right-2 top-4 z-10 flex items-center gap-2">
        {props.editor.isEditable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-3 text-xs gap-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border border-gray-200/20 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800"
              >
                {currentLanguage.label}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
              {CODE_LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  onClick={() => props.updateAttributes({ language: lang.value })}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border border-gray-200/20 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800"
          onClick={copyCode}
          title="复制代码"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <div className="relative mt-4 rounded-xl bg-[#282c34] dark:bg-[#21252b] ring-1 ring-gray-900/5 dark:ring-gray-800/50">
        <div className="flex items-center px-4 py-6 text-xs text-gray-400/80 font-mono border-b border-gray-700/50">
          {currentLanguage.label}
        </div>
        <div className="select-all">
          <pre
            ref={preRef}
            className="!bg-transparent overflow-hidden"
          >
            <NodeViewContent 
              as="code" 
              className="relative block py-4 px-4 overflow-auto font-mono text-sm leading-6 text-[#abb2bf] scrollbar-thin scrollbar-thumb-gray-700/30 scrollbar-track-gray-100/10 hover:scrollbar-thumb-gray-700/50 select-text
              [&_.hljs-comment]:text-[#7F848E] [&_.hljs-comment]:italic
              [&_.hljs-keyword]:text-[#c678dd]
              [&_.hljs-built_in]:text-[#e5c07b]
              [&_.hljs-function]:text-[#61afef]
              [&_.hljs-string]:text-[#98c379]
              [&_.hljs-number]:text-[#d19a66]
              [&_.hljs-title]:text-[#61afef]
              [&_.hljs-attr]:text-[#d19a66]
              [&_.hljs-selector]:text-[#e06c75]
              [&_.hljs-meta]:text-[#56b6c2]
              [&_.hljs-operator]:text-[#56b6c2]
              [&_.hljs-variable]:text-[#e06c75]
              [&_.hljs-params]:text-[#abb2bf]
              [&_.hljs-class]:text-[#e5c07b]
              [&_.hljs-regexp]:text-[#98c379]
              [&_.hljs-type]:text-[#e5c07b]
              [&_.hljs-property]:text-[#e06c75]
              [&_.hljs-tag]:text-[#e06c75]
              [&_.hljs-literal]:text-[#56b6c2]" 
            />
          </pre>
        </div>
      </div>
    </NodeViewWrapper>
  );
} 