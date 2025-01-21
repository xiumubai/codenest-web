import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlockComponent from '../CodeBlockComponent';

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}); 