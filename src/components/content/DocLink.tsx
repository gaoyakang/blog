interface DocLinkProps {
  href: string;
  title: string;
  description?: string;
}

export function DocLink({ href, title, description }: DocLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-8 flex items-start gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-colors hover:border-[var(--text-secondary)]"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--border)] text-xs font-medium text-[var(--text-secondary)]"
        aria-hidden
      >
        DOC
      </span>
      <span className="min-w-0">
        <span className="block text-[var(--text-primary)]">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm text-[var(--text-secondary)]">
            {description}
          </span>
        ) : null}
      </span>
    </a>
  );
}
