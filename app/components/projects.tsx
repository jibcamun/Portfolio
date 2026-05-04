import { getProjects } from 'app/projects/utils'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ProjectLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
    >
      <ArrowIcon />
      <span>{children}</span>
    </a>
  )
}

function matchesQuery(project: ReturnType<typeof getProjects>[number], query: string) {
  let normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  let searchableText = [
    project.metadata.title,
    project.metadata.description,
    project.metadata.customLabel,
    project.slug,
    project.content,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return searchableText.includes(normalizedQuery)
}

export function Projects({
  limit,
  query = '',
}: {
  limit?: number
  query?: string
}) {
  let projects = getProjects()
    .filter((project) => matchesQuery(project, query))
    .slice(0, limit)

  if (!projects.length) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        {query
          ? `No projects found for "${query}".`
          : 'More projects coming soon.'}
      </p>
    )
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <article key={project.slug} className="flex flex-col gap-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <img
              src={project.metadata.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
              {project.metadata.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {project.metadata.description}
            </p>
            {(project.metadata.github ||
              project.metadata.link ||
              project.metadata.custom) && (
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {project.metadata.github && (
                  <ProjectLink href={project.metadata.github}>
                    GitHub
                  </ProjectLink>
                )}
                {project.metadata.link && (
                  <ProjectLink href={project.metadata.link}>
                    Live
                  </ProjectLink>
                )}
                {project.metadata.custom && (
                  <ProjectLink href={project.metadata.custom}>
                    {project.metadata.customLabel || 'More'}
                  </ProjectLink>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export function ProjectPosts({
  featuredOnly = false,
  limit,
}: {
  featuredOnly?: boolean
  limit?: number
}) {
  let projects = getProjects().filter(
    (project) => !featuredOnly || project.metadata.featured
  )
  let visibleProjects = projects.slice(0, limit)

  if (!visibleProjects.length) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        More projects coming soon.
      </p>
    )
  }

  return (
    <div className="grid gap-4">
      {visibleProjects.map((project) => (
        <article key={project.slug} className="flex items-stretch gap-3">
          <div className="min-h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <img
              src={project.metadata.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
              {project.metadata.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
              {project.metadata.description}
            </p>
            {(project.metadata.github ||
              project.metadata.link ||
              project.metadata.custom) && (
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                {project.metadata.github && (
                  <ProjectLink href={project.metadata.github}>
                    GitHub
                  </ProjectLink>
                )}
                {project.metadata.link && (
                  <ProjectLink href={project.metadata.link}>
                    Live
                  </ProjectLink>
                )}
                {project.metadata.custom && (
                  <ProjectLink href={project.metadata.custom}>
                    {project.metadata.customLabel || 'More'}
                  </ProjectLink>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
