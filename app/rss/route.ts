import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  let allBlogs = getBlogPosts()

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) => {
        let postUrl = `${baseUrl}/blog/${post.slug}`

        return (
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <description>${escapeXml(post.metadata.summary || '')}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
        )
      }
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Jibran Noorshah</title>
        <link>${baseUrl}</link>
        <description>Blog posts from Jibran Noorshah's portfolio.</description>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        <language>en-us</language>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
