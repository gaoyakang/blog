import type { TocItem } from "@/components/content/TableOfContents";

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");

    const item: TocItem = { id, text, level, children: [] };

    if (level === 1) {
      items.push(item);
    } else if (level === 2) {
      // 如果没有一级标题，二级标题作为顶级项目
      if (items.length === 0) {
        items.push(item);
      } else {
        const lastItem = items[items.length - 1];
        // 如果最后一个是一级标题，添加到它的 children
        if (lastItem.level === 1) {
          lastItem.children = lastItem.children || [];
          lastItem.children.push(item);
        } else {
          // 如果最后一个也是二级标题，直接添加到顶级
          items.push(item);
        }
      }
    } else if (level === 3) {
      if (items.length > 0) {
        const lastItem = items[items.length - 1];
        // 添加到最后一个二级标题的 children
        if (lastItem.level === 2) {
          lastItem.children = lastItem.children || [];
          lastItem.children.push(item);
        } else if (lastItem.level === 1 && lastItem.children && lastItem.children.length > 0) {
          // 如果最后一个是一级标题，添加到它最后一个子项的 children
          const lastChild = lastItem.children[lastItem.children.length - 1];
          lastChild.children = lastChild.children || [];
          lastChild.children.push(item);
        }
      }
    }
  }

  return items;
}
