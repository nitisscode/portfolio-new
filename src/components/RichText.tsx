type Props = {
  content?: string | null
  className?: string
  as?: 'div' | 'p'
}

const LOOKS_LIKE_HTML = /<\/?[a-z][\s\S]*>/i

/** Allow plain text or simple HTML from the CMS. Strips scripts/handlers. */
function sanitizeBasicHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
}

export default function RichText({ content, className = '', as = 'div' }: Props) {
  const value = (content || '').trim()
  if (!value) return null

  const Tag = as

  if (LOOKS_LIKE_HTML.test(value)) {
    return (
      <Tag
        className={`rich-text ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: sanitizeBasicHtml(value) }}
      />
    )
  }

  return (
    <Tag className={`rich-text rich-text--plain ${className}`.trim()}>
      {value.split(/\n+/).map((line, i) => (
        <p key={`${i}-${line.slice(0, 24)}`}>{line}</p>
      ))}
    </Tag>
  )
}
