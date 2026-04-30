import { getProjects } from 'app/projects/utils'

export function Projects() {
  let projects = getProjects()

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
