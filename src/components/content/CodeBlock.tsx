// "use client";

// import type { ComponentProps, ReactNode } from "react";
// import { useState, useRef, useEffect } from "react";

// export function CodeBlock({
//   children,
//   className,
//   ...props
// }: ComponentProps<"pre">) {
//   const [copied, setCopied] = useState(false);
//   const preRef = useRef<HTMLPreElement>(null);

//   const handleCopy = async () => {
//     if (!preRef.current) return;
    
//     const codeElement = preRef.current.querySelector("code");
//     if (!codeElement) return;

//     const text = codeElement.textContent || "";
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   return (
//     <div className="relative">
//       <pre 
//         ref={preRef}
//         className={className} 
//         {...props}
//       >
//         {children}
//       </pre>
//       <button
//         onClick={handleCopy}
//         className="absolute top-3 right-3 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//         aria-label={copied ? "Copied" : "Copy code"}
//       >
//         {copied ? (
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <polyline points="20 6 9 17 4 12"></polyline>
//           </svg>
//         ) : (
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//             <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//           </svg>
//         )}
//       </button>
//     </div>
//   );
// }


"use client";

import type { ComponentProps } from "react";
import { useState, useRef, useEffect } from "react";

export function CodeBlock({
  children,
  className,
  ...props
}: ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // 默认真实状态，稍后根据行数覆盖
  const [shouldFold, setShouldFold] = useState(false); // 是否需要折叠功能
  const preRef = useRef<HTMLPreElement>(null);
  const codeRef = useRef<HTMLElement | null>(null);

  // 检查代码行数是否超过7行
  useEffect(() => {
    if (!preRef.current) return;
    const codeEl = preRef.current.querySelector("code");
    codeRef.current = codeEl;
    if (!codeEl) return;

    const text = codeEl.textContent || "";
    const lines = text.split(/\r?\n/);
    // 过滤末尾空行
    let lineCount = lines.length;
    if (lineCount > 0 && lines[lineCount - 1] === "") lineCount--;
    const needFold = lineCount > 7;
    setShouldFold(needFold);
    // 如果需要折叠，默认折叠；否则完全展开
    setIsExpanded(!needFold);
  }, [children]);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const codeElement = preRef.current.querySelector("code");
    if (!codeElement) return;
    const text = codeElement.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <pre
        ref={preRef}
        className={`${className} ${shouldFold && !isExpanded ? "folded" : ""}`}
        {...props}
      >
        {children}
      </pre>
      <div className="absolute top-3 right-3 flex gap-2">
        {/* 展开/折叠按钮 - 始终显示 */}
        {shouldFold && (
          <button
            onClick={toggleExpand}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isExpanded ? "折叠代码" : "展开代码"}
          >
            {isExpanded ? (
              // 折叠图标（向上箭头）
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              // 展开图标（向下箭头）
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </button>
        )}
        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      {/* 添加全局样式，只需要加一次，或者使用 CSS Modules */}
      <style jsx>{`
        pre.folded {
          max-height: 12em; /* 大约7行的高度，可以根据你的字体大小调整 */
          overflow-y: hidden;
          transition: max-height 0.2s ease;
        }
      `}</style>
    </div>
  );
}