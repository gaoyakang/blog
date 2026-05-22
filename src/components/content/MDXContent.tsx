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

const mdxComponents = {
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

export function MDXContent({ content }: MDXContentProps) {
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
