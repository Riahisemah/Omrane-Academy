import type { ImageAsset } from '../data/content'

interface ResponsiveImageProps {
  image: ImageAsset
  alt: string
  className?: string
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes?: string
  eager?: boolean
}

/** <img> with a light phone variant: the browser picks the smallest file that is sharp enough. */
export function ResponsiveImage({ image, alt, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', eager = false }: ResponsiveImageProps) {
  return (
    <img
      src={image.src}
      srcSet={`${image.sm} ${image.smWidth}w, ${image.src} ${image.width}w`}
      sizes={sizes}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}
