import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

function matchesQuery(post: ReturnType<typeof getBlogPosts>[number], query: string) {
  let normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  let searchableText = [
    post.metadata.title,
    post.metadata.summary,
    post.slug,
    post.content,
  ]
    .join(' ')
    .toLowerCase()

  return searchableText.includes(normalizedQuery)
}

export function BlogPosts({
  limit,
  query = '',
}: {
  limit?: number
  query?: string
}) {
  let allBlogs = getBlogPosts()
    .filter((post) => matchesQuery(post, query))
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .slice(0, limit)

  if (!allBlogs.length) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        {query ? `No posts found for "${query}".` : 'More writing coming soon.'}
      </p>
    )
  }

  return (
    <div>
      {allBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
