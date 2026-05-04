import { Projects } from 'app/components/projects'
import { SearchForm } from 'app/components/search'

export const metadata = {
  title: 'Projects',
  description: 'Check out my projects.',
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
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My Projects
      </h1>
      <SearchForm
        action="/projects"
        query={query}
        placeholder="Search projects"
      />
      <Projects query={query} />
    </section>
  )
}
