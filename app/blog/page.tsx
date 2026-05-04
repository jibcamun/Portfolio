import { BlogPosts } from 'app/components/posts'
import { SearchForm } from 'app/components/search'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

type PageProps = {
  searchParams: Promise<{
    q?: string | string[]
  }>
}

function getQuery(searchParams: { q?: string | string[] }) {
  return Array.isArray(searchParams.q)
    ? searchParams.q[0] || ''
    : searchParams.q || ''
}

export default async function Page({ searchParams }: PageProps) {
  let query = getQuery(await searchParams)

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <SearchForm action="/blog" query={query} placeholder="Search posts" />
      <BlogPosts query={query} />
    </section>
  )
}
