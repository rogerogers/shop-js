'use client';
import '@/components/custom/minimal-tiptap/styles/index.css';
import * as React from 'react';

import { LinkBubbleMenu } from '@/components/custom/minimal-tiptap/components/bubble-menu/link-bubble-menu';
import { SectionFive } from '@/components/custom/minimal-tiptap/components/section/five';
import { SectionFour } from '@/components/custom/minimal-tiptap/components/section/four';
import { SectionOne } from '@/components/custom/minimal-tiptap/components/section/one';
import { SectionThree } from '@/components/custom/minimal-tiptap/components/section/three';
import { SectionTwo } from '@/components/custom/minimal-tiptap/components/section/two';
import type { UseMinimalTiptapEditorProps } from '@/components/custom/minimal-tiptap/hooks/use-minimal-tiptap';
import { useMinimalTiptapEditor } from '@/components/custom/minimal-tiptap/hooks/use-minimal-tiptap';
import { cn } from '@rogerogers/ui/lib/utils';
import { Separator } from '@rogerogers/ui/separator';
import type { Content, Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import { MeasuredContainer } from './minimal-tiptap/components/measured-container';

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={[
          'italic',
          'bold',
          'code',
          'strikethrough',
          'clearFormatting',
        ]}
        mainActionCount={5}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={['bulletList', 'orderedList']}
        mainActionCount={2}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={['blockquote', 'codeBlock', 'horizontalRule']}
        mainActionCount={3}
        variant="outline"
      />
    </div>
  </div>
);

export const MinimalTiptapThree = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
        className,
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn('minimal-tiptap-editor', editorContentClassName)}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTiptapThree.displayName = 'MinimalTiptapThree';

export default MinimalTiptapThree;
