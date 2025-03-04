'use client';

import { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface ArticleOutlineProps {
  editor: Editor | null;
}

export default function ArticleOutline({ editor }: ArticleOutlineProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!editor) return;

    // 提取文章中的标题
    const headings: Heading[] = [];
    editor.state.doc.descendants((node: any) => {
      if (node.type.name === 'heading' && node.attrs.level <= 3) {
        const id = `heading-${headings.length + 1}`;
        headings.push({
          level: node.attrs.level,
          text: node.textContent,
          id,
        });
      }
    });
    setHeadings(headings);

    // 为每个标题添加 id
    editor.state.doc.descendants((node: any, pos: number) => {
      if (node.type.name === 'heading' && node.attrs.level <= 3) {
        const id = `heading-${pos}`;
        const dom = editor.view.nodeDOM(pos) as HTMLElement;
        if (dom) {
          dom.id = id;
        }
      }
    });
  }, [editor]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id));
      const scrollPosition = window.scrollY;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition + 100) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block sticky top-0 w-64 h-[calc(100vh-5rem)] overflow-y-auto p-4 space-y-2 text-sm">
      <div className="font-medium mb-4">文章目录</div>
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          className={cn(
            'block w-full text-left hover:text-primary transition-colors duration-200',
            heading.level === 1 && 'pl-0',
            heading.level === 2 && 'pl-4',
            heading.level === 3 && 'pl-8',
            activeId === heading.id ? 'text-primary font-medium' : 'text-muted-foreground'
          )}
        >
          {heading.text}
        </button>
      ))}
    </div>
  );
}
