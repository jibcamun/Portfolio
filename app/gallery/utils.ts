import fs from 'fs'
import path from 'path'

type GalleryImage = {
  src: string
  alt: string
  width: number
  height: number
}

const imageTypes = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function titleFromFilename(filename: string) {
  return path
    .basename(filename, path.extname(filename))
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getSvgSize(content: string) {
  let width = Number(content.match(/\bwidth="(\d+)"/)?.[1])
  let height = Number(content.match(/\bheight="(\d+)"/)?.[1])

  if (width && height) {
    return { width, height }
  }

  let viewBox = content.match(/\bviewBox="[-\d.]+ [-\d.]+ ([\d.]+) ([\d.]+)"/)

  return {
    width: Number(viewBox?.[1]) || 800,
    height: Number(viewBox?.[2]) || 600,
  }
}

export function getGalleryImages(): GalleryImage[] {
  let dir = path.join(process.cwd(), 'app', 'gallery', 'images')

  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file).toLowerCase() in imageTypes)
    .sort()
    .map((file) => {
      let filePath = path.join(dir, file)
      let extension = path.extname(file).toLowerCase()
      let mimeType = imageTypes[extension as keyof typeof imageTypes]
      let buffer = fs.readFileSync(filePath)
      let src = `data:${mimeType};base64,${buffer.toString('base64')}`
      let size =
        extension === '.svg'
          ? getSvgSize(buffer.toString('utf-8'))
          : { width: 800, height: 600 }

      return {
        src,
        alt: titleFromFilename(file),
        ...size,
      }
    })
}
