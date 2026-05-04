import Link from 'next/link'

type SearchFormProps = {
  action: string
  query: string
  placeholder: string
}

export function SearchForm({ action, query, placeholder }: SearchFormProps) {
  return (
    <form action={action} className="mb-8" role="search">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="flex gap-2">
        <input
          id="search"
          type="search"
          name="q"
          defaultValue={query}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-400 dark:border-neutral-800 dark:bg-black dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-600"
        />
        <button
          type="submit"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          Search
        </button>
      </div>
      {query ? (
        <Link
          href={action}
          className="mt-2 inline-block text-sm text-neutral-600 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:decoration-neutral-600 dark:hover:text-neutral-100"
        >
          Clear search
        </Link>
      ) : null}
    </form>
  )
}
