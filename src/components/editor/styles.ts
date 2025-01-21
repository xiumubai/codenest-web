export const baseEditorStyles = `
  min-h-[calc(100vh-12rem)] 
  [&_.ProseMirror]:min-h-[calc(100vh-12rem)] 
  [&_.ProseMirror]:outline-none 
  [&_.ProseMirror]:p-0 
  [&_h1:first-child]:text-4xl 
  [&_h1:first-child]:font-bold 
  [&_h1:first-child]:mb-8 
  [&_h1:first-child]:mt-4 
  [&_h1:first-child]:tracking-tight 
  [&_h1:first-child]:text-foreground
  [&_h1:not(:first-child)]:text-3xl 
  [&_h1:not(:first-child)]:font-bold 
  [&_h1:not(:first-child)]:mb-6 
  [&_h1:not(:first-child)]:mt-8
  [&_h2]:text-2xl 
  [&_h2]:font-bold 
  [&_h2]:mb-4 
  [&_h2]:mt-6
  [&_h3]:text-xl 
  [&_h3]:font-bold 
  [&_h3]:mb-3 
  [&_h3]:mt-5
  [&_h4]:text-lg 
  [&_h4]:font-bold 
  [&_h4]:mb-4 
  [&_h4]:mt-6
  [&_h5]:text-base 
  [&_h5]:font-bold 
  [&_h5]:mb-4 
  [&_h5]:mt-6
  [&_p]:mb-4 
  [&_p]:leading-7 
  [&_p]:text-muted-foreground
  [&_ul]:list-disc 
  [&_ul]:pl-6 
  [&_ul]:mb-4
  [&_ol]:list-decimal 
  [&_ol]:pl-6 
  [&_ol]:mb-4
  [&_li]:mb-2
  [&_blockquote]:border-l-4 
  [&_blockquote]:border-primary/20 
  [&_blockquote]:pl-4 
  [&_blockquote]:my-4 
  [&_blockquote]:bg-muted/50 
  [&_blockquote]:rounded-r-lg 
  [&_blockquote]:py-4 
  [&_blockquote_p]:my-0 
  [&_blockquote_p]:leading-7
  [&_pre]:relative
  [&_pre]:font-mono 
  [&_pre]:text-sm 
  [&_pre]:!mb-6 
  [&_pre]:rounded-lg 
  [&_pre]:bg-gray-100
  [&_pre]:dark:bg-gray-900
  [&_pre]:overflow-hidden
  [&_pre_code]:block 
  [&_pre_code]:!p-4 
  [&_pre_code]:!bg-transparent 
  [&_pre_code]:overflow-auto
  [&_code]:font-mono 
  [&_code]:text-sm 
  [&_code:not(pre_code)]:bg-muted 
  [&_code:not(pre_code)]:p-1 
  [&_code:not(pre_code)]:rounded
  [&_a]:text-primary 
  [&_a]:underline 
  [&_a]:underline-offset-4 
  [&_a]:hover:text-primary/80
  [&_img]:rounded-lg 
  [&_img]:my-4 
  [&_img]:max-w-full 
  [&_img]:h-auto 
  [&_img]:mx-auto
  [&_hr]:my-8 
  [&_hr]:border-border
  [&_table]:w-full 
  [&_table]:border-collapse 
  [&_table]:my-4
  [&_th]:border 
  [&_th]:border-border 
  [&_th]:p-2 
  [&_th]:bg-muted/50
  [&_td]:border 
  [&_td]:border-border 
  [&_td]:p-2
  [&_ul[data-type=taskList]]:list-none 
  [&_ul[data-type=taskList]]:p-0
  [&_ul[data-type=taskList]_li]:flex 
  [&_ul[data-type=taskList]_li]:items-center 
  [&_ul[data-type=taskList]_li]:gap-2 
  [&_ul[data-type=taskList]_li]:my-2
  [&_ul[data-type=taskList]_li_label]:flex 
  [&_ul[data-type=taskList]_li_label]:items-center 
  [&_ul[data-type=taskList]_li_label]:gap-2
  [&_ul[data-type=taskList]_li_input]:h-4 
  [&_ul[data-type=taskList]_li_input]:w-4 
  [&_ul[data-type=taskList]_li_input]:rounded-sm 
  [&_ul[data-type=taskList]_li_input]:border 
  [&_ul[data-type=taskList]_li_input]:border-primary 
  [&_ul[data-type=taskList]_li_input]:checked:bg-primary 
  [&_ul[data-type=taskList]_li_input]:checked:border-primary 
  [&_ul[data-type=taskList]_li_input]:focus-visible:ring-1 
  [&_ul[data-type=taskList]_li_input]:focus-visible:ring-primary
  [&_ul[data-type=taskList]_li_div]:min-w-0
  [&_ul[data-type=taskList]_li_p]:my-0
`; 