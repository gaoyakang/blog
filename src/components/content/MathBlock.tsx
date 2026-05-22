interface MathBlockProps {
  children: string;
  display?: boolean;
}

/** 备用：行内/块级公式组件（常规 $...$ / $$...$$ 由 rehype-katex 处理） */
export function MathBlock({ children, display = true }: MathBlockProps) {
  if (display) {
    return <div className="my-6 overflow-x-auto text-center">{children}</div>;
  }
  return <span>{children}</span>;
}
