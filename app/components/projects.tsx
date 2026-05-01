import { getProjects } from 'app/projects/utils'

export function Projects({ limit }: { limit?: number }) {
  let projects = getProjects().slice(0, limit)

  if (!projects.length) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        More projects coming soon.
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
                  <a
                    href={project.metadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                  >
                    GitHub
                  </a>
                )}
                {project.metadata.link && (
                  <a
                    href={project.metadata.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                  >
                    Live
                  </a>
                )}
                {project.metadata.custom && (
                  <a
                    href={project.metadata.custom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                  >
                    {project.metadata.customLabel || 'More'}
                  </a>
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
                  <a
                    href={project.metadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                  >
                    GitHub
                  </a>
                )}
                {project.metadata.link && (
                  <a
                    href={project.metadata.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                  >
                    Live
                  </a>
                )}
                {project.metadata.custom && (
                  <a
                    href={project.metadata.custom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
                  >
                    {project.metadata.customLabel || 'More'}
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
