import { getGalleryImages } from './utils'

export const metadata = {
  title: 'Gallery',
  description: 'A visual collection of assorted images.',
}

export default function Page() {
  let images = getGalleryImages()

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Gallery</h1>
      {images.length ? (
        <div className="columns-1 gap-4 sm:columns-2">
          {images.map((image) => (
            <figure
              key={image.alt}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">
          More images coming soon.
        </p>
      )}
    </section>
  )
}
