import { getBlogPosts } from 'app/blog/utils'
import type { MetadataRoute } from 'next'

function getBaseUrl() {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'

  if (!url.startsWith('http')) {
    url = `https://${url}`
  }

  return url.replace(/\/$/, '')
}

export const baseUrl = getBaseUrl()

export default function sitemap(): MetadataRoute.Sitemap {
  let posts = getBlogPosts()
  let latestPostDate =
    posts
      .map((post) => post.metadata.publishedAt)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ??
    new Date().toISOString()

  let blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = [
    {
      url: baseUrl,
      lastModified: latestPostDate,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
    },
  ]

  return [...routes, ...blogs]
}
