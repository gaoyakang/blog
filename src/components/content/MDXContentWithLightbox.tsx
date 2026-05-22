import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import type { ComponentProps, ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { ImageViewer } from "./ImageViewer";
import { AudioPlayer } from "./AudioPlayer";
import { VideoPlayer } from "./VideoPlayer";
import { MermaidChart } from "./MermaidChart";
import { MathBlock } from "./MathBlock";
import { DocLink } from "./DocLink";
import { Model3D } from "./Model3D";
import { MindMap } from "./MindMap";
import { remarkUnwrapImages } from "@/lib/remark-unwrap-images";
import "katex/dist/katex.min.css";

interface MDXContentProps {
  content: string;
}

function ProseLink({ href, children, ...props }: ComponentProps<"a">) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

function extractTextFromNode(node: ReactNode): string {
  if (node === null || node === undefined) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromNode).join("");
  if (typeof node === "object" && "props" in node) {
    return extractTextFromNode((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Heading1({ children, ...props }: ComponentProps<"h1">) {
  const text = extractTextFromNode(children);
  const id = generateId(text);
  return (
    <h1 id={id} {...props}>
      {children}
    </h1>
  );
}

function Heading2({ children, ...props }: ComponentProps<"h2">) {
  const text = extractTextFromNode(children);
  const id = generateId(text);
  return (
    <h2 id={id} {...props}>
      {children}
    </h2>
  );
}

function Heading3({ children, ...props }: ComponentProps<"h3">) {
  const text = extractTextFromNode(children);
  const id = generateId(text);
  return (
    <h3 id={id} {...props}>
      {children}
    </h3>
  );
}

const mdxComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  pre: CodeBlock,
  img: (props: ComponentProps<"img">) => (
    <ImageViewer
      src={typeof props.src === "string" ? props.src : ""}
      alt={props.alt}
    />
  ),
  ImageViewer,
  AudioPlayer,
  VideoPlayer,
  MermaidChart,
  MathBlock,
  DocLink,
  Model3D,
  MindMap,
  a: ProseLink,
  mark: ({ children }: { children: ReactNode }) => (
    <mark className="rounded px-1 py-0.5">{children}</mark>
  ),
};

export function MDXContentWithLightbox({ content }: MDXContentProps) {
  return (
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages],
          rehypePlugins: [
            rehypeKatex,
            [
              rehypePrettyCode,
              {
                theme: "one-dark-pro",
                keepBackground: true,
              },
            ],
          ],
        },
      }}
    />
  );
}
