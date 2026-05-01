import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

const siteTitle = 'Jibran Noorshah'
const siteDescription =
  "Blog posts from Jibran Noorshah's portfolio about software, research, and personal projects."

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
  let lastBuildDate = new Date().toUTCString()

  const itemsXml = [...allBlogs]
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      )
    })
    .map((post) => {
      let postUrl = `${baseUrl}/blog/${post.slug}`

      return (
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <description>${escapeXml(post.metadata.summary || '')}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
      )
    })
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(siteTitle)}</title>
        <link>${baseUrl}</link>
        <description>${escapeXml(siteDescription)}</description>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <generator>Next.js</generator>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
