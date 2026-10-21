import { Heart } from 'lucide-react'

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={isFavourite ? `Remove ${photo.author} photo from favourites` : `Add ${photo.author} photo to favourites`}
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
            isFavourite ? 'bg-white text-rose-500' : 'bg-white/90 text-neutral-600 hover:text-rose-500'
          }`}
        >
          <Heart size={20} strokeWidth={2} fill={isFavourite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900">{photo.author}</p>
          <p className="mt-1 text-xs text-neutral-500">Photo #{photo.id}</p>
        </div>
      </div>
    </article>
  )
}
