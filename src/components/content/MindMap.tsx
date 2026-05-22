"use client";

import { useRef, useEffect } from "react";

interface MindNode {
  id: string;
  text: string;
  color?: string;
  children?: MindNode[];
}

interface MindMapProps {
  data?: MindNode;
  title?: string;
  width?: number;
  height?: number;
}

export function MindMap({ data, title, width = 700, height = 500 }: MindMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布尺寸
    canvas.width = width;
    canvas.height = height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 节点配置
    const nodeWidth = 120;
    const nodeHeight = 40;
    const levelSpacing = 200;

    // 绘制节点函数
    const drawNode = (x: number, y: number, text: string, color: string) => {
      const radius = 8;
      ctx.beginPath();
      ctx.roundRect(x - nodeWidth / 2, y - nodeHeight / 2, nodeWidth, nodeHeight, radius);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, y);
    };

    // 绘制连接线函数
    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(
        (x1 + x2) / 2, y1,
        (x1 + x2) / 2, y2,
        x2, y2
      );
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // 如果没有数据，就显示默认的测试数据
    if (!data || !data.id) {
      // 画默认的测试数据
      drawNode(100, 200, "Blog Platform", "#6366f1");
      
      drawNode(300, 140, "Content Types", "#ec4899");
      drawNode(300, 240, "Features", "#22d3ee");
      drawNode(300, 340, "Visuals", "#8b5cf6");
      
      drawLine(160, 200, 240, 140);
      drawLine(160, 200, 240, 240);
      drawLine(160, 200, 240, 340);
      
      drawNode(500, 90, "Text", "#6366f1");
      drawNode(500, 140, "Code", "#6366f1");
      drawNode(500, 190, "Images", "#6366f1");
      drawLine(360, 140, 440, 90);
      drawLine(360, 140, 440, 140);
      drawLine(360, 140, 440, 190);
      
      return;
    }

    // 使用递归绘制传入的数据
    const renderNode = (node: MindNode, x: number, y: number, level: number) => {
      const color = node.color || "#6366f1";
      drawNode(x, y, node.text, color);

      if (!node.children || node.children.length === 0) {
        return;
      }

      const childSpacing = 80;
      const totalHeight = node.children.length * childSpacing;
      const startY = y - (totalHeight - childSpacing) / 2;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (!child || !child.id) continue;

        const childX = x + levelSpacing;
        const childY = startY + i * childSpacing;

        drawLine(x + nodeWidth / 2, y, childX - nodeWidth / 2, childY);
        renderNode(child, childX, childY, level + 1);
      }
    };

    renderNode(data, 100, height / 2, 0);

  }, [data, width, height]);

  return (
    <figure className="my-8 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
      {title && (
        <figcaption className="px-4 py-3 text-sm text-[var(--text-primary)] border-b border-[var(--border)]">
          {title}
        </figcaption>
      )}
      <div className="p-4 flex justify-center overflow-x-auto">
        <canvas
          ref={canvasRef}
          className="max-w-full"
          style={{ maxHeight: "400px", minHeight: "300px" }}
        />
      </div>
    </figure>
  );
}
